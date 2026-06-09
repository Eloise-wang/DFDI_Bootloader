# AC78406 Flash 分区规划文档

> 文档版本：V1.1
> 日期：2026-06-09
> 作者：Eloise
> 项目：DFDI_Bootloader / DFDI_App
> 芯片：杰发 AC78406 (ARM Cortex-M4F, 1MB PFlash + 128KB DFlash)

> **变更记录 V1.1**：2026-06-09 完成实施，DFDI_Bootloader 和 DFDI_App 项目已按本文档分区方案修改。

---

## 1. 问题 1：代码写在 Bootloader 还是 APP？

**答：写在 Bootloader 项目里。**

A/B 分区的切换逻辑由 Bootloader 控制，APP 只负责被动被跳转和运行。具体分工：

| 项目 | 职责 |
|---|---|
| **DFDI_Bootloader** | 定义 Flash 布局、管理 A/B 槽位、校验 APP、选择跳转目标 |
| **DFDI_App** | 不知道自己运行在 A 槽还是 B 槽，只负责被 Bootloader 跳转执行 |

APP 项目的代码本身**不需要感知** A/B 存在，只需要编译时指定正确的链接地址（对应 APP_A 或 APP_B）。

---

## 2. AC78406 芯片 Flash 架构

### 2.1 硬件规格

| 项目 | 规格 |
|---|---|
| PFlash 总容量 | 1MB (连续线性地址空间) |
| PFlash 组织 | 2 个 Bank，各 512KB（Bank0 + Bank1） |
| Bank0 地址范围 | 0x00000000 ~ 0x0007FFFF |
| Bank1 地址范围 | 0x00080000 ~ 0x000FFFFF |
| 扇区（页）大小 | 2KB (0x800) |
| 编程单位 | 8 字节对齐 |
| PFlash Info 区地址 | 0x00200000 (最后一个 512KB Block 中) |
| DFlash 地址范围 | 0x10000000 ~ 0x1001FFFF (128KB) |
| FlexRAM 地址范围 | 0x200F0000 ~ 0x200F0FFF (4KB) |

### 2.2 AC78406 物理 Bank 映射

```
物理 Bank       地址范围              大小
──────────────────────────────────────────────
Bank0           0x00000000 ~ 0x0007FFFF   512KB
Bank1           0x00080000 ~ 0x000FFFFF   512KB
──────────────────────────────────────────────
PFlash Info     0x00200000 ~ 0x0021FFFF   128KB (Bank1 高地址区)
DFlash          0x10000000 ~ 0x1001FFFF   128KB
```

### 2.3 当前项目的问题

当前 `bsp_flash.h` 中定义的布局存在以下问题：

1. **APP_A_END_ADDR = 0x0007FFFF**（Bank0 末尾），这正好是 Bank0 的物理结束地址
2. **APP_B_START_ADDR = 0x00080800** 紧跟 Bank0 末尾，但实际上 Bank1 从 0x00080000 开始，这里有 0x800 字节的间隙（正好一个 Info 扇区）
3. **APP_A Info 区** 放在了 0x00080000（Bank1 的起始地址），与 APP_B 的起始地址冲突
4. **APP_B Info 区** 放在了 0x00100000（Flash 末尾之后），超出了 PFlash 地址范围
5. **Bootloader 后的 APP 向量表偏移** 是硬编码的 `0xF200`，没有按槽位区分

---

## 3. 新 Flash 分区方案

### 3.1 设计原则

1. **Bank 对齐**：利用 AC78406 双 Bank 物理特性，APP_A 独占 Bank0 剩余空间，APP_B 独占 Bank1
2. **Info 区独立**：每个 APP 的 Info 区使用该 Bank 末尾的独立 2KB 扇区，不与代码区重叠
3. **向量表偏移统一**：APP_A 和 APP_B 使用相同的向量表偏移（`APP_VECTOR_TABLE_OFFSET = 0x200`），因为两者都是相对 Flash 起始地址的偏移
4. **安全余量**：每个 APP 分配 384KB，留有安全余量应对未来 APP 膨胀

### 3.2 分区布局

