/*
 * bootloader_debug.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_DEBUG_BOOTLOADER_DEBUG_H_
#define S32K142_CAN_DEBUG_BOOTLOADER_DEBUG_H_

#include "includes.h"

#ifdef EN_DEBUG_IO
#include "debug_IO.h"
#endif /*#ifdef EN_DEBUG_IO*/

#ifdef EN_DEBUG_TIMER
#include "debug_timer.h"
#endif /*#ifdef EN_DEBUG_TIMER*/



/*******************************************************************************
 * API
 ******************************************************************************/
#ifdef EN_DEBUG_IO
#define Debug_InitDebugIO() DEBUG_IO_Init()
#define Debug_SetDebugIOHigh() DEBUG_IO_SetDebugIOHigh()
#define Debug_SetDebugIOLow() DEBUG_IO_SetDebugIOLow()
#define Debug_ToggleDebugIO() DEBUG_IO_ToggleDebugIO()
#else
#define Debug_InitDebugIO() 
#define Debug_SetDebugIOHigh() 
#define Debug_SetDebugIOLow() 
#define Debug_ToggleDebugIO() 
#endif /*#ifdef EN_DEBUG_IO*/



#ifdef EN_DEBUG_TIMER
#define Debug_InitDebugTimer() DEBUG_TIMER_Init()
#define Debug_GetDegbuTimerValue() DEBUG_TIMER_GetTimerValue()
#else
#define Debug_InitDebugTimer() 
#define Debug_GetDegbuTimerValue() 
#endif /*#ifdef EN_DEBUG_TIMER*/

#ifdef EN_DEBUG_PRINT
#define DEBUG_LOG_BUF_SIZE (200u)
extern void Bootloader_DebugPrintInit(void);
extern void Bootloader_DebugPrint(const char *fmt, ...);

#define Debug_InitDebugPrint() Bootloader_DebugPrintInit()
//LPUART_DRV_Init(INST_LPUART1, &lpuart1_State, &lpuart1_InitConfig0);
#define Debug_Printf(fmt, ...) Bootloader_DebugPrint(fmt, ##__VA_ARGS__)
#else
/*部分单片机无法调用打印输出库。例如：S12Gxxx*/
#define Debug_InitDebugPrint()
#define Debug_Printf(fmt, args...)
#endif


extern 	void BOOTLOADER_DEBUG_Init(void);


#endif /* BOOTLOADER_DEBUG_H */

