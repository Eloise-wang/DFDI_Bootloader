/*
 * debug_IO.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_DEBUG_DEBUG_IO_H_
#define S32K142_CAN_DEBUG_DEBUG_IO_H_

#include "includes.h"




/*******************************************************************************
 * API
 ******************************************************************************/

#ifdef EN_DEBUG_IO

/*!
 * @brief To initial this module.
 *
 * This function returns the state of the initial.
 *
 * @return the initial state.
 */
extern void DEBUG_IO_Init(void);


/*!
 * @brief uninitial this module.
 *
 * TODO:Some description here.
 *

 */
extern void DEBUG_IO_Deinit(void);

extern void DEBUG_IO_SetDebugIOLow(void);
extern void DEBUG_IO_SetDebugIOHigh(void);
extern void DEBUG_IO_ToggleDebugIO(void);


#endif


#endif /* S32K142_CAN_DEBUG_DEBUG_IO_H_ */
