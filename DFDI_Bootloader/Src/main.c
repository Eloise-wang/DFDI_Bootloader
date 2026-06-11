/*
 * main.c
 *
 *  Created on: 2026年6月8日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 AC7840 Bootloader 主程序入口 - 参考S32K142实现】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 *              4. CAN初始化封装为BSP_Init回调模式
 */

#include "includes.h"
#include "unifiedStack_bootloader_main.h"
#include "bsp_can.h"
#include "unifiedStack_TP.h"
#include "unifiedStack_TP_cfg.h"

/*******************************************************************************
 * Variables
 ******************************************************************************/

/* CAN TX message buffer */
static uint8_t gs_au8MsgBuf[8u];
static uint32_t gs_u32MsgId = 0u;
static uint32_t gs_u32MsgLength = 0u;

/*******************************************************************************
 * Function Prototypes
 ******************************************************************************/

/* BSP Initialization - clock, pins, CAN */
static void BSP_Init(void);

/* Abort TX message callback */
static void BSP_AbortCANTxMsg(void);

/* CAN RX callback */
static void BSP_CAN_RxCallback(const bsp_can_msg_t *msg);

/* Send msg main function */
static void BSP_SendMsgMainFun(void);

/*******************************************************************************
 * Function: BSP_Init
 * Description: 板级初始化 - 参考S32K142模式
 ******************************************************************************/
static void BSP_Init(void)
{
    if (STATUS_SUCCESS != BSP_CAN_ClockInit())
    {
        while(1)
        {
        }
    }

    /* Initialize BSP CAN peripheral */
    if(STATUS_SUCCESS != BSP_CAN_Init())
    {
        /* CAN初始化失败，死等不往下走 */
        while(1)
        {
            /* 可以在这里喂狗或进入错误处理 */
        }
    }

    /* Install CAN RX callback */
    BSP_CAN_InstallRxCallback(BSP_CAN_RxCallback);

    /* Debug print initialization - UART should be ready from system init */
    Debug_Printf("\nBSP Init completed.\n");
}

/*******************************************************************************
 * Function: BSP_AbortCANTxMsg
 * Description: 终止CAN发送
 ******************************************************************************/
static void BSP_AbortCANTxMsg(void)
{
    BSP_CAN_AbortTx();
}

/*******************************************************************************
 * Function: BSP_CAN_RxCallback
 * Description: CAN接收回调 - 将接收到的数据写入TP层
 ******************************************************************************/
static void BSP_CAN_RxCallback(const bsp_can_msg_t *msg)
{
    if((NULL != msg) && (msg->dlc <= 8u))
    {
        Debug_Printf("\n[UDS_INT] CAN->TP id=0x%03X len=%u data=%02X %02X %02X %02X %02X %02X %02X %02X\n",
                     (unsigned int)msg->id,
                     (unsigned int)msg->dlc,
                     msg->data[0],
                     msg->data[1],
                     msg->data[2],
                     msg->data[3],
                     msg->data[4],
                     msg->data[5],
                     msg->data[6],
                     msg->data[7]);
        (void)TP_DriverWriteDataInTP(msg->id, msg->dlc, msg->data);
    }
}

/*******************************************************************************
 * Function: BSP_SendMsgMainFun
 * Description: 从TP层读取数据并通过CAN发送
 ******************************************************************************/
static void BSP_SendMsgMainFun(void)
{
    if(TRUE == TP_DriverReadDataFromTP(sizeof(gs_au8MsgBuf), &gs_au8MsgBuf[0u], &gs_u32MsgId, &gs_u32MsgLength))
    {
        Debug_Printf("\n[UDS_INT] TP->CAN id=0x%03X len=%u data=%02X %02X %02X %02X %02X %02X %02X %02X\n",
                     (unsigned int)gs_u32MsgId,
                     (unsigned int)gs_u32MsgLength,
                     gs_au8MsgBuf[0],
                     gs_au8MsgBuf[1],
                     gs_au8MsgBuf[2],
                     gs_au8MsgBuf[3],
                     gs_au8MsgBuf[4],
                     gs_au8MsgBuf[5],
                     gs_au8MsgBuf[6],
                     gs_au8MsgBuf[7]);

        if(STATUS_SUCCESS == BSP_CAN_TransmitBlocking(gs_u32MsgId, (uint8_t)gs_u32MsgLength, gs_au8MsgBuf, 20U))
        {
            TP_DoTxMsgSuccesfulCallback();
        }
        else
        {
            Debug_Printf("\nCAN Transmit failed!\n");
        }
    }
}

/*******************************************************************************
 * Function: main
 * Description: Bootloader主入口
 ******************************************************************************/
int main(void)
{
    /* 调用Bootloader初始化 - 传入BSP_Init和AbortTxMsg回调 */
    BOOTLOADER_MAIN_Init(BSP_Init, BSP_AbortCANTxMsg);
	Debug_Printf("\nWelcome enter AC7840 CAN(500K) bootloader!\n");
    

    /* 主循环 */
    for(;;)
    {
        /* Dispatch CAN RX FIFO to TP in task context. */
        BSP_CAN_RxTask();

        /* Bootloader主处理函数 */
        BOOTLOADER_MAIN_Demo();

        /* 从TP层读取并发送CAN消息 */
        BSP_SendMsgMainFun();

        /* 防止编译器将for(;;)误判为可退出路径而报warning #111 */
        __nop();
    }
}

/*******************************************************************************
 * EOF
 ******************************************************************************/
