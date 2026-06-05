/*
 * watchdog_hal.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include "watchdog_hal.h"



/*******************************************************************************
 * 变量
 ******************************************************************************/


/*FUNCTION**********************************************************************
 *
 * Function Name : WATCHDOG_HAL_Init
 * Description   : 该模块用于初始化
 *
 * Implements : WATCHDOG_HAL_Init_Activity
 *END**************************************************************************/
void WATCHDOG_HAL_Init(void)
{
	WDOG_DRV_Init(WDOG_CONFIG_1_INST, &WDOG_Cfg0);
}

/*FUNCTION**********************************************************************
 *
 * Function Name : WATCHDOG_HAL_Init
 * Description   : 该函数由看门狗程序提供输入。
 *
 * Implements : WATCHDOG_HAL_Init_Activity
 *END**************************************************************************/
void WATCHDOG_HAL_Fed(void)
{
   WDOG_DRV_Trigger(WDOG_CONFIG_1_INST);
}


/*FUNCTION**********************************************************************
 *
 * Function Name : WATCHDOG_HAL_Init
 * Description   : 该函数用于触发系统复位。
 *
 * Implements : WATCHDOG_HAL_Init_Activity
 *END**************************************************************************/

void WATCHDOG_HAL_SystemRest(void)
{
	WDOG_DRV_SetTimeout(WDOG_CONFIG_1_INST, 0u);
}


/*FUNCTION**********************************************************************
 *
 * Function Name : WATCHDOG_HAL_Deinit
 * Description   : 去初始化
 *
 * Implements : WATCHDOG_HAL_Deinit_Activity
 *END**************************************************************************/
void WATCHDOG_HAL_Deinit(void)
{


}
/******************************************************************************
 * EOF
 *****************************************************************************/
