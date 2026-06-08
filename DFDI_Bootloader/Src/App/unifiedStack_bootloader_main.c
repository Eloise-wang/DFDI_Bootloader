/*
 * bootloader_main.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

 #include "unifiedStack_bootloader_main.h"


 /*******************************************************************************
  * User Include
  ******************************************************************************/
 #include "includes.h"
#include "unifiedStack_uds_app.h"
#include "unifiedStack_TP.h"
#include "unifiedStack_fls_app.h"
#include "bsp_timer.h"
#include "bsp_watchdog.h"
#include "boot.h"
#include "bsp_crc.h"
#include "wdg_drv.h"
 
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
     uint32 resetSrs = 0u;
     boolean crcInitOk = FALSE;
 
     (void)WDG_DRV_Deinit(WDG_INST);
 
     /*Is power on ?*/
     if(TRUE == Boot_IsPowerOnTriggerReset())
     {
         Boot_PowerONClearAllFlag();
     }
 
     crcInitOk = (boolean)BSP_CRC_Init();
 
     /*Check jump to APP or not.*/
     Boot_JumpToAppOrNot();
     
     /*User Init: clock CAN etc..*/
     if(NULL_PTR != pfBSP_Init)
     {
         /*do BSP init*/
         (*pfBSP_Init)();
     }
     
     (void)BSP_UART_Init(NULL_PTR);
 
     APP_DebugPrintf("\nRCM_SRS=0x%08X\n", resetSrs);
     if(TRUE != crcInitOk)
     {
         APP_DebugPrintf("BSP_CRC_Init failed!\n");
     }
     
     (void)BSP_WATCHDOG_Init();
 
     TIMER_HAL_Init();
 
     TP_Init();
 
     if(TRUE != BSP_Flash_APPAddrCheck())
     {
         APP_DebugPrintf("\n BSP_Flash_APPAddrCheck check error!\n");
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
     if(TRUE == TIMER_HAL_Is1msTickTimeout())
     {
         TP_SystemTickCtl();

         UDS_SystemTickCtl();
     }
 
     /*fed watchdog every 100ms*/
     if(TRUE == TIMER_HAL_Is100msTickTimeout())
     {
         (void)BSP_WATCHDOG_Feed();
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
