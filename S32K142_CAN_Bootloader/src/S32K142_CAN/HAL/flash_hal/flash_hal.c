/*
 * flash_hal.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include "flash_hal.h"

#include "flash.h"

/*******************************************************************************
 * 变量
 ******************************************************************************/
static boolean FLASH_HAL_Init(void);

static boolean FLASH_HAL_EraseSector(const uint32 i_startAddr, const uint32 i_noEraseSectors);

static boolean FLASH_HAL_WriteData(const uint32 i_startAddr,
								 const uint8 *i_pDataBuf,
								 const uint32 i_dataLen);

static boolean FLASH_HAL_ReadData(const uint32 i_startAddr,
								const uint32 i_readLen,
					    		uint8 *o_pDataBuf);

static void FLASH_HAL_Deinit(void);



/*FUNCTION**********************************************************************
 *
 * Function Name : FLASH_HAL_Init
 * Description   : 该函数用于初始化此模块.
 *
 * Implements : FLASH_HAL_Init_Activity
 *END**************************************************************************/
static boolean FLASH_HAL_Init(void)
{
	InitFlashAPI();

    return TRUE;
}

/*FUNCTION**********************************************************************
 *
 * Function Name : FLASH_HAL_EraseSector
 * Description   : 该函数用于擦除闪存扇区。.
 * Parameters	  :  i_startAddr 启动闪存地址的输入项
                        i_noEraseSectors 输入擦除扇区的数量
 * Implements : FLASH_HAL_Init_Activity
 *END**************************************************************************/
static boolean FLASH_HAL_EraseSector(const uint32 i_startAddr, const uint32 i_noEraseSectors)
{
    boolean retstates = FALSE;        /* 存储驱动程序API的返回码 */
	uint8 ret = 0u;
	uint32 length = 0u;
	uint32 sectorLength = 0u;

	sectorLength = FLASH_HAL_Get1SectorBytes();

	length = i_noEraseSectors * sectorLength;

    ret = EraseFlashSector(i_startAddr, length);

	if(0u == ret)
	{
		retstates = TRUE;
	}

	return retstates;

}


/*FUNCTION**********************************************************************
 *
 * Function Name : FLASH_HAL_WriteData
 * Description   : 该函数用于向flash中写入数据。若数据写入成功则返回TRUE，否则返回FALSE。
 * Parameters	  :  i_startAddr 启动闪存地址的输入
                        i_pDataBuf 写入数据缓冲区
                        i_dataLen 写入数据长度
 * Implements : FLASH_HAL_Init_Activity
 *END**************************************************************************/

static boolean FLASH_HAL_WriteData(const uint32 i_startAddr,
								 const uint8 *i_pDataBuf,
								 const uint32 i_dataLen)
{
    boolean retstates = FALSE;
	uint8 lessWriteLen = 8u;
	uint8 aDataBuf[8u] = {0xFFu, 0xFFu, 0xFFu, 0xFFu, 0xFFu, 0xFFu, 0xFFu, 0xFFu};
	uint32 writeDataLen = 0u;
	uint8 index = 0u;

	DisableAllInterrupts();
	if(i_dataLen  & (lessWriteLen - 1))
	{
		/*if write data more than 8 bytes*/
		if(i_dataLen > lessWriteLen)
		{
			writeDataLen = i_dataLen - (i_dataLen  & (lessWriteLen - 1));
			if(0u == WriteFlash(i_startAddr, i_pDataBuf, writeDataLen))
		    {
		    	retstates = TRUE;
		    }
			else
			{
				retstates = FALSE;
			}

			if((TRUE == retstates))
			{
				for(index = 0u; index < (i_dataLen  & (lessWriteLen - 1)); index++)
				{
					aDataBuf[index] = i_pDataBuf[writeDataLen + index];
				}
				
				if(0u == WriteFlash(i_startAddr + writeDataLen, aDataBuf, 8u))
			    {
			    	retstates = TRUE;
			    }
			}
		}
		else
		{
			for(index = 0u; index < i_dataLen; index++)
			{
				aDataBuf[index] = i_pDataBuf[writeDataLen + index];
			}
			
			if(0u == WriteFlash(i_startAddr + writeDataLen, aDataBuf, 8u))
		    {
		    	retstates = TRUE;
		    }			
		}
	}
	else
	{
		if(0u == WriteFlash(i_startAddr, i_pDataBuf, i_dataLen))
	    {
	    	retstates = TRUE;
	    }
	}

	EnableAllInterrupts();
	
	return retstates;

}


/*FUNCTION**********************************************************************
 *
 * Function Name : FLASH_HAL_ReadData
 * Description   : 该函数用于读取随机存取存储器中的数据。若数据读取成功则返回TRUE，否则返回FALSE。
 * Parameters	  :  i_startAddr 启动闪存地址的输入项
                        i_readLen 读取数据长度
                        o_pDataBuf 读取数据缓冲区
 * Implements : FLASH_HAL_Init_Activity
 *END**************************************************************************/
static boolean FLASH_HAL_ReadData(const uint32 i_startAddr,
								const uint32 i_readLen, 
					    		uint8 *o_pDataBuf)
{
	(void)i_readLen;
	(void)i_startAddr;
	(void)o_pDataBuf;

	FLS_DebugPrintf("\n %s\n", __func__);

    //ReadFlashMemory(i_startAddr, i_readLen, o_pDataBuf);
    
	return TRUE;
}

/*FUNCTION**********************************************************************
 *
 * Function Name : FLASH_HAL_Deinit
 * Description   : 去初始化模块.
 *
 * Implements : FLASH_HAL_Deinit_Activity
 *END**************************************************************************/
static void FLASH_HAL_Deinit(void)
{
	FLS_DebugPrintf("\n %s\n", __func__);
}

/*FUNCTION**********************************************************************
 *
 * Function Name : FLASH_HAL_RegisterFlashAPI
 * Description   : 该函数为注册闪存接口。该接口可从主机端下载并存储在随机存取存储器中。
 *
 *END**************************************************************************/
boolean FLASH_HAL_RegisterFlashAPI(tFlashOperateAPI *o_pstFlashOperateAPI)
{
	boolean result = FALSE;

	if(NULL_PTR != o_pstFlashOperateAPI)
	{
		o_pstFlashOperateAPI->pfFlashInit = FLASH_HAL_Init;
		o_pstFlashOperateAPI->pfEraserSecotr = FLASH_HAL_EraseSector;
		o_pstFlashOperateAPI->pfProgramData = FLASH_HAL_WriteData;
		o_pstFlashOperateAPI->pfReadFlashData = FLASH_HAL_ReadData;
		o_pstFlashOperateAPI->pfFlashDeinit = FLASH_HAL_Deinit;

		result = TRUE;
	}

	return result;
}












