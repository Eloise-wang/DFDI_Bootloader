/*
 * can_tp.h
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef APP_BOOTLOADER_EXCHANGE_INFO_UDS_STACK_TP_CAN_TP_CAN_TP_H_
#define APP_BOOTLOADER_EXCHANGE_INFO_UDS_STACK_TP_CAN_TP_CAN_TP_H_

#include "can_tp_cfg.h"

#ifdef EN_CAN_TP

#include "multi_cyc_fifo.h"

/*uds network man function*/
extern void CANTP_MainFun(void);

/*can tp system tick control*/
extern void CANTP_SytstemTickControl(void);

/*Init CAN TP list*/
extern void CANTP_Init(void);

#endif /*#ifdef EN_CAN_TP*/

#endif /*#ifndef __CAN_TP_H__*/

/***************************End file********************************/

