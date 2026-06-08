/*
 * bootloader_debug.h
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef APP_BOOTLOADER_EXCHANGE_INFO_DEBUG_BOOTLOADER_DEBUG_H_
#define APP_BOOTLOADER_EXCHANGE_INFO_DEBUG_BOOTLOADER_DEBUG_H_
#include "includes.h"

#ifdef EN_DEBUG_IO
#include "debug_IO.h"
#endif /*#ifdef EN_DEBUG_IO*/

#ifdef EN_DEBUG_TIMER
#include "debug_timer.h"
#endif /*#ifdef EN_DEBUG_TIMER*/

/*! 
 * @file: bootloader_debug.h
 *
 * @brief: Add your description here for this file.
 *
 * @page misra_violations MISRA-C:2012 violations
 *
 * @section Rule_X-Y Rule: X.Y (Required)
 * Violates MISRA 2012 Required Rule X.Y, Rule description here.
 *
 * @par Version Histroy
<pre><b>
Version:   Author:       Date&&Time:      Revision Log: </b>
 V1.0.0  Tomlin Tang  2019-01-17 15:52:56  First Creat
When you update, please do not forgot to del me and add your info at here.
</pre>
 */

/*!
 * @addtogroup bootloader_debug
 * @{
 */

/*******************************************************************************
 * Definitions
 ******************************************************************************/

#if defined (__cplusplus)
extern "C" {
#endif

/*******************************************************************************
 * API
 ******************************************************************************/
#ifdef EN_DEBUG_IO
#define InitDebugIO() DEBUG_IO_Init()
#define SetDebugIOHigh() DEBUG_IO_SetDebugIOHigh()
#define SetDebugIOLow() DEBUG_IO_SetDebugIOLow()
#define ToggleDebugIO() DEBUG_IO_ToggleDebugIO()
#else
#define InitDebugIO() 
#define SetDebugIOHigh() 
#define SetDebugIOLow() 
#define ToggleDebugIO() 
#endif /*#ifdef EN_DEBUG_IO*/



#ifdef EN_DEBUG_TIMER
#define InitDebugTimer() DEBUG_TIMER_Init()
#define GetDegbuTimerValue() DEBUG_TIMER_GetTimerValue()
#else
#define InitDebugTimer() 
#define GetDegbuTimerValue() 
#endif /*#ifdef EN_DEBUG_TIMER*/

#ifdef EN_DEBUG_PRINT
#define DEBUG_LOG_BUF_SIZE (200u)
extern void Bootloader_DebugPrintInit(void);
extern void Bootloader_DebugPrint(const char *fmt, ...);

#define InitDebugPrint() Bootloader_DebugPrintInit()
//LPUART_DRV_Init(INST_LPUART1, &lpuart1_State, &lpuart1_InitConfig0);
#define DebugPrintf(fmt, ...) Bootloader_DebugPrint(fmt, ##__VA_ARGS__)
#else
/*Some MCU cannot called printf lib. E.g., S12Gxxx*/
#define InitDebugPrint()
#define DebugPrintf(fmt, args...)
#endif


extern 	void BOOTLOADER_DEBUG_Init(void);



#endif /* BOOTLOADER_DEBUG_H */
/*******************************************************************************
 * EOF
 ******************************************************************************/