```
地址               区域              大小      所属 Bank    扇区范围
──────────────────────────────────────────────────────────────────────
0x00000000 ─┬─ [Bootloader]      64KB      Bank0      0 ~ 31
            │ (固定不变)                              (0x00000000)
            │
0x00010000 ─┤─ [APP_A]           384KB     Bank0      32 ~ 223
            │ (代码区)                                 (0x00010000)
            │
0x00070000 ─┤─ [APP_A_Info]      2KB       Bank0      224
            │ (向量表偏移 0x200)                      (0x00070000)
            │
0x00070800 ─┤─ [Reserve]         ~198KB    Bank0      225 ~ 326
            │ (Bank0 剩余空间，可扩展)                (0x00070800)
Bank0       │
0x00080000 ─┤─ [APP_B]           384KB     Bank1      256 ~ 447
            │ (代码区)                                 (0x00080000)
            │
0x000E0000 ─┤─ [APP_B_Info]      2KB       Bank1      448
            │ (向量表偏移 0x200)                      (0x000E0000)
            │
0x000E0800 ─┤─ [Reserve]         ~126KB    Bank1      449 ~ 510
            │ (Bank1 剩余空间，可扩展)                (0x000E0800)
Bank1       │
0x000FFFFF ─┴─ [Bank1 End]
──────────────────────────────────────────────────────────────────────
0x00200000 ─┬─ [PFlash Info]     128KB     Bank1      PFlash Info 区
            │ (安全/加密/引导密钥等)                   (0x00200000)
──────────────────────────────────────────────────────────────────────
0x10000000 ─┬─ [DFlash]          128KB     DFlash     存 APP 信息备
            │ (128KB, 可存 APP 信息副本)               (0x10000000)
──────────────────────────────────────────────────────────────────────
```

### 3.3 分区参数汇总

| 参数名 | 值 | 说明 |
|---|---|---|
| `BOOTLOADER_START_ADDR` | 0x00000000 | Bootloader 起始地址 |
| `BOOTLOADER_END_ADDR` | 0x0000FFFF | Bootloader 结束地址 |
| `BOOTLOADER_SIZE` | 64KB | Bootloader 大小 |
| `APP_A_START_ADDR` | 0x00010000 | APP_A 代码区起始 |
| `APP_A_END_ADDR` | 0x0006FFFF | APP_A 代码区结束 (384KB) |
| `APP_A_VECTOR_TABLE_ADDR` | 0x00010200 | APP_A 向量表地址 |
| `APP_A_INFO_ADDR` | 0x00070000 | APP_A Info 区（独立扇区） |
| `APP_A_INFO_END_ADDR` | 0x000707FF | APP_A Info 区结束 |
| `APP_B_START_ADDR` | 0x00080000 | APP_B 代码区起始（Bank1 起始） |
| `APP_B_END_ADDR` | 0x000DFFFF | APP_B 代码区结束 (384KB) |
| `APP_B_VECTOR_TABLE_ADDR` | 0x00080200 | APP_B 向量表地址 |
| `APP_B_INFO_ADDR` | 0x000E0000 | APP_B Info 区（独立扇区） |
| `APP_B_INFO_END_ADDR` | 0x000E07FF | APP_B Info 区结束 |
| `RESERVE_START` | 0x00070800 | Bank0 剩余空间起始 (~198KB) |
| `RESERVE_END` | 0x0007FFFF | Bank0 剩余空间结束 |
| `APP_SIZE` | 384KB | 每个 APP 的代码区大小 |
| `APP_INFO_SIZE` | 2KB | 每个 APP 的 Info 区大小 |
| `APP_VECTOR_TABLE_OFFSET` | 0x200 | APP 向量表相对各自分区起始的偏移 |

### 3.4 升级流程（设计）

```
正常启动流程：
  上电
    │
    ▼
Bootloader 初始化
    │
    ▼
读取 Boot Info（RAM 0x20002FF0）
    │
    ▼
读取 APP_A_Info + APP_B_Info（Flash）
    │
    ▼
比较哪个是最新有效 APP（CRC + appCnt）
    │
    ├── APP_A 更新 → 设置向量表偏移 0x200，跳到 0x00010000
    │
    └── APP_B 最新 → 设置向量表偏移 0x200，跳到 0x00080000


OTA 升级流程（UDS 下载到非活跃区）：
  Bootloader 接收 UDS 请求
    │
    ▼
确定目标槽位（GetOldAPPType()）
    │
    ▼
擦除目标区（8字节编程）→ 写入新 APP → 校验
    │
    ├── 校验失败 → 留在 Bootloader，重试
    │
    └── 校验成功 → 写入目标槽位 Info（appCnt++, CRC）
                 → 切换激活标志 → 等待下次启动
```

---

