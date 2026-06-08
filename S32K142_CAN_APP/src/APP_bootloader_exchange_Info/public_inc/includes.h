/*
 * includes.h
 *
 *  Created on: 2026年4月16日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef APP_BOOTLOADER_EXCHANGE_INFO_PUBLIC_INC_INCLUDES_H_
#define APP_BOOTLOADER_EXCHANGE_INFO_PUBLIC_INC_INCLUDES_H_

/*common_types.h define uint32/sint32...*/
#include "sdk_project_config.h"
#include "common_types.h"
#include "toolchain.h"
#include "autolibc.h"

/*user_config.h is used define macro for application.*/
#include "user_config.h"

/****************************ASSERT and DEBUG IO/TIMER*******************/
#if defined (EN_ASSERT) || defined (EN_DEBUG_TIMER) || defined (EN_DEBUG_PRINT)
#include "bootloader_debug.h"
#endif

#ifdef EN_ASSERT
#define ASSERT(xValue)\
do{\
	if(xValue)\
	{\
		while(1){}\
	}\
}while(0)

#define ASSERT_Printf(pString, xValue)\
do{\
	if(FALSE != xValue)\
	{\
		DebugPrintf(pString);\
	}\
}while(0)

#define ASSERT_DebugPrintf(pString, xValue)\
do{\
	if(FALSE != xValue)\
	{\
		DebugPrintf((pString));\
		while(1u){}\
	}\
}while(0)
#else
#define ASSERT(xValue)
#define ASSERT_Printf(pString, xValue)
#define ASSERT_DebugPrintf(pString, xValue)
#endif
/************************************************************/

/************************Debug config**************************/
#ifdef EN_DEBUG_FLS_MODULE
#define FLSDebugPrintf DebugPrintf
#else
#define FLSDebugPrintf(fmt, ...)
#endif

#ifdef EN_UDS_DEBUG
#define UDSDebugPrintf DebugPrintf
#else
#define UDSDebugPrintf(fmt, ...)
#endif

#ifdef EN_TP_DEBUG
#define TPDebugPrintf DebugPrintf
#else
#define TPDebugPrintf(fmt, ...)
#endif

#ifdef EN_APP_DEBUG
#define APPDebugPrintf DebugPrintf
#else
#define APPDebugPrintf(fmt, ...)
#endif

#ifdef EN_DEBUG_FIFO
#define FIFODebugPrintf DebugPrintf
#else
#define FIFODebugPrintf(fmt, ...)
#endif


/***********************************************************/

/******************TP enable and define message ID****************/

/*TP enable check*/
#if (defined EN_CAN_TP) 
#if (defined EN_LIN_TP) || (defined EN_ETHERNET_TP) || (defined EN_OTHERS_TP)
#error "Please check multi TP was enabled!"
#endif

#elif defined EN_LIN_TP
#if (defined EN_CAN_TP) ||  (defined EN_ETHERNET_TP) || (defined EN_OTHERS_TP)
#error "Please check multi TP was enabled!"
#endif

#elif defined  EN_ETHERNET_TP
#if (defined EN_CAN_TP) || (defined EN_LIN_TP) || (defined EN_OTHERS_TP)
#error "Please check multi TP was enabled!"
#endif

#elif defined EN_OTHERS_TP
#if (defined EN_CAN_TP) || (defined EN_LIN_TP) || (defined EN_ETHERNET_TP)
#error "Please check multi TP was enabled!"
#endif

#else
#error "Please enable one TP (EN_CAN_TP/EN_LIN_TP/EN_ETHERNET_TP/EN_OTHERS_TP)"
#endif

/***********************************************************/

#endif /*__INCLUDES_H__*/

/************************End file********************************/

