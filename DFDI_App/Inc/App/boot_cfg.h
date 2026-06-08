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

/*******************************************************************************
 * Definitions
 ******************************************************************************/

/*request enter bootloader?*/
extern void Boot_RequestEnterBootloader(void);

extern boolean Boot_IsDownloadAPPSccessful(void);

/*clear request enter bootloader flag*/
extern void ClearDownloadAPPSuccessfulFlag(void);

#if defined (__cplusplus)
extern "C" {
#endif

/*******************************************************************************
 * API
 ******************************************************************************/


#if defined (__cplusplus)
}
#endif

#endif /* BOOT_CFG_H */
/*******************************************************************************
 * EOF
 ******************************************************************************/
