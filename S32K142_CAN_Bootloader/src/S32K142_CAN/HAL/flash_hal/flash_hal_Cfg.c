/*
 * flash_hal_Cfg.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include "flash_hal_Cfg.h"
/*******************************************************************************
 * 变量
 ******************************************************************************/
/*1个扇区 = 字节数*/
#if  (defined MCU_TYPE) && (MCU_TYPE == MCU_S32K14x)
#define SECTOR_LEN (4096u)
#elif (defined MCU_TYPE) && (MCU_TYPE == MCU_S12Z)
#define SECTOR_LEN (512u)
#elif (defined MCU_TYPE) && (MCU_TYPE == MCU_S32K142_TYPE)
#define SECTOR_LEN (2048u)
#elif (defined MCU_TYPE) && (MCU_TYPE == MCU_S32K11x)
#define SECTOR_LEN (2048u)
#elif (defined MCU_TYPE) && (MCU_TYPE == MCU_MPC577XX)
#define SECTOR_LEN (262144u)	/* 256 KB */
#else
#error "Please config the MCU Type"
#endif

/*reset handler information*/
#define EN_WRITE_RESET_HANDLER_IN_FLASH (FALSE)  /*是否在闪存中启用写入重置处理程序*/


typedef struct
{
	uint32 imageAStartAddr;
	uint32 imageBStartAddr;
	uint32 imageAMirrorAddr;
	uint32 imageBMirrorAddr;
	uint32 remapApplicationAddr;
}CoreInfo_t;

/*
定义flash扇区擦除最长时间
**************************
S32K142/144/146/148     -- 最大擦除时间 130ms
MagniV S12ZVL/S32ZVM   --                       21ms
*/
#if  (defined MCU_TYPE) && (MCU_TYPE == MCU_S32K14x)
#define MAX_ERASE_SECTOR_FLASH_MS (130u)
#elif (defined MCU_TYPE) && (MCU_TYPE == MCU_S32K142_TYPE)
#define MAX_ERASE_SECTOR_FLASH_MS (130u)
#elif (defined MCU_TYPE) && (MCU_TYPE == MCU_S12Z)
#define MAX_ERASE_SECTOR_FLASH_MS (21u)
#elif (defined MCU_TYPE) && (MCU_TYPE == MCU_MPC577XX)
#define MAX_ERASE_SECTOR_FLASH_MS (4000u)
#else
#error "Please config the MCU Type"
#endif

/*定义向量表偏移量与复位句柄偏移量*/
#if  (defined MCU_TYPE) && (MCU_TYPE == MCU_S32K14x)
#define APP_VECTOR_TABLE_OFFSET (0x200u) /*相对于gs_astBlockNumA/B的向量表偏移量*/
#define RESET_HANDLE_OFFSET (4u)        /*从顶级向量表到复位句柄*/
#define RESET_HANDLER_ADDR_LEN (4u)     /*指针长度或重置处理程序长度*/
#elif (defined MCU_TYPE) && (MCU_TYPE == MCU_S12Z)
#define APP_VECTOR_TABLE_OFFSET (512u) /*相对于gs_astBlockNumA/B的向量表偏移量*/
#define RESET_HANDLE_OFFSET (508u)     /*从顶级向量表到复位句柄 508 = 127 × 4*/
#define RESET_HANDLER_ADDR_LEN (3u)    /*pointer length or reset hanlder length*/
#elif (defined MCU_TYPE) && (MCU_TYPE == MCU_MPC577XX)
/*define vector table offset and reset handle offset*/
#define APP_VECTOR_TABLE_OFFSET (0x200u) /*相对于gs_astBlockNumA/B的向量表偏移量*/
#define RESET_HANDLE_OFFSET 	(0u)        /*from top vector table to reset handle*/
#define RESET_HANDLER_ADDR_LEN 	(4u)     /*pointer length or reset hanlder length*/
#elif(defined MCU_TYPE) && (MCU_TYPE == MCU_S32K142_TYPE)
#define APP_VECTOR_TABLE_OFFSET (0x200u) /*相对于gs_astBlockNumA/B的向量表偏移量*/
#define RESET_HANDLE_OFFSET (4u)        /*from top vector table to reset handle*/
#define RESET_HANDLER_ADDR_LEN (4u)     /*pointer length or reset hanlder length*/

#else
#error "Please config the MCU Type"
#endif

/*flash 驱动配置*/
const BlockInfo_t gs_astFlashDriverBlock[] = {
    {0x1FFFF700u, 0x1FFFFFF0u},
};

