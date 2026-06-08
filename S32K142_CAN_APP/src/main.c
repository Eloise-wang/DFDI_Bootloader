/*!
** Copyright 2020 NXP
** @file main.c
** @brief
**         Main module.
**         This module contains user's application code.
*/
/*!
**  @addtogroup main_module main module documentation
**  @{
*/
/* MODULE main */


/* Including necessary configuration files. */
#include "sdk_project_config.h"
#include "device_registers.h"
#include "wdog_driver.h"

#include "includes.h"
#include "APP_Demo.h"

volatile int exit_code = 0;
/* User includes */

/*!
  \brief The main function for the project.
  \details The startup initialization sequence is the following:
 * - startup asm routine
 * - main()
*/
int main(void)
{
	*(volatile uint8 *)0x20002FF2u = 0xA1u;

	WDOG_DRV_Trigger(WDOG_CONFIG_1_INST);
	(void)WDOG_DRV_Deinit(WDOG_CONFIG_1_INST);

	*(volatile uint8 *)0x20002FF2u = 0xA2u;
	APP_Demo_Init();
	*(volatile uint8 *)0x20002FF2u = 0xA3u;

	for(;;)
	{
		APP_Demo_MainFun();
		if(exit_code != 0)
		{
			break;
		}
	}
	return exit_code;
}

/* END main */
/*!
** @}
*/

void HardFault_Handler(void)
{
	*(volatile uint8 *)0x20002FF2u = 0xE1u;
	while(1)
	{
	}
}
