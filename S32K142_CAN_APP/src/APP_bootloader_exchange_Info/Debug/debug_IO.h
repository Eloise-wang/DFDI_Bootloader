/*
 * debug_IO.h
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef APP_BOOTLOADER_EXCHANGE_INFO_DEBUG_DEBUG_IO_H_
#define APP_BOOTLOADER_EXCHANGE_INFO_DEBUG_DEBUG_IO_H_
#include "includes.h"


/*******************************************************************************
 * API
 ******************************************************************************/

#ifdef EN_DEBUG_IO
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
 * @return the initial state.
 */
extern void DEBUG_IO_Init(void);

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

 */
extern void DEBUG_IO_Deinit(void);

extern void DEBUG_IO_SetDebugIOLow(void);
extern void DEBUG_IO_SetDebugIOHigh(void);
extern void DEBUG_IO_ToggleDebugIO(void);


#endif


#endif /* DEBUG_IO_H */
/*******************************************************************************
 * EOF
 ******************************************************************************/
