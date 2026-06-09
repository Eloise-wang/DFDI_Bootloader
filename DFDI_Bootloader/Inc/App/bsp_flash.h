/*
 * bsp_flash.h
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 Flash适配层 - A/B双镜像支持】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 */

#ifndef BSP_FLASH_H_
#define BSP_FLASH_H_

#include "ac7840x.h"
#include "ac7840x_features.h"
#include "flash_drv.h"
#include "device_status.h"
#include "common_types.h"
#include "user_config.h"

/*******************************************************************************
 * AC7840 Flash配置
 ******************************************************************************/
/* Flash基地址和大小 */
#define PFLASH_BASE_ADDR         (0x00000000UL)      /* PFlash基地址 */
#define PFLASH_SIZE             (1024UL * 1024UL)   /* PFlash大小: 1MB */
#define DFLASH_BASE_ADDR        (0x10000000UL)      /* DFlash基地址: 128KB @ 0x10000000 */

/* Flash扇区和编程参数 */
#define PFLASH_PAGE_SIZE         (0x00000800UL)      /* PFlash扇区大小: 2KB */
#define PFLASH_WRITE_UNIT        (8UL)               /* 编程单位: 8字节 */
#define DFLASH_PAGE_SIZE         (0x00000800UL)      /* DFlash扇区大小: 2KB */

/* 擦除一个扇区最大时间 (ms) - 实际约20-30ms */
#define ERASE_SECTOR_MAX_TIME_MS (50UL)

/* APP区域定义 - 根据实际需求调整 */
#define BOOTLOADER_SIZE         (64UL * 1024UL)     /* Bootloader大小: 64KB */
#define APP_SIZE                (384UL * 1024UL)    /* 每个APP大小: 384KB */
#define APP_INFO_SIZE           (2UL * 1024UL)      /* APP信息区: 2KB */

/* 地址计算 - A/B双区布局（Bank对齐） */
#define BOOTLOADER_START_ADDR   (PFLASH_BASE_ADDR)                                     /* 0x00000000 */
#define BOOTLOADER_END_ADDR     (BOOTLOADER_START_ADDR + BOOTLOADER_SIZE - 1UL)         /* 0x0000FFFF */

#define APP_A_START_ADDR        (BOOTLOADER_END_ADDR + 1UL)                             /* 0x00010000 */
#define APP_A_END_ADDR          (APP_A_START_ADDR + APP_SIZE - 1UL)                     /* 0x0006FFFF (384KB) */
#define APP_A_INFO_ADDR         (0x00070000UL)                                          /* 0x00070000, Bank0末尾Info扇区 */
#define APP_A_INFO_END_ADDR     (APP_A_INFO_ADDR + APP_INFO_SIZE - 1UL)                /* 0x000707FF */

#define APP_B_START_ADDR        (0x00080000UL)                                          /* 0x00080000, Bank1起始 */
#define APP_B_END_ADDR          (APP_B_START_ADDR + APP_SIZE - 1UL)                     /* 0x000DFFFF (384KB) */
#define APP_B_INFO_ADDR         (0x000E0000UL)                                          /* 0x000E0000, Bank1末尾Info扇区 */
#define APP_B_INFO_END_ADDR     (APP_B_INFO_ADDR + APP_INFO_SIZE - 1UL)                 /* 0x000E07FF */

/* Bank0剩余空间（Bootloader和APP_A之间的Reserve区，~198KB） */
#define FLASH_RESERVE_START     (APP_A_INFO_END_ADDR + 1UL)                            /* 0x00070800 */
#define FLASH_RESERVE_END       (APP_B_START_ADDR - 1UL)                               /* 0x0007FFFF */

/* APP向量表统一偏移量（Cortex-M向量表固定偏移0x200） */
#define APP_VECTOR_TABLE_OFFSET (0x200UL)

/* APP向量表地址 = 槽位起始地址（VTOR值） */
#define APP_A_VTOR_ADDR   (APP_A_START_ADDR)          /* 0x00010000, VTOR for APP_A */
#define APP_B_VTOR_ADDR   (APP_B_START_ADDR)          /* 0x00080000, VTOR for APP_B */

/* APP类型枚举 - 统一由 user_config.h 提供（tAPPType 在那里定义） */

