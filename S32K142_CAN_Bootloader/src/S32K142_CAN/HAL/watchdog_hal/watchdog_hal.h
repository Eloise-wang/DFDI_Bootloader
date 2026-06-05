/*
 * watchdog_hal.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_HAL_WATCHDOG_HAL_WATCHDOG_HAL_H_
#define S32K142_CAN_HAL_WATCHDOG_HAL_WATCHDOG_HAL_H_
#include "includes.h"


/*******************************************************************************
 * API
 ******************************************************************************/

/*!
 * @brief 初始化该模块.
 *
 * 该函数返回初始状态。
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
