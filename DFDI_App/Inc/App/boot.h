/*
 * boot.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef APP_BOOTLOADER_EXCHANGE_INFO_BOOT_BOOT_H_
#define APP_BOOTLOADER_EXCHANGE_INFO_BOOT_BOOT_H_

#include "boot_cfg.h"



/*******************************************************************************
 * Definitions
 ******************************************************************************/


/*******************************************************************************
 * API
 ******************************************************************************/

/*! @}*/

/*request bootloader mode check*/
extern boolean Boot_CheckDownlaodAPPStatus(void);




#endif /* BOOT_H */
/*******************************************************************************
 * EOF
 ******************************************************************************/
