/*
 * flash_hal_Cfg.h
 *
 *  Created on: 2026年4月14日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_HAL_FLASH_HAL_FLASH_HAL_CFG_H_
#define S32K142_CAN_HAL_FLASH_HAL_FLASH_HAL_CFG_H_
#include "includes.h"


typedef uint32 tLogicalAddr;

typedef struct
{
	tLogicalAddr xBlockStartLogicalAddr;   /*块开始逻辑地址*/
	tLogicalAddr xBlockEndLogicalAddr;    /*块结束逻辑地址*/
}BlockInfo_t;

/*program data buf 最大长度*/
#define MAX_FLASH_DATA_LEN (200u)

#if 0
/*启动地址*/
#define STARTUP_ADDR (0xFFFEu)
#endif

/*******************************************************************************
 * API
 ******************************************************************************/
/*检查flash配置是否有效?*/
extern boolean FLASH_HAL_APPAddrCheck(void);

/*获取flash配置信息*/
extern boolean FLASH_HAL_GetFlashConfigInfo(const tAPPType i_appType, BlockInfo_t **o_ppBlockInfo, uint32 *o_pItemLen);

/*获取应用程序信息（存储起始地址、块大小）*/
extern boolean FLASH_HAL_GetAPPInfo(const tAPPType i_appType, uint32 *o_pAppInfoStartAddr, uint32 *o_pBlockSize);

/*获取扇区长度*/
extern uint32 FLASH_HAL_GetFlashLengthToSectors(const uint32 i_startFlashAddr, const uint32 i_len);

/*获取flash驱动器的起始地址与长度*/
extern boolean FLASH_HAL_GetFlashDriverInfo(uint32 *o_pFlashDriverAddrStart, uint32 *o_pFlashDriverEndAddr);

/*获取复位处理程序信息*/
extern void FLASH_HAL_GetRestHanlderInfo(boolean *o_pIsEnableWriteResetHandlerInFlash, uint32 *o_pResetHanderOffset, uint32 *o_pResetHandlerLength);

/*获取存储重置处理程序信息*/
extern uint32 FLASH_HAL_GetStorageRestHandlerAddr(void);

/*是否允许在闪存中写入复位处理程序?*/
extern boolean FLASH_HAL_IsEnableStorageResetHandlerInFlash(void);

/*获取复位处理程序地址长度*/
extern uint32 FLASH_HAL_GetResetHandlerLen(void);

/*获取核心配置编号*/
extern uint32 FLASH_HAL_GetConfigCoreNo(void);

/*获取核心应用镜像地址配置*/
extern boolean FLASH_HAL_GetMultiCoreMirrorAddr(const tAPPType i_appType, const uint32 i_coreNo, uint32 *o_pMirrorAddr);

/*获取核心重映射地址*/
extern boolean FLASH_HAL_GetMultiCoreRemapAddr(const tAPPType i_appType, const uint32 i_coreNo, uint32 *o_pReampAddr);

/*逻辑地址到物理地址*/
extern uint32 FLASH_HAL_LogicalToPhysicalAddr(const uint32 i_logicalAddr);

/*全局地址转换为逻辑地址*/
extern uint32 FLASH_HAL_PhysicalToLogicalAddr(const uint32 i_globalAddr);

/*获取擦除flash扇区的最长时间*/
extern uint32 FLASH_HAL_GetEraseFlashASectorMaxTimeMs(void);

/*获取flash中扇区的总数量*/
extern uint32 FLASH_HAL_GetTotalSectors(const tAPPType i_appType);

/*扇区号到闪存地址*/
extern boolean FLASH_HAL_SectorNumberToFlashAddress(const tAPPType i_appType, const uint32 i_secotrNo, uint32 *o_pFlashAddr);

/*获取1个扇区 = 字节数*/
extern uint32 FLASH_HAL_Get1SectorBytes(void);

#endif /* S32K142_CAN_HAL_FLASH_HAL_FLASH_HAL_CFG_H_ */
