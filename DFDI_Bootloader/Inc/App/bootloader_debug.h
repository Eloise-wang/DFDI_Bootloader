/*
 * bootloader_debug.h
 */

#ifndef BOOTLOADER_DEBUG_H_
#define BOOTLOADER_DEBUG_H_

#include "includes.h"

#ifdef EN_DEBUG_IO
#include "debug_IO.h"
#endif

#ifdef EN_DEBUG_TIMER
#include "debug_timer.h"
#endif

#ifdef EN_DEBUG_IO
#define Debug_InitDebugIO()        DEBUG_IO_Init()
#define Debug_SetDebugIOHigh()     DEBUG_IO_SetDebugIOHigh()
#define Debug_SetDebugIOLow()      DEBUG_IO_SetDebugIOLow()
#define Debug_ToggleDebugIO()      DEBUG_IO_ToggleDebugIO()
#else
#define Debug_InitDebugIO()
#define Debug_SetDebugIOHigh()
#define Debug_SetDebugIOLow()
#define Debug_ToggleDebugIO()
#endif

#ifdef EN_DEBUG_TIMER
#define Debug_InitDebugTimer()     DEBUG_TIMER_Init()
#define Debug_GetDegbuTimerValue() DEBUG_TIMER_GetTimerValue()
#else
#define Debug_InitDebugTimer()
#define Debug_GetDegbuTimerValue() (0u)
#endif

#ifdef EN_DEBUG_PRINT
#define DEBUG_LOG_BUF_SIZE (200u)
extern void Bootloader_DebugPrintInit(void);
extern void Bootloader_DebugPrint(const char *fmt, ...);
#define Debug_InitDebugPrint() Bootloader_DebugPrintInit()
#define Debug_Printf(fmt, ...) Bootloader_DebugPrint(fmt, ##__VA_ARGS__)
#else
#define Debug_InitDebugPrint()
#define Debug_Printf(fmt, ...)
#endif

extern void BOOTLOADER_DEBUG_Init(void);

#endif /* BOOTLOADER_DEBUG_H_ */
