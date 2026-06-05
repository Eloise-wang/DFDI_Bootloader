/*
 * TP.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef UNIFIED_STACK_UDS_STACK_TP_TP_H_
#define UNIFIED_STACK_UDS_STACK_TP_TP_H_

#include "includes.h"
#include "TP_cfg.h"

#ifdef EN_CAN_TP
#include "can_tp.h"
#endif

#ifdef EN_LIN_TP
#include "LIN_TP.h"
#endif



/*******************************************************************************
 * API
 ******************************************************************************/
 
/*! @}*/
/*!
 * @name Initialize
 * Initial this module.
 *
 * To disable this module, you need call another function (see \ref Uninitialize "Disable Module")
 */
/*! @{*/

/*!
 * @brief 初始化该模块.
 *
 * This function returns the state of the initial.
 *
 * @return none.
 */
extern void TP_Init(void);

/*! @}*/
/*!
 * @name TP的主功能
 * 定期运行此函数.
 *
 */
/*! @{*/

/*!
 * @brief 定期执行TP相关函数。
 *
 */
extern void TP_MainFun(void);

/*TP系统时钟控制*/
extern void TP_SystemTickCtl(void);


/*从UDS向TP发送FIFO BUFF读取一帧传输协议数据。若无数据可读则返回假，反之则返回真*/
extern boolean TP_ReadAFrameDataFromTP(uint32 *o_pRxMsgID, 
									  uint32 *o_pxRxDataLen,
									  uint8 *o_pDataBuf);

/*写入从Tp到UDS接收FIFO BUFF的帧数据*/
extern boolean TP_WriteAFrameDataInTP(const uint32 i_TxMsgID,
									 const tpfUDSTxMsgCallBack i_pfUDSTxMsgCallBack,
									 const uint32 i_xTxDataLen,
									 const uint8 *i_pDataBuf);


/*! @}*/

/*!
 * @anchor 去初始化
 * @name Disable Module
 * TODO:Some description here.
 */
/*! @{*/

/*!
 * @brief uninitial this module.
 *
 * TODO:Some description here.

 */
extern void TP_Deinit(void);



#endif /* TP_H */
/*******************************************************************************
 * EOF
 ******************************************************************************/
