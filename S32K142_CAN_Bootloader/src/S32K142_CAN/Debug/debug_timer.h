/*
 * debug_timer.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_DEBUG_DEBUG_TIMER_H_
#define S32K142_CAN_DEBUG_DEBUG_TIMER_H_
#include "includes.h"



/*******************************************************************************
 * API
 ******************************************************************************/
 #ifdef EN_DEBUG_TIMER


/*!
 * @brief To initial this module.
 *
 * This function returns the state of the initial.
 *
 * @param[in] instance instance number
 * @return the initial state.
 */
extern void DEBUG_TIMER_Init(void);



/*!
 * @brief To initial this module.
 *
 * 该函数返回定时器数值。
 *
  * @return timer value.
 */
extern 	uint32 DEBUG_TIMER_GetTimerValue(void);



/*!
 * @brief uninitial this module.
 *
 * TODO:Some description here.
 *
 * @param[in] instance instance number
 */
extern void DEBUG_TIMER_Deinit(void);



#endif /* DEBUG_TIMER_H */

