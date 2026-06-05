/*
 * uds_app.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef UNIFIED_STACK_UDS_STACK_UDS_UDS_APP_H_
#define UNIFIED_STACK_UDS_STACK_UDS_UDS_APP_H_

#include "uds_app_cfg.h"

/*uds main function. ISO14229*/
extern void UDS_MainFun(void);

/*UDS init*/
extern void UDS_Init(void);

#endif /*__UDS_APP_H__*/