## 4. Bootloader 项目改动

### 4.1 改动文件清单

| 文件 | 改动类型 | 改动内容 |
|---|---|---|
| `Inc/App/bsp_flash.h` | 修改 | 重新定义所有 Flash 地址宏 |
| `Inc/App/user_config.h` | 修改 | 取消注释 `EN_SUPPORT_APP_B`，确认 `CORE_NO` |
| `Src/App/boot_cfg.c` | 修改 | `Boot_JumpToApp` 支持 A/B 跳转，`Boot_RemapApplication` 完善 |
| `Src/App/bsp_flash.c` | 修改 | 适配新的分区地址和 Info 区地址 |
| `Src/App/unifiedStack_uds_app_cfg.c` | 修改 | `Flash_IsValidAddr` 适配新地址 |
| `Src/main.c` | 可能修改 | 确认启动流程中调用了 `Boot_RemapApplication` |
| `CMSIS/Device/ac7840x/startup/armc/ac784x_flash.ld` | 修改 | Bootloader 链接脚本限定 64KB 范围 |

### 4.2 bsp_flash.h 改动

需要修改以下宏定义：

```c
// ===== DFDI_Bootloader/Inc/App/bsp_flash.h =====

// 修改 BOOTLOADER 大小（保持 64KB）
#define BOOTLOADER_SIZE         (64UL * 1024UL)     /* 64KB */
#define BOOTLOADER_START_ADDR   (0x00000000UL)
#define BOOTLOADER_END_ADDR     (0x0000FFFFUL)       /* 0x0000FFFF */

// 修改 APP_A 布局（Bank0 剩余空间，384KB）
#define APP_A_START_ADDR        (0x00010000UL)        /* 0x00010000 */
#define APP_A_END_ADDR          (0x0006FFFFUL)        /* 0x0006FFFF, 384KB */
#define APP_A_VECTOR_TABLE_ADDR (APP_A_START_ADDR + 0x200UL)  /* 0x00010200 */
#define APP_A_INFO_ADDR         (0x00070000UL)        /* 0x00070000, 独立 Info 扇区 */
#define APP_A_INFO_END_ADDR     (0x000707FFUL)        /* 0x000707FF */

// 修改 APP_B 布局（Bank1 起始，384KB）
#define APP_B_START_ADDR        (0x00080000UL)        /* 0x00080000, Bank1 起始 */
#define APP_B_END_ADDR          (0x000DFFFFUL)        /* 0x000DFFFF, 384KB */
#define APP_B_VECTOR_TABLE_ADDR (APP_B_START_ADDR + 0x200UL)  /* 0x00080200 */
#define APP_B_INFO_ADDR         (0x000E0000UL)        /* 0x000E0000, 独立 Info 扇区 */
#define APP_B_INFO_END_ADDR     (0x000E07FFUL)        /* 0x000E07FF */

// Reserve 区域（Bank0 剩余 ~198KB）
#define FLASH_RESERVE_START     (0x00070800UL)
#define FLASH_RESERVE_END       (0x0007FFFFUL)

// 统一向量表偏移（APP_A 和 APP_B 使用相同的偏移值）
#define APP_VECTOR_TABLE_OFFSET (0x200UL)

// APP 大小宏（代码区，不含 Info）
#define APP_SIZE                (384UL * 1024UL)     /* 384KB 每个 APP */
#define APP_INFO_SIZE           (2UL * 1024UL)       /* 2KB Info */
```

### 4.3 boot_cfg.c 改动

**关键改动 1：`Boot_JumpToApp` 需要根据槽位确定向量表地址**

```c
// ===== DFDI_Bootloader/Src/App/boot_cfg.c =====

// 当前代码（硬编码）：
#define APP_VECTOR_TABLE_ADDR (0x0000F200u)

// 修改为：根据 appType 选择对应的向量表地址
static uint32 Boot_GetVectorTableAddr(tAPPType appType)
{
    uint32 addr = 0u;
    switch (appType)
    {
        case APP_A_TYPE:
            addr = APP_A_VECTOR_TABLE_ADDR;  // 0x00010200
            break;
#ifdef EN_SUPPORT_APP_B
        case APP_B_TYPE:
            addr = APP_B_VECTOR_TABLE_ADDR;  // 0x00080200
            break;
#endif
        default:
            /* 错误处理 */
            break;
    }
    return addr;
}

void Boot_JumpToApp(const uint32 i_AppAddr)
{
    // 从 i_AppAddr 推导出是 APP_A 还是 APP_B
    tAPPType appType = APP_A_TYPE;
    if ((i_AppAddr >= APP_B_START_ADDR) && (i_AppAddr <= APP_B_END_ADDR))
    {
        appType = APP_B_TYPE;
    }
    else
    {
        appType = APP_A_TYPE;
    }

    // 获取正确的向量表地址
    uint32 vectorTableAddr = Boot_GetVectorTableAddr(appType);

    uint32 app_msp = *((volatile uint32 *)vectorTableAddr);
    uint32 app_reset_vector = *((volatile uint32 *)(vectorTableAddr + 4u));

    // ... 其余跳转代码保持不变，只需要把 APP_VECTOR_TABLE_ADDR 替换为 vectorTableAddr
}
```

