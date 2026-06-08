/*
 * debug_IO.c
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

/*******************************************************************************
 * User Include
 ******************************************************************************/
#ifdef EN_DEBUG_IO
/*here include platform headers for driver*/

/*****************************************/
#endif
#include "debug_IO.h"

/*******************************************************************************
 * Variables
 ******************************************************************************/

#ifdef EN_DEBUG_IO

#define APP_LED_PORT (PTD)
#define APP_LED_PIN (15u)

/*FUNCTION**********************************************************************
 *
 * Function Name : DEBUG_IO_Init
 * Description   : This function initial this module.
 *
 * Implements : DEBUG_IO_Init_Activity
 *END**************************************************************************/
void DEBUG_IO_Init(void)
{

}

/*FUNCTION**********************************************************************
 *
 * Function Name : DEBUG_IO_Deinit
 * Description   : This function initial this module.
 *
 * Implements : DEBUG_IO_Deinit_Activity
 *END**************************************************************************/
void DEBUG_IO_Deinit(void)
{

}

void DEBUG_IO_SetDebugIOLow(void)
{
	PINS_DRV_ClearPins(APP_LED_PORT, (1 << APP_LED_PIN));

}

void DEBUG_IO_SetDebugIOHigh(void)
{
	PINS_DRV_SetPins(APP_LED_PORT, (1 << APP_LED_PIN));
}

void DEBUG_IO_ToggleDebugIO(void)
{
	PINS_DRV_TogglePins(APP_LED_PORT, (1 << APP_LED_PIN));
}

#endif
/******************************************************************************
 * EOF
 *****************************************************************************/
