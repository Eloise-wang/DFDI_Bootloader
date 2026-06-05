/*
 * bootloader_main.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef UNIFIED_STACK_DEMO_BOOTLOADER_MAIN_H_
#define UNIFIED_STACK_DEMO_BOOTLOADER_MAIN_H_


/*******************************************************************************
 * User Include
 ******************************************************************************/
#include "includes.h"
/*! 
 * @file: bootloader_main.h
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
 V1.0.0  Tomlin Tang  2019-03-25 11:50:56  First Creat
When you update, please do not forgot to del me and add your info at here.
</pre>
 */

/*!
 * @addtogroup bootloader_main
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
 
/*! @}*/
/*!
 * @name Initialize
 * Initial this module.
 *
 * To disable this module, you need call another function (see \ref Uninitialize "Disable Module")
 */
/*! @{*/

/*!
 * @brief To initial this module.
 *
 * This function returns the state of the initial.
 *
 * @param[in] instance instance number
 * @return the initial state.
 */
extern void BOOTLOADER_MAIN_Init(void (*pfBSP_Init)(void), void (*pfAbortTxMsg)(void));

/*Bootloader main demo*/
extern void BOOTLOADER_MAIN_Demo(void);


/*! @}*/

/*!
 * @anchor Uninitialize
 * @name Disable Module
 * TODO:Some description here.
 */
/*! @{*/

/*!
 * @brief uninitial this module.
 *
 * TODO:Some description here.
 *
 * @param[in] instance instance number
 */
void BOOTLOADER_MAIN_Deinit(void);

/*! @}*/

#if defined (__cplusplus)
}
#endif

/*! @}*/

#endif /* BOOTLOADER_MAIN_H */
/*******************************************************************************
 * EOF
 ******************************************************************************/
