/*
 * debug_timer.h
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef APP_BOOTLOADER_EXCHANGE_INFO_DEBUG_DEBUG_TIMER_H_
#define APP_BOOTLOADER_EXCHANGE_INFO_DEBUG_DEBUG_TIMER_H_
#include "includes.h"


/*******************************************************************************
 * API
 ******************************************************************************/
 #ifdef EN_DEBUG_TIMER
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
extern void DEBUG_TIMER_Init(void);

/*! @}*/
/*!
 * @name Get timer value
 * get hardware timer value.
 *
 * To disable this module, you need call another function (see \ref Uninitialize "Disable Module")
 */
/*! @{*/

/*!
 * @brief To initial this module.
 *
 * This function returns the timer value.
 *
  * @return timer value.
 */
extern 	uint32 DEBUG_TIMER_GetTimerValue(void);

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
extern void DEBUG_TIMER_Deinit(void);

/*! @}*/


#endif /*#ifdef EN_DEBUG_TIMER*/ 



#endif /* DEBUG_TIMER_H */
/*******************************************************************************
 * EOF
 ******************************************************************************/
