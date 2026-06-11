# 单升级包容器方案

## 目标

- 客户侧只提供一个升级文件：`DFDI_APP.bin`
- 包内同时包含 `APP_A` 和 `APP_B` 两个 payload
- Bootloader 在擦除后返回本次目标槽位
- 上位机自动选择对应 payload 和下载地址

## 当前实现

- 包格式：
  - `magic(4B) = DFPK`
  - `version(4B) = 1`
  - `manifestLength(4B)`
  - `manifest(JSON, UTF-8)`
  - `payloadA`
  - `payloadB`

- `manifest` 字段：
  - `format`
  - `version`
  - `images[]`
  - `images[].slotType`
  - `images[].slotName`
  - `images[].loadAddress`
  - `images[].dataOffset`
  - `images[].dataSize`
  - `images[].crc16`
  - `images[].sha256`

- Bootloader 行为：
  - `31 01 FF 00` 完成后返回：
    - `71 01 FF 00 <eraseStatus> <targetSlot>`
  - `targetSlot`:
    - `0` = `APP_A`
    - `1` = `APP_B`

- 上位机行为：
  - 读取单包 `DFDI_APP.bin`
  - 解析 manifest
  - 等待 erase 正响应中的 `targetSlot`
  - 自动选择匹配的 payload
  - 自动使用 payload 自带 `loadAddress`
  - 自动计算 CRC16，并继续后续 `0x34/0x36/0x37/0x31`

## 打包方法

在目录 `DFDI_user_config/EcuBus-Pro_bootloader` 下执行：

```bash
node pack_app_package.js
```

输入文件：

- `bin/DFDI_APP_A.bin`
- `bin/DFDI_APP_B.bin`

输出文件：

- `bin/DFDI_APP.bin`

## 说明

- 客户最终只需要拿到 `DFDI_APP.bin`
- A/B 选择对客户不可见
- 当前版本未加入签名校验，后续可在 manifest 基础上继续扩展
