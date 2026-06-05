/*
 * LIN_tp.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef UNIFIED_STACK_UDS_STACK_TP_LIN_TP_LIN_TP_H_
#define UNIFIED_STACK_UDS_STACK_TP_LIN_TP_LIN_TP_H_
#include "LIN_tp_cfg.h"

#ifdef EN_LIN_TP

#include "multi_cyc_fifo.h"

/*uds network man function*/
extern void LINTP_MainFun(void);

/*LIN tp system tick control*/
extern void LINTP_SytstemTickControl(void);


/*Init LIN TP list*/
extern void LINTP_Init(void);

#endif /*#ifdef EN_LIN_TP*/

#endif /*#ifndef __LIN_TP_H__*/

/***************************End file********************************/