**关键改动 2：`Boot_RemapApplication` 需要真正执行 A/B 选择**

```c
void Boot_RemapApplication(void)
{
    tAPPType appType = APP_A_TYPE;

    // 始终获取最新有效 APP（A/B 中选择）
    appType = Flash_GetNewestAPPType();

    // 根据 appType 设置跳转地址
    uint32 jumpAddr = 0u;
    switch (appType)
    {
        case APP_A_TYPE:
            jumpAddr = APP_A_START_ADDR;  // 0x00010000
            break;
        case APP_B_TYPE:
            jumpAddr = APP_B_START_ADDR;  // 0x00080000
            break;
        default:
            // 无有效 APP，停留在 Bootloader
            return;
    }

    Boot_JumpToApp(jumpAddr);
}
```

### 4.4 user_config.h 改动

```c
// ===== DFDI_Bootloader/Inc/App/user_config.h =====

// 取消注释，开启 A/B 双区支持
#define EN_SUPPORT_APP_B

// CORE_NO 为 1，单核场景，Flash_GetNewestAPPType 不依赖 totalCoreNo
// 但 Boot_RemapApplication 中的 if (totalCoreNo > 0) 条件需要改为始终执行
// 或者直接删除该条件，改为无条件调用
```

---

## 5. APP 项目改动

### 5.1 改动文件清单

| 文件 | 改动类型 | 改动内容 |
|---|---|---|
| `CMSIS/Device/ac7840x/startup/armc/ac784x_flash.ld` | **新增/修改** | APP_A 链接脚本（地址 0x00010000）和 APP_B 链接脚本（地址 0x00080000） |
| `CMSIS/Device/ac7840x/startup/startup_ac7840x.s` | 可能修改 | 确认向量表对齐（.isr_vector 节对齐到 0x200） |

### 5.2 APP 链接脚本

APP 项目需要两个版本的链接脚本（分别用于编译 APP_A 和 APP_B）：

**链接脚本 APP_A（`ac784x_app_a.ld`）**：

```ld
/* APP_A 链接脚本 - 目标地址 0x00010000 */

ENTRY(Reset_Handler)

MEMORY
{
  FLASH (rx) : ORIGIN = 0x00010000, LENGTH = 384K
  RAM  (xrw) : ORIGIN = 0x1FFF8000, LENGTH = 128K
}

SECTIONS
{
  .isr_vector :
  {
    . = ALIGN(4);
    KEEP(*(.isr_vector))
    . = ALIGN(4);
  } >FLASH

  .text :
  {
    . = ALIGN(4);
    *(.text)
    *(.text*)
    *(.rodata)
    *(.rodata*)
    *(.glue_7)
    *(.glue_7t)
    . = ALIGN(4);
    _etext = .;
  } >FLASH

  _sidata = .;

  .data : AT ( _sidata )
  {
    . = ALIGN(4);
    _sdata = .;
    *(.data)
    *(.data*)
    . = ALIGN(4);
    _edata = .;
  } >RAM

  .bss :
  {
    . = ALIGN(4);
    _sbss = .;
    *(.bss)
    *(.bss*)
    *(COMMON)
    . = ALIGN(4);
    _ebss = .;
  } >RAM

  _estack = ORIGIN(RAM) + LENGTH(RAM);
}
```

**链接脚本 APP_B（`ac784x_app_b.ld`）**：

```ld
/* APP_B 链接脚本 - 目标地址 0x00080000 */

ENTRY(Reset_Handler)

MEMORY
{
  FLASH (rx) : ORIGIN = 0x00080000, LENGTH = 384K
  RAM  (xrw) : ORIGIN = 0x1FFF8000, LENGTH = 128K
}

/* 其余 SECTIONS 部分与 APP_A 链接脚本完全相同 */
```

