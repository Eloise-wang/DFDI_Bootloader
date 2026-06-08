/*
 * TP.h
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef APP_BOOTLOADER_EXCHANGE_INFO_UDS_STACK_TP_TP_H_
#define APP_BOOTLOADER_EXCHANGE_INFO_UDS_STACK_TP_TP_H_
/*******************************************************************************
 * User Include
 ******************************************************************************/
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
 * @brief To initial this module.
 *
 * This function returns the state of the initial.
 *
 * @return none.
 */
extern void TP_Init(void);

/*! @}*/
/*!
 * @name main function for TP
 * peroid run  this function.
 *
 */
/*! @{*/

/*!
 * @brief To peroid run the function for TP.
 *
 */
extern void TP_MainFun(void);

/*TP system tick control*/
extern void TP_SystemTickCtl(void);


/*read a frame  tp data  from UDS to Tp TxFIFO. If no data can read return FALSE, else return TRUE*/
extern boolean TP_ReadAFrameDataFromTP(uint32 *o_pRxMsgID,
									  uint32 *o_pxRxDataLen,
									  uint8 *o_pDataBuf);

/*write a frame data from  Tp to UDS RxFIFO*/
extern boolean TP_WriteAFrameDataInTP(const uint32 i_TxMsgID,
									 const tpfUDSTxMsgCallBack i_pfUDSTxMsgCallBack,
									 const uint32 i_xTxDataLen,
									 const uint8 *i_pDataBuf);


/*! @}*/

/*!
 * @anchor Uninitialize
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


#endif /* APP_BOOTLOADER_EXCHANGE_INFO_UDS_STACK_TP_TP_H_ */
