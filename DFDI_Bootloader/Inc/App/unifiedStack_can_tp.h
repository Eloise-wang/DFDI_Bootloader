/*
 * can_tp.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef UNIFIEDSTACK_CAN_TP_H_
#define UNIFIEDSTACK_CAN_TP_H_
 
 #include "unifiedStack_can_tp_cfg.h"
 
 #ifdef EN_CAN_TP
 
 #include "unifiedStack_multi_cyc_fifo.h"
 
 /*uds network man function*/
 extern void CANTP_MainFun(void);
 
 /*can tp system tick control*/
 extern void CANTP_SytstemTickControl(void);
 
 /*Init CAN TP list*/
 extern void CANTP_Init(void);
 
 #endif /* EN_CAN_TP */
 
 #endif /* UNIFIEDSTACK_CAN_TP_H_ */
 
 /***************************End file********************************/