/*APP可被使用的空间*/
const BlockInfo_t gs_astBlockNumA[] = {
    {0x0000F000u, 0x40000u},    /*block logical 0*/
};

/*逻辑数*/
const uint32 gs_blockNumA = sizeof(gs_astBlockNumA) / sizeof(gs_astBlockNumA[0u]);

#ifdef EN_SUPPORT_APP_B
/*APP可被使用的空间*/
const BlockInfo_t gs_astBlockNumB[] = {
	0x00080000u, 0x000EF000u
}; 

/*逻辑数*/
const uint32 gs_blockNumB = sizeof(gs_astBlockNumB) / sizeof(gs_astBlockNumB[0u]);
#endif

/*多核配置*/
#if (CORE_NO >= 1u)
static const CoreInfo_t gs_astMultiCoreAPPRemapInfo[CORE_NO] = {
{
	/*imageAStartAddr, imageBStartAddr, imageAMirrorAddr, imageBMirrorAddr, remapApplicationAddr*/
	0x1000000u, 0x1200000u, 0xA000000u, 0xA200000u, 0x2000000u
},

};
#endif

/*检查app 的 flash配置是否有效?*/
boolean FLASH_HAL_APPAddrCheck(void)
{
	const uint32 flashAddrLowByte = (SECTOR_LEN) - 1u;	
	BlockInfo_t *pBlockInfo = NULL_PTR;
	uint32 item = 0u;


	if(TRUE == FLASH_HAL_GetFlashConfigInfo(APP_A_TYPE, &pBlockInfo, &item))
	{
		while(item)
		{
			if((0u != (pBlockInfo->xBlockStartLogicalAddr & flashAddrLowByte)) || 
				(0u != (pBlockInfo->xBlockEndLogicalAddr & flashAddrLowByte)))
			{
				return FALSE;
			}

			item--;
			pBlockInfo++;
		}
	}

#ifdef EN_SUPPORT_APP_B
	if(TRUE == FLASH_HAL_GetFlashConfigInfo(APP_B_TYPE, &pBlockInfo, &item))
	{
		while(item)
		{
			if((0u != (pBlockInfo->xBlockStartLogicalAddr & flashAddrLowByte)) || 
				(0u != (pBlockInfo->xBlockEndLogicalAddr & flashAddrLowByte)))
			{
				return FALSE;
			}

			item--;
			pBlockInfo++;
		}
	}

#endif


	return TRUE;
}

/*获取核心配置编号*/
uint32 FLASH_HAL_GetConfigCoreNo(void)
{
	return CORE_NO;
}

/*获取核心APP镜像地址配置*/
boolean FLASH_HAL_GetMultiCoreMirrorAddr(const tAPPType i_appType, const uint32 i_coreNo, uint32 *o_pMirrorAddr)
{
	boolean result = FALSE;

#if (CORE_NO >= 1)
	if((APP_A_TYPE == i_appType) && (i_coreNo < CORE_NO))
	{
		*o_pMirrorAddr = gs_astMultiCoreAPPRemapInfo[i_coreNo].imageAMirrorAddr;
		
		result = TRUE;
	}
	else
	{
#ifdef EN_SUPPORT_APP_B
		if((APP_B_TYPE == i_appType) && (i_coreNo < CORE_NO))
		{
			*o_pMirrorAddr = gs_astMultiCoreAPPRemapInfo[i_coreNo].imageBMirrorAddr;

			result = TRUE;
		}
#endif /*#ifdef EN_SUPPORT_APP_B*/
	}

#endif /*#if (CORE_NO >= 1)*/

	return result;
}


/*获取核心重映射地址*/
boolean FLASH_HAL_GetMultiCoreRemapAddr(const tAPPType i_appType, const uint32 i_coreNo, uint32 *o_pReampAddr)
{
	boolean result = FALSE;

#if (CORE_NO >= 1)
	if((APP_A_TYPE == i_appType) && (i_coreNo < CORE_NO))
	{
		*o_pReampAddr = gs_astMultiCoreAPPRemapInfo[i_coreNo].remapApplicationAddr;
		
		result = TRUE;
	}
	else
	{
#ifdef EN_SUPPORT_APP_B
		if((APP_B_TYPE == i_appType) && (i_coreNo < CORE_NO))
		{
			*o_pReampAddr = gs_astMultiCoreAPPRemapInfo[i_coreNo].remapApplicationAddr;

			result = TRUE;
		}
#endif /*#ifdef EN_SUPPORT_APP_B*/
	}

#endif /*#if (CORE_NO >= 1)*/

	return result;
}

