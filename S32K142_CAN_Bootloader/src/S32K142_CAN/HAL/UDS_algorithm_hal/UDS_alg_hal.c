/*
 * UDS_alg_hal.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include <AES.h>
#include <UDS_alg_hal.h>
#include "timer_hal.h"


/*******************************************************************************
 * 变量
 ******************************************************************************/
static const uint8 gs_aKey[] = {0x00u, 0x01u, 0x02u, 0x03u, 0x04u, 0x05u, 0x06u, 0x07u,
                      0x08u, 0x09u, 0x0au, 0x0bu, 0x0cu, 0x0du, 0x0eu, 0x0fu}; 

#ifdef EN_ALG_SW
/*here is not init, because this used for software random*/
static uint32 gs_UDS_SWTimerTickCnt;

#endif


/*FUNCTION**********************************************************************
 *
 * Function Name : UDS_ALG_HAL_Init
 * Description   : 该函数用于初始化此模块。
 *
 * Implements : UDS_ALG_hal_Init_Activity
 *END**************************************************************************/
void UDS_ALG_HAL_Init(void)
{
}

/*FUNCTION**********************************************************************
 *
 * Function Name : UDS_ALG_HAL_EncryptData
 * Description   : 此函数用于加密数据。
 *
 * Implements : UDS_ALG_hal_Init_Activity
 *END**************************************************************************/
 boolean UDS_ALG_HAL_EncryptData(const uint8 *i_pPlainText, const uint32 i_dataLen, uint8 *o_pCipherText)
{
	boolean ret = FALSE;

#ifdef EN_ALG_SW
	aes((sint8 *)i_pPlainText, i_dataLen, (sint8 *)&gs_aKey[0], (sint8 *)o_pCipherText);
#endif

	


	return ret;
}

/*FUNCTION**********************************************************************
 *
 * Function Name : UDS_ALG_HAL_DecryptData
 * Description   : 此函数用于解密数据。
 *
 *
 * Implements : UDS_ALG_hal_Init_Activity
 *END**************************************************************************/
 boolean UDS_ALG_HAL_DecryptData(const uint8 *i_pCipherText, const uint32 i_dataLen, uint8 *o_pPlainText)
{
	boolean ret = FALSE;

#ifdef EN_ALG_SW
	deAes((sint8 *)i_pCipherText, i_dataLen, (sint8 *)&gs_aKey[0], (sint8 *)o_pPlainText);	
#endif

	


	return ret;
}

/*FUNCTION**********************************************************************
 *
 * Function Name : UDS_ALG_HAL_GetRandom
 * Description   : 此函数用于获取随机值。
 *
 * Implements : UDS_ALG_hal_Init_Activity
 *END**************************************************************************/
boolean UDS_ALG_HAL_GetRandom(const uint32 i_needRandomDataLen, uint8 *o_pRandomDataBuf)
{
	boolean ret = TRUE;
	uint8 index = 0u;
	uint8 *pRandomTmp = NULL_PTR;
	uint32 random = (uint32)&index;

	if((0u == i_needRandomDataLen) || (NULL_PTR == o_pRandomDataBuf))
	{
		ret = FALSE;
	}

#ifdef EN_ALG_SW
#if 1
	random = TIMER_HAL_GetTimerTickCnt();
	
	random |= (gs_UDS_SWTimerTickCnt << 16u);
	fsl_srand(random);

	if(TRUE == ret)
	{		
		pRandomTmp = (uint8 *)&random;
		
		for(index = 0u; index < i_needRandomDataLen; index++)
		{
			if(((index & 0x03u) == 0x03u))
			{
				/*get random*/
				random = fsl_rand();
			}
			
			o_pRandomDataBuf[index] = pRandomTmp[index & 0x03];
		}
	}
#else
	random = 0u;
	for(index = 0; index < i_needRandomDataLen; index++)
	{
		o_pRandomDataBuf[index] = random;

		random += 0x11u;
	}

#endif

#endif

	return ret;

}

/*UDS software timer tick*/
void UDS_ALG_HAL_AddSWTimerTickCnt(void)
{
#ifdef EN_ALG_SW
	gs_UDS_SWTimerTickCnt++;
#endif
}

/*FUNCTION**********************************************************************
 *
 * Function Name : UDS_ALG_HAL_Deinit
 * Description   : 该函数用于初始化此模块。
 *
 * Implements : UDS_ALG_Deinit_Activity
 *END**************************************************************************/
void UDS_ALG_HAL_Deinit(void)
{


}

/******************************************************************************
 * EOF
 *****************************************************************************/
