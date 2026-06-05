/*
 * bootloader_main.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include "bootloader_main.h"


/*******************************************************************************
 * User Include
 ******************************************************************************/
#include "includes.h"
#include "uds_app.h"
#include "TP.h"
#include "fls_app.h"
#include "timer_hal.h"
#include "watchdog_hal.h"
#include "boot.h"
#include "CRC_HAL.h"
#include "wdog_driver.h"

/*******************************************************************************
 * Variables
 ******************************************************************************/

/*print bootloader version*/
static void BOOTLOADER_MAIN_PrintVersion(void);

/*FUNCTION**********************************************************************
 *
 * Function Name : BOOTLOADER_MAIN_Init
 * Description   : This function initial this module.
 *
 * Implements : BOOTLOADER_MAIN_Init_Activity
 *END**************************************************************************/
void BOOTLOADER_MAIN_Init(void (*pfBSP_Init)(void), void (*pfAbortTxMsg)(void))
{
	uint32 resetSrs = (uint32)RCM->SRS;
	boolean crcInitOk = FALSE;

	(void)WDOG_DRV_Deinit(WDOG_CONFIG_1_INST);

	/*Is power on ?*/
	if(TRUE == Boot_IsPowerOnTriggerReset())
	{
		Boot_PowerONClearAllFlag();
	}

	crcInitOk = CRC_HAL_Init();

	/*Check jump to APP or not.*/
	Boot_JumpToAppOrNot();
	
	/*User Init: clock CAN Lin etc..*/
	if(NULL_PTR != pfBSP_Init)
	{
		/*do BSP init*/
		(*pfBSP_Init)();
	}
	
	BOOTLOADER_DEBUG_Init();

	APP_DebugPrintf("\nRCM_SRS=0x%08X\n", resetSrs);
	if(TRUE != crcInitOk)
	{
		APP_DebugPrintf("CRC_HAL_Init failed!\n");
	}
    
	WATCHDOG_HAL_Init();

	TIMER_HAL_Init();

	TP_Init();

	if(TRUE != FLASH_HAL_APPAddrCheck())
	{
		APP_DebugPrintf("\n FLASH_HAL_APPAddrCheck check error!\n");
	}

	UDS_Init();

	Boot_CheckReqBootloaderMode();

	TP_RegisterAbortTxMsg(pfAbortTxMsg);

	FLASH_APP_Init();

	/*Print bootloader version*/
	BOOTLOADER_MAIN_PrintVersion();
}

/*FUNCTION**********************************************************************
 *
 * Function Name : BOOTLOADER_MAIN_Demo
 * Description   : This function initial this module.
 *
 * Implements : BOOTLOADER_MAIN_Demo_Activity
 *END**************************************************************************/
void BOOTLOADER_MAIN_Demo(void)
{
#ifdef EN_DEBUG_IO
	static uint16 timerCnt1Ms = 0u;
#endif
	
	if(TRUE == TIMER_HAL_Is1msTickTimeout())
	{
		TP_SystemTickCtl();
		
		UDS_SystemTickCtl();

#ifdef EN_DEBUG_IO		
		/*toggle LED*/
		timerCnt1Ms++;
		if(250u == timerCnt1Ms)
		{
			timerCnt1Ms = 0u;

			Debug_ToggleDebugIO();
		}
#endif
	}

	/*fed watchdog every 100ms*/
	if(TRUE == TIMER_HAL_Is100msTickTimeout())
	{
		WATCHDOG_HAL_Fed();
	}

	TP_MainFun();

	UDS_MainFun();

	Flash_OperateMainFunction();	
}

/*print bootloader version*/
static void BOOTLOADER_MAIN_PrintVersion(void)
{
	uint8 aBootloaderSWVersion[] = BOOTLOADER_SW_VERSION;

	APP_DebugPrintf("\nBootloader SW version:%d.%d.%d\n", aBootloaderSWVersion[1u], aBootloaderSWVersion[2u], aBootloaderSWVersion[3u]);
}

/*FUNCTION**********************************************************************
 *
 * Function Name : BOOTLOADER_MAIN_Deinit
 * Description   : This function initial this module.
 *
 * Implements : BOOTLOADER_MAIN_Deinit_Activity
 *END**************************************************************************/
void BOOTLOADER_MAIN_Deinit(void)
{

	
}
/******************************************************************************
 * EOF
 *****************************************************************************/
