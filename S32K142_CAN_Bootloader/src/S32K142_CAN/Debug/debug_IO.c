/*
 * debug_IO.c
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


#ifdef EN_DEBUG_IO
/*此处引入驱动所需的平台头文件*/


#define BLUE_PORT (PTD)
#define BLUE_PIN (0u)

#define RED_PORT (PTD)
#define RED_PIN (15u)

#define GREEN_PORT (PTD)
#define GREEN_PIN (16u)

/*****************************************/
#endif
#include "debug_IO.h"

/*******************************************************************************
 * Variables
 ******************************************************************************/

#ifdef EN_DEBUG_IO
/*FUNCTION**********************************************************************
 *
 * Function Name : DEBUG_IO_Init
 * Description   : 初始化该模块.
 *
 * Implements : DEBUG_IO_Init_Activity
 *END**************************************************************************/
void DEBUG_IO_Init(void)
{

}

/*FUNCTION**********************************************************************
 *
 * Function Name : DEBUG_IO_Deinit
 * Description   : 去初始化该模块.
 *
 * Implements : DEBUG_IO_Deinit_Activity
 *END**************************************************************************/
void DEBUG_IO_Deinit(void)
{

}

void DEBUG_IO_SetDebugIOLow(void)
{
	PINS_DRV_ClearPins(GREEN_PORT, (1 << GREEN_PIN));

}

void DEBUG_IO_SetDebugIOHigh(void)
{
	PINS_DRV_SetPins(GREEN_PORT, (1 << GREEN_PIN));
}

void DEBUG_IO_ToggleDebugIO(void)
{
	PINS_DRV_TogglePins(GREEN_PORT, (1 << GREEN_PIN));
}

#endif
/******************************************************************************
 * EOF
 *****************************************************************************/
