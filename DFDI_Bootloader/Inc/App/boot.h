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

#ifndef BOOT_H_
#define BOOT_H_

#include "boot_cfg.h"

#if defined (__cplusplus)
extern "C" {
#endif

extern void Boot_JumpToAppOrNot(void);

/*请求检查引导加载程序模式*/
extern boolean Boot_CheckReqBootloaderMode(void);

#if defined (__cplusplus)
}
#endif

#endif /* BOOT_H_ */
