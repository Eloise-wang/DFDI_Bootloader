/*
 * watchdog_hal.h
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef APP_BOOTLOADER_EXCHANGE_INFO_HAL_WATCHDOG_HAL_WATCHDOG_HAL_H_
#define APP_BOOTLOADER_EXCHANGE_INFO_HAL_WATCHDOG_HAL_WATCHDOG_HAL_H_

#include "includes.h"

/*******************************************************************************
 * User Include
 ******************************************************************************/

/*! 
 * @file: watchdog_hal.h
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
 V1.0.0  Tomlin Tang  2019-01-17 15:29:53  First Creat
When you update, please do not forgot to del me and add your info at here.
</pre>
 */

/*!
 * @addtogroup watchdog_hal
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
extern void WATCHDOG_HAL_Init(void);


extern void WATCHDOG_HAL_Fed(void);

extern void WATCHDOG_HAL_SystemRest(void);


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
extern void WATCHDOG_HAL_Deinit(void);

/*! @}*/

#if defined (__cplusplus)
}
#endif

/*! @}*/

#endif /* WATCHDOG_HAL_H */
/*******************************************************************************
 * EOF
 ******************************************************************************/
