/*
 * boot.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_BOOT_BOOT_H_
#define S32K142_CAN_BOOT_BOOT_H_
#include "boot_cfg.h"

/*!
 * @brief To initial this module.
 *
 * This function returns the state of the initial.
 *
 * @param[in] instance instance number
 * @return the initial state.
 */
extern 	void Boot_JumpToAppOrNot(void);



/*请求检查引导加载程序模式*/
extern boolean Boot_CheckReqBootloaderMode(void);


/*! @}*/

#if defined (__cplusplus)
}
#endif

/*! @}*/

#endif /* BOOT_H */
/*******************************************************************************
 * EOF
 ******************************************************************************/
