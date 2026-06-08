/*
 * debug_timer.c
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include "user_config.h"

#ifdef EN_DEBUG_TIMER

/*here include platform headers for driver*/
#include "sdk_project_config.h"
/*****************************************/
#include "debug_timer.h"

/*******************************************************************************
 * User Include
 ******************************************************************************/

/*******************************************************************************
 * Variables
 ******************************************************************************/


/*FUNCTION**********************************************************************
 *
 * Function Name : DEBUG_TIMER_Init
 * Description   : This function initial this module.
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
 * Description   : This function initial this module.
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
