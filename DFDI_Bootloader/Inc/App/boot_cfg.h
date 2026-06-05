/*
 * boot_cfg.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef BOOT_CFG_H_
#define BOOT_CFG_H_

#include "includes.h"

#if defined (__cplusplus)
extern "C" {
#endif

/*set download app successful */
extern void Boot_SetDownloadAppSuccessful(void);

/*Is request enter bootloader?*/
extern boolean Boot_IsRequestEnterBootloader(void);

/*clear request enter bootloader flag*/
extern void Boot_ClearRequestEnterBootloaderFlag(void);

/*Jump to APP.*/
extern void Boot_JumpToApp(const uint32 i_AppAddr);

/*remap multi-core application*/
extern void Boot_RemapApplication(void);

/*when power on, clear all flag in RAM for ECC.*/
extern void Boot_PowerONClearAllFlag(void);

/*Is power on trigger reset?*/
extern boolean Boot_IsPowerOnTriggerReset(void);

#if defined (__cplusplus)
}
#endif

#endif /* BOOT_CFG_H_ */