boolean FLASH_HAL_GetFlashConfigInfo(const tAPPType i_appType,
							BlockInfo_t ** o_ppBlockInfo,
							uint32 *o_pItemLen)
{
	boolean result = FALSE;
	
	if(APP_A_TYPE == i_appType)
	{
		*o_ppBlockInfo = (BlockInfo_t *)gs_astBlockNumA;
		*o_pItemLen = gs_blockNumA;

		result = TRUE;
	}
	else
	{
#ifdef EN_SUPPORT_APP_B
		if(APP_B_TYPE == i_appType)
		{
			*o_ppBlockInfo = (BlockInfo_t *)gs_astBlockNumB;
			*o_pItemLen = gs_blockNumB;

			result = TRUE;
		}
#endif
	}


	return result;
}


boolean FLASH_HAL_GetAPPInfo(const tAPPType i_appType, uint32 *o_pAppInfoStartAddr, uint32 *o_pBlockSize)
{
	boolean result = FALSE;
	
	if(APP_A_TYPE == i_appType)
	{
		*o_pAppInfoStartAddr = gs_astBlockNumA[0u].xBlockStartLogicalAddr;
		*o_pBlockSize = gs_astBlockNumA[0u].xBlockEndLogicalAddr - gs_astBlockNumA[0u].xBlockStartLogicalAddr;

		result = TRUE;
	}
	else
	{
#ifdef EN_SUPPORT_APP_B
		if(APP_B_TYPE == i_appType)
		{
			*o_pAppInfoStartAddr = gs_astBlockNumB[0u].xBlockStartLogicalAddr;
			*o_pBlockSize = gs_astBlockNumB[0u].xBlockEndLogicalAddr - gs_astBlockNumB[0u].xBlockStartLogicalAddr;

			result = TRUE;
		}
#endif
	}

	return result;
}

/*获取1个扇区 = 字节数*/
uint32 FLASH_HAL_Get1SectorBytes(void)
{
	return SECTOR_LEN;
}

/*获取flash长度对应的扇区数*/
uint32 FLASH_HAL_GetFlashLengthToSectors(const uint32 i_startFlashAddr, const uint32 i_len)
{
	uint32 sectorNo = 0u;
	const uint32 flashAddrLowByte = (SECTOR_LEN) - 1u;
	uint32 flashAddrTmp = 0u;

	flashAddrTmp = (i_startFlashAddr & flashAddrLowByte);

	if(i_len <= SECTOR_LEN)
	{
		flashAddrTmp += i_len;
		if(flashAddrTmp <= SECTOR_LEN)
		{
			sectorNo = 1u;
		}
		else
		{
			sectorNo = 2u;
		}
	}
	else
	{
		sectorNo = i_len / SECTOR_LEN;
		if(0u != (i_len & flashAddrLowByte))
		{
			sectorNo += 1u;
		}

		if((0u != flashAddrTmp) && (flashAddrTmp != ((flashAddrTmp + i_len) & flashAddrLowByte)))
		{
			sectorNo += 1u;
		}
	}

	return sectorNo;
}

/*获取flash  driver 的起始地址与长度*/
boolean FLASH_HAL_GetFlashDriverInfo(uint32 *o_pFlashDriverAddrStart, uint32 *o_pFlashDriverEndAddr)
{
	ASSERT(NULL_PTR == o_pFlashDriverAddrStart);
	ASSERT(NULL_PTR == o_pFlashDriverEndAddr);


	*o_pFlashDriverAddrStart = gs_astFlashDriverBlock[0u].xBlockStartLogicalAddr;
	*o_pFlashDriverEndAddr = gs_astFlashDriverBlock[0u].xBlockEndLogicalAddr;

	return TRUE;
}

/*get reset handler information*/
void FLASH_HAL_GetRestHanlderInfo(boolean *o_pIsEnableWriteResetHandlerInFlash, uint32 *o_pResetHanderOffset, uint32 *o_pResetHandlerLength)
{
	ASSERT(NULL_PTR == o_pIsEnableWriteResetHandlerInFlash);
	ASSERT(NULL_PTR == o_pResetHanderOffset);
	ASSERT(NULL_PTR == o_pResetHandlerLength);

	*o_pIsEnableWriteResetHandlerInFlash = EN_WRITE_RESET_HANDLER_IN_FLASH;
	*o_pResetHanderOffset = APP_VECTOR_TABLE_OFFSET + RESET_HANDLE_OFFSET;
	*o_pResetHandlerLength = RESET_HANDLER_ADDR_LEN;
}

