/*
 * boot.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include "boot.h"

#include "includes.h"
#include "fls_app.h"
#include "uds_app.h"
#include "wdog_driver.h"

/*******************************************************************************
 * Variables
 ******************************************************************************/
static boolean Boot_IsAPPValid(void)
{
	boolean bResult = FALSE;

	/*check app code flash status. If app code update successfull, this api return TRUE, else return FALSE.*/
	bResult = Flash_IsReadAppInfoFromFlashValid();
	
	if(TRUE == bResult)
	{
		bResult = Flash_IsAppInFlashValid();
	}

	return bResult;
}


/*FUNCTION**********************************************************************
 *
 * Function Name : Boot_JumpToAppOrNot
 * Description   : This function is jump to app or not. If app valid and APP not request enter bootloader, then jump to APP.
 *			     Some MCU call this function need in startup, because jump to APP need to before init Peripheral (clock...).
 *
 * Implements : 
 *END*************************************************************************/
void Boot_JumpToAppOrNot(void)
{
	uint32 resetHandlerAddr = 0u;

	if((TRUE == Boot_IsAPPValid()) && (TRUE != Boot_IsRequestEnterBootloader()))
	{
		Boot_RemapApplication();
		
		resetHandlerAddr = Flash_GetResetHandlerAddr();
		
		(void)WDOG_DRV_Deinit(WDOG_CONFIG_1_INST);
		WDOG_DRV_Trigger(WDOG_CONFIG_1_INST);

		Boot_JumpToApp(resetHandlerAddr);
	}
}

/*request bootloader mode check*/
boolean Boot_CheckReqBootloaderMode(void)
{
	boolean ret = FALSE;

	if(TRUE == Boot_IsRequestEnterBootloader())
	{
		Boot_ClearRequestEnterBootloaderFlag();

		/*write a message to host based on TP*/
		if(TRUE == UDS_TxMsgToHost())
		{
			ret = TRUE;
			APP_DebugPrintf("\n Enter bootloader mode\n");
		}
		else
		{
			APP_DebugPrintf("\n Enter bootloader mode and transmit confirm message failed!\n");
		}
	}

	return ret;
}


/******************************************************************************
 * EOF
 *****************************************************************************/
