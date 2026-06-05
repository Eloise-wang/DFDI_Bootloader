/*
 * time_hal.h
 *
 *  Created on: 2026年4月14日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_HAL_TIMER_HAL_TIMER_HAL_H_
#define S32K142_CAN_HAL_TIMER_HAL_TIMER_HAL_H_

#include "includes.h"
/*！
 * @brief    初始化定时器模块
 * @return   返回初始状态
 */
extern void TIMER_HAL_Init(void);

/*！
 * @brief    初始化定时器是否超时模块
 * @return   返回（TRUE / FALSE）
 */
extern boolean TIMER_HAL_Is1msTickTimeout(void);


/* 调用1毫秒周期定时器 */
extern void TIMER_HAL_1msPeriod(void);

/*check 100ms timeout?*/
extern boolean TIMER_HAL_Is100msTickTimeout(void);

/*get timer tick cnt for random seed.*/
extern uint32 TIMER_HAL_GetTimerTickCnt(void);

/*！
 * @brief    去初始化定时器是否超时模块
 * @return
 */
extern void TIMER_HAL_Deinit(void);


#endif /* S32K142_CAN_HAL_TIMER_HAL_TIMER_HAL_H_ */