/* Flash块信息结构体 */
typedef struct
{
    uint32_t xBlockStartLogicalAddr;   /* 块起始地址 */
    uint32_t xBlockEndLogicalAddr;     /* 块结束地址 */
} BlockInfo_t;

/* Flash操作API结构体 - 与fls_app.h中tFlashOperateAPI对应 */
typedef boolean (*tpfFlashInit)(void);
typedef void (*tpfFlashDeInit)(void);
typedef boolean (*tpfEraserSecotr)(const uint32_t, const uint32_t);
typedef boolean (*tpfProgramData)(const uint32_t, const uint8_t *, const uint32_t);
typedef boolean (*tpfReadFlashData)(const uint32_t, const uint32_t, uint8_t *);

typedef struct
{
    tpfFlashInit pfFlashInit;          /* Flash初始化 */
    tpfEraserSecotr pfEraserSecotr;    /* 擦除扇区 */
    tpfProgramData pfProgramData;      /* 编程数据 */
    tpfReadFlashData pfReadFlashData;  /* 读Flash数据 */
    tpfFlashDeInit pfFlashDeinit;      /* Flash反初始化 */
} tFlashOperateAPI;

/* APP Flash状态信息 - 用于存储在Flash中的APP信息 */
typedef struct
{
    uint8_t isFlashProgramSuccessful;   /* Flash编程是否成功 */
    uint8_t isFlashErasedSuccessful;    /* Flash擦除是否成功 */
    uint8_t isFlashStructValid;        /* Flash结构是否有效 */
    uint8_t appCnt;                    /* APP计数器 */
    uint8_t aFingerPrint[17];          /* 指纹信息 */
    uint32_t appStartAddr;             /* APP启动地址 */
    uint32_t appStartAddrLen;          /* 启动地址长度 */
    uint32_t crc;                      /* CRC校验值 */
} tAppFlashStatus;

/*******************************************************************************
 * API声明
 ******************************************************************************/

/* Flash适配层初始化 */
boolean BSP_Flash_Init(void);

/* 注册Flash操作API - 供fls_app.c调用 */
boolean BSP_Flash_RegisterAPI(tFlashOperateAPI *pstFlashOperateAPI);

/* 获取Flash配置信息 */
boolean BSP_Flash_GetConfigInfo(tAPPType appType, BlockInfo_t **ppBlockInfo, uint32_t *pItemLen);

/* 获取APP信息 */
boolean BSP_Flash_GetAPPInfo(tAPPType appType, uint32_t *pAppInfoStartAddr, uint32_t *pBlockSize);

/* 获取擦除一个扇区的最大时间(ms) */
uint32_t BSP_Flash_GetEraseSectorMaxTimeMs(void);

/* 获取1个扇区的字节数 */
uint32_t BSP_Flash_Get1SectorBytes(void);

/* 获取APP类型的总扇区数 */
uint32_t BSP_Flash_GetTotalSectors(tAPPType appType);

/* 扇区号转Flash地址 */
boolean BSP_Flash_SectorNumberToAddress(tAPPType appType, uint32_t sectorNo, uint32_t *pFlashAddr);

/* 获取Flash长度对应的扇区数 */
uint32_t BSP_Flash_LengthToSectors(uint32_t startAddr, uint32_t length);

/* 读Flash数据 */
boolean BSP_Flash_ReadData(uint32_t addr, uint32_t len, uint8_t *pDataBuf);

/* 获取Flash驱动保留区信息 */
boolean BSP_Flash_GetDriverInfo(uint32_t *pFlashDriverStartAddr, uint32_t *pFlashDriverEndAddr);

/* 获取Reset Handler写入信息 */
boolean BSP_Flash_GetResetHandlerInfo(boolean *pIsEnableWriteResetHandle, uint32_t *pResetHandleOffset, uint32_t *pResetHandleLength);

/* 检查APP地址配置是否合法 */
boolean BSP_Flash_APPAddrCheck(void);

/* 写APP信息数据 */
boolean BSP_Flash_WriteAPPInfoData(uint32_t addr, const uint8_t *pDataBuf, uint32_t len);

/* 获取启动向量表偏移量 */
uint32_t BSP_Flash_GetVectorTableOffset(void);

#endif /* BSP_FLASH_H_ */
