/*
 * TP_cfg.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */
#include "unifiedStack_TP_cfg.h"

#ifdef EN_CAN_TP
#include "unifiedStack_can_tp_cfg.h"
#endif

 /*
 Note: 这些宏为全局属性，因其供传输协议层与统一数据服务层使用。
 */
 
 
 /*
     description: 该枚举未初始化全部成员。原因在于，不同项目的最大终端编号（MAX_TP_NO）可能存在差异。
 该枚举为全局枚举，其数值也是全局通用值。.
 */
 
 static tpfUDSTxMsgCallBack gs_pfUDSTxMsgCallBack = NULL_PTR; /*Tx message call back*/
 
 
/*Get TP config TX message ID*/
uint32 TP_GetConfigTxMsgID(void)
{
    uint32 txMsgID = 0u;
    
#ifdef EN_CAN_TP
    txMsgID = CANTP_GetConfigTxMsgID();
#endif


    return txMsgID;
}
 
/*Get TP config recieve Funcation ID*/
uint32 TP_GetConfigRxMsgFUNID(void)
{
    uint32 rxMsgFUNID = 0u;
    
#ifdef EN_CAN_TP
    rxMsgFUNID = CANTP_GetConfigRxMsgFUNID();
#endif

    return rxMsgFUNID;	
}
 
/*Get TP config receive pyhiscal ID*/
uint32 TP_GetConfigRxMsgPHYID(void)
{
    uint32 rxMsgPHYID = 0u;
    
#ifdef EN_CAN_TP
    rxMsgPHYID = CANTP_GetConfigRxMsgPHYID();
#endif

    return rxMsgPHYID;	
}

 
 /*register transmit a frame message call back*/
 void TP_RegisterTransmittedAFrmaeMsgCallBack(const tpfUDSTxMsgCallBack i_pfTxMsgCallBack)
 {
     gs_pfUDSTxMsgCallBack = (tpfUDSTxMsgCallBack)i_pfTxMsgCallBack;
 }
 
 /*do transmited a frame message call back*/
 void TP_DoTransmittedAFrameMsgCallBack(const uint8 i_result)
 {
     if(NULL_PTR != gs_pfUDSTxMsgCallBack)
     {
         (gs_pfUDSTxMsgCallBack)(i_result);
         gs_pfUDSTxMsgCallBack = NULL_PTR;
     }
 }
 
/*Driver write data in TP for read message from BUS*/
boolean TP_DriverWriteDataInTP(const uint32 i_RxID, const uint32 i_RxDataLen, const uint8 *i_pRxDataBuf)
{
    boolean result = FALSE;

    ASSERT(NULL_PTR == i_pRxDataBuf);
    ASSERT(0u == i_RxDataLen);
    
#ifdef EN_CAN_TP
    result = CANTP_DriverWriteDataInCANTP(i_RxID, i_RxDataLen, i_pRxDataBuf);
#endif

    return result;
}
 
/*Driver read data from TP for Tx message to BUS*/
boolean TP_DriverReadDataFromTP(const uint32 i_readDataLen, uint8 * o_pReadDatabuf, uint32 *o_pTxMsgID, uint32 *o_pTxMsgLength)
{
    boolean result = FALSE;
    tTPTxMsgHeader TPTxMsgHeader;

    
    ASSERT(0u == i_readDataLen);
    ASSERT(NULL_PTR == o_pReadDatabuf);
    ASSERT(NULL_PTR == o_pTxMsgID);
    ASSERT(NULL_PTR == o_pTxMsgLength);
    
    
#ifdef EN_CAN_TP
    result = CANTP_DriverReadDataFromCANTP(i_readDataLen, o_pReadDatabuf, &TPTxMsgHeader);
#endif

    if(TRUE == result)
    {
        *o_pTxMsgID = TPTxMsgHeader.TxMsgID;
        *o_pTxMsgLength = TPTxMsgHeader.TxMsgLength;
    }

    return result;
}
 
/*register abort tx message*/
void TP_RegisterAbortTxMsg(void (*i_pfAbortTxMsg)(void))
{
#ifdef EN_CAN_TP
    CANTP_RegisterAbortTxMsg((tpfAbortTxMsg)i_pfAbortTxMsg);
#endif
}

/*do TP tx message successful callback*/
void TP_DoTxMsgSuccesfulCallback(void)
{
#ifdef EN_CAN_TP
    CANTP_DoTxMsgSuccessfulCallBack();
#endif

}
