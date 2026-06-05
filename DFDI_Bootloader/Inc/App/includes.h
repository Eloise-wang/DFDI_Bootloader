/*
 * includes.h
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 Bootloader 公共包含头 】
 *       Note : 1. 适配芯片：AC78406
 */

#ifndef INCLUDES_H_
#define INCLUDES_H_

#include "ac7840x.h"
#include <stdint.h>
#include "common_types.h"
#include "toolchain.h"
#include "unifiedStack_autolibc.h"
#include "user_config.h"

#define BOOTLOADER_VERSION "V1.0"

#if defined(EN_ASSERT) || defined(EN_DEBUG_TIMER) || defined(EN_DEBUG_PRINT) || defined(EN_DEBUG_IO)
#include "bootloader_debug.h"
#endif

#ifdef EN_ASSERT
#define ASSERT(xValue) do{ if(xValue){ while(1){} } }while(0)
#define ASSERT_Printf(pString, xValue) do{ if(FALSE != (xValue)){ Debug_Printf("%s", (pString)); } }while(0)
#define ASSERT_DebugPrintf(pString, xValue) do{ if(FALSE != (xValue)){ Debug_Printf("%s", (pString)); while(1u){} } }while(0)
#else
#define ASSERT(xValue)
#define ASSERT_Printf(pString, xValue)
#define ASSERT_DebugPrintf(pString, xValue)
#endif

#ifdef EN_DEBUG_FLS_MODULE
#define FLS_DebugPrintf Debug_Printf
#else
#define FLS_DebugPrintf(fmt, ...)
#endif

#ifdef EN_UDS_DEBUG
#define UDS_DebugPrintf Debug_Printf
#else
#define UDS_DebugPrintf(fmt, ...)
#endif

#ifdef EN_TP_DEBUG
#define TP_DebugPrintf Debug_Printf
#else
#define TP_DebugPrintf(fmt, ...)
#endif

#ifdef EN_APP_DEBUG
#define APP_DebugPrintf Debug_Printf
#else
#define APP_DebugPrintf(fmt, ...)
#endif

#ifdef EN_DEBUG_FIFO
#define FIFO_DebugPrintf Debug_Printf
#else
#define FIFO_DebugPrintf(fmt, ...)
#endif

#if defined(EN_CAN_TP)
#if defined(EN_LIN_TP) || defined(EN_ETHERNET_TP) || defined(EN_OTHERS_TP)
#error "Please check multi TP was enabled!"
#endif
#elif defined(EN_LIN_TP)
#if defined(EN_CAN_TP) || defined(EN_ETHERNET_TP) || defined(EN_OTHERS_TP)
#error "Please check multi TP was enabled!"
#endif
#elif defined(EN_ETHERNET_TP)
#if defined(EN_CAN_TP) || defined(EN_LIN_TP) || defined(EN_OTHERS_TP)
#error "Please check multi TP was enabled!"
#endif
#elif defined(EN_OTHERS_TP)
#if defined(EN_CAN_TP) || defined(EN_LIN_TP) || defined(EN_ETHERNET_TP)
#error "Please check multi TP was enabled!"
#endif
#else
#error "Please enable one TP (EN_CAN_TP/EN_LIN_TP/EN_ETHERNET_TP/EN_OTHERS_TP)"
#endif

#endif /* INCLUDES_H_ */
