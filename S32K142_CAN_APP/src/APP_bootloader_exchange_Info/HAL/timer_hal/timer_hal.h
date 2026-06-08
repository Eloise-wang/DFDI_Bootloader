/*
 * timer_hal.h
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef APP_BOOTLOADER_EXCHANGE_INFO_HAL_TIMER_HAL_TIMER_HAL_H_
#define APP_BOOTLOADER_EXCHANGE_INFO_HAL_TIMER_HAL_TIMER_HAL_H_
#include "includes.h"
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
extern void TIMER_HAL_Init(void);

/*! @}*/
/*!
 * @name Initialize
 * check timer is timeout?
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
 * @return the timout or not(TRUE/FALSE).
 */
extern boolean TIMER_HAL_Is1msTickTimeout(void);

/*Timer 1ms period called*/
extern void TIMER_HAL_1msPeriod(void);

/*check 100ms timeout?*/
extern boolean TIMER_HAL_Is100msTickTimeout(void);

/*get timer tick cnt for random seed.*/
extern uint32 TIMER_HAL_GetTimerTickCnt(void);


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
extern void TIMER_HAL_Deinit(void);

/*! @}*/

#if defined (__cplusplus)
}
#endif

/*! @}*/

#endif /* TIMER_HAL_H */