### 5.3 APP 向量表对齐要求

APP 的 `.isr_vector` 节必须对齐到 `0x200`（512 字节对齐），这是 ARM Cortex-M 向量表的标准要求。当前 `startup_ac7840x.s` 应该已经满足此要求，只需确认：

```
APP_A:  .isr_vector 节从 0x00010000 开始，向量表从 0x00010200 开始
APP_B:  .isr_vector 节从 0x00080000 开始，向量表从 0x00080200 开始
```

即 `.isr_vector` 的前 0x200 字节（512 字节）作为前缀填充区域（可能被 bootloader 用来存放跳转代码），实际的向量表从偏移 0x200 开始。

---

## 6. A/B 切换机制（软件切换，软切换）

### 6.1 为什么用软切换而非硬件 SWAP

AC78406 支持硬件 SWAP（通过 Flash Info 区编程切换 Bank0/Bank1 的地址映射），但软切换更简单可靠：

- **硬件 SWAP**：需要编程 PFlash Info 区（0x00200000），操作复杂，一旦配置错误可能导致启动失败
- **软切换**：通过 RAM 标志位 + 复位即可，逻辑完全由 Bootloader 控制，出错可回退

### 6.2 软切换流程

```
OTA 升级成功（下载到 APP_B）：
  1. Bootloader 将 APP_B_Info 的 appCnt 加 1，更新 CRC
  2. 设置 RAM 标志位：g_ActiveAPP = APP_B_TYPE
  3. 复位 MCU

下次启动：
  Bootloader 读取 g_ActiveAPP（从 RAM 0x20002FF0）
  │
  ├── g_ActiveAPP == APP_A_TYPE → Boot_JumpToApp(APP_A_START_ADDR)
  └── g_ActiveAPP == APP_B_TYPE → Boot_JumpToApp(APP_B_START_ADDR)
```

### 6.3 回滚机制

如果新 APP 运行异常，可以通过 UDS 请求强制切换到另一个槽位：

```
收到 UDS 回滚请求：
  1. 读取另一个槽位的 Info（APP_A_Info 或 APP_B_Info）
  2. 校验 CRC，确认该槽位是否有有效 APP
  3. 设置 g_ActiveAPP = 目标槽位
  4. 复位
```

---

## 7. 当前存在的问题（需同步修复）

在完善 A/B 分区支持之前，以下问题需要先修复：

### 问题 1：`Boot_RemapApplication` 中的 `totalCoreNo` 条件

当前代码：
```c
totalCoreNo = 0u;  // 硬编码为 0
if (totalCoreNo > 0u)  // 永远不成立
{
    appType = Flash_GetNewestAPPType();  // A/B 选择逻辑永远不会执行
    (void)appType;
}
```

**修复**：删除 `totalCoreNo` 条件，或改为始终调用 `Flash_GetNewestAPPType()`。

### 问题 2：`Boot_JumpToApp` 硬编码向量表地址

当前代码：
```c
#define APP_VECTOR_TABLE_ADDR (0x0000F200u)  // 硬编码
```

向量表地址应该在运行时根据活跃的 APP 槽位动态确定（参见 4.3 节）。

### 问题 3：`Boot_IsPowerOnTriggerReset` 返回 FALSE

当前代码直接返回 FALSE，不检测复位源。对于 OTA 升级场景，需要正确判断是否为上电复位，以决定是否清除 RAM 中的标志位。

---

## 8. 实施计划

| 步骤 | 内容 | 优先级 |
|---|---|---|
| 1 | 修改 `bsp_flash.h` 地址宏定义 | P0 |
| 2 | 修改 `bsp_flash.c` 适配新地址 | P0 |
| 3 | 取消注释 `user_config.h` 中的 `EN_SUPPORT_APP_B` | P0 |
| 4 | 修复 `Boot_RemapApplication` 条件 | P0 |
| 5 | 修复 `Boot_JumpToApp` 支持 A/B 跳转 | P0 |
| 6 | 修复 `Boot_IsPowerOnTriggerReset` | P1 |
| 7 | 创建 APP_A 和 APP_B 两个链接脚本 | P1 |
| 8 | 修改 `unifiedStack_uds_app_cfg.c` 适配新地址 | P1 |
| 9 | 测试验证：单槽烧录 + A/B 切换 | P2 |
