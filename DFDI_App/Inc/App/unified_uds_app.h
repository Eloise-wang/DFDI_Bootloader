/*
 * uds_app.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef UNIFIED_UDS_APP_H_
#define UNIFIED_UDS_APP_H_
 
 #include "unifiedStack_uds_app_cfg.h"
 
 /*uds main function. ISO14229*/
 extern void UDS_MainFun(void);
 
 /*UDS init*/
 extern void UDS_Init(void);
 
 #endif /* UNIFIED_UDS_APP_H_ */
