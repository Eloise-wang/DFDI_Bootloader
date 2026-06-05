/*
 * bootloader_debug.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */
#include "bootloader_debug.h"

#ifdef EN_DEBUG_PRINT

#include <stdio.h>
#include <stdarg.h>
#include <string.h>
/*****************************************/
#endif



/*******************************************************************************
 * Variables
 ******************************************************************************/


/*FUNCTION**********************************************************************
 *
 * Function Name : BOOTLOADER_DEBUG_Init
 * Description   : 初始化该模块
 *
 * Implements : BOOTLOADER_DEBUG_Init_Activity
 *END**************************************************************************/
void BOOTLOADER_DEBUG_Init(void)
{
	Debug_InitDebugIO();
	Debug_InitDebugTimer();
	Debug_InitDebugPrint();

}

#ifdef EN_DEBUG_PRINT
void Bootloader_DebugPrintInit(void)
{
	LPUART_DRV_Init(INST_LPUART_1, &lpUartState0, &lpuart_0_InitConfig0);
}
void Bootloader_DebugPrint(const char *fmt, ...)
{

	static char buffer [DEBUG_LOG_BUF_SIZE];
	
	va_list ap;
	va_start(ap, fmt);
	vsnprintf(buffer, DEBUG_LOG_BUF_SIZE, fmt, ap);
	va_end(ap);


	LPUART_DRV_SendDataBlocking(INST_LPUART_1,(uint8 *)buffer, strlen(buffer), 1000);
}
#endif

/******************************************************************************
 * EOF
 *****************************************************************************/