/*Get storage reset handler infomation*/
uint32 FLASH_HAL_GetStorageRestHandlerAddr(void)
{
	return APP_VECTOR_TABLE_OFFSET + RESET_HANDLE_OFFSET;
}


/*是否启用在flash中写入复位处理程序?*/
boolean FLASH_HAL_IsEnableStorageResetHandlerInFlash(void)
{
	return EN_WRITE_RESET_HANDLER_IN_FLASH;
}

/*get reset handler addr length*/
uint32 FLASH_HAL_GetResetHandlerLen(void)
{
	return RESET_HANDLER_ADDR_LEN;
}

/*FUNCTION**********************************************************************
 *
 * Function Name : FLASH_HAL_LogicalToPhysicalAddr
 * Description   : 该函数实现逻辑地址到物理地址的转换.
 *
 *END**************************************************************************/
uint32 FLASH_HAL_LogicalToPhysicalAddr(const uint32 i_logicalAddr)
{
	uint32 globalAddr = 0u;


	globalAddr = (uint32)i_logicalAddr;

	return globalAddr;

}

/*物理地址到逻辑地址*/
uint32 FLASH_HAL_PhysicalToLogicalAddr(const uint32 i_globalAddr)
{
	uint32 logicalAddr = 0u;


	logicalAddr = (uint32)i_globalAddr;

	return logicalAddr;
}

/*获取擦除闪存扇区的最长时间*/
uint32 FLASH_HAL_GetEraseFlashASectorMaxTimeMs(void)
{
	return MAX_ERASE_SECTOR_FLASH_MS;
}

/*获取flash中扇区的总数*/
uint32 FLASH_HAL_GetTotalSectors(const tAPPType i_appType)
{
	uint32 sectors = 0u;
	BlockInfo_t *pBlockInfo = NULL_PTR;
	uint32 itemNo = 0u;
	uint32 flashLength = 0u;
	uint32 index = 0u;

	if(TRUE == FLASH_HAL_GetFlashConfigInfo(i_appType, &pBlockInfo, &itemNo))
	{
		for(index = 0u; index < itemNo; index++)
		{
			flashLength = pBlockInfo[index].xBlockEndLogicalAddr - pBlockInfo[index].xBlockStartLogicalAddr;
			sectors += FLASH_HAL_GetFlashLengthToSectors(pBlockInfo[index].xBlockEndLogicalAddr, flashLength);
		}
	}

	return sectors;
}

/*扇区号对应flash地址*/
boolean FLASH_HAL_SectorNumberToFlashAddress(const tAPPType i_appType, const uint32 i_secotrNo, uint32 *o_pFlashAddr)
{
	boolean result = FALSE;
	BlockInfo_t *pBlockInfo = NULL_PTR;
	uint32 itemNo = 0u;
	uint32 totalSectors = 0u;
	uint32 index = 0u;

	uint32 sectorsTmp = 0u;
	const uint32 flashAddrLowByte = (SECTOR_LEN) - 1u;
	uint32 flashAddrTmp = 0u;
	
	if(TRUE == FLASH_HAL_GetFlashConfigInfo(i_appType, &pBlockInfo, &itemNo))
	{
		totalSectors = FLASH_HAL_GetTotalSectors(i_appType);
		if(i_secotrNo < totalSectors)
		{
			sectorsTmp = 0u;

			while(index < itemNo)
			{
				flashAddrTmp = pBlockInfo[index].xBlockStartLogicalAddr & flashAddrLowByte;
				if(flashAddrTmp)
				{
					sectorsTmp += 1u;
				}

				flashAddrTmp = pBlockInfo[index].xBlockStartLogicalAddr - flashAddrTmp;
				while(flashAddrTmp < pBlockInfo[index].xBlockEndLogicalAddr)
				{
					if(sectorsTmp == i_secotrNo)
					{
						*o_pFlashAddr = flashAddrTmp;

						result = TRUE;

						break;
					}

					flashAddrTmp += SECTOR_LEN;

					sectorsTmp++;
				}

				if(TRUE == result)
				{
					break;
				}
						
				index++;
			}
		
		}
		else
		{
			result = FALSE;
		}
	}


	return result;	
}






