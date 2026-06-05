/*
 * debug_time.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include "user_config.h"

#ifdef EN_DEBUG_TIMER

/*此处引入驱动所需的平台头文件*/
#include "sdk_project_config.h"
/*****************************************/
#include "debug_timer.h"



/*******************************************************************************
 * Variables
 ******************************************************************************/


/*FUNCTION**********************************************************************
 *
 * Function Name : DEBUG_TIMER_Init
 * Description   : 初始化该模块.
 *
 * Implements : DEBUG_TIMER_Init_Activity
 *END**************************************************************************/
void DEBUG_TIMER_Init(void)
{
}


uint32 DEBUG_TIMER_GetTimerValue(void)
{
	uint32 timerValue = 0u;

	return timerValue;
}

/*FUNCTION**********************************************************************
 *
 * Function Name : DEBUG_TIMER_Deinit
 * Description   : 去初始化该模块
 *
 * Implements : DEBUG_TIMER_Deinit_Activity
 *END**************************************************************************/
void DEBUG_TIMER_Deinit(void)
{

}

#endif

/******************************************************************************
 * EOF
 *****************************************************************************/
