/*
 * APP_Demo.c
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: DFDI_App
 *       Brief: 【 APP Demo层 - 适配AC7840 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 */

#include "APP_Demo.h"
#include "unifiedStack_uds_app.h"
#include "unifiedStack_TP.h"
#include "unifiedStack_TP_cfg.h"
#include "boot.h"
#include "bsp_timer.h"
#include "bsp_watchdog.h"
#include "bsp_can.h"
#include "includes.h"

/*******************************************************************************
 * User Include
 ******************************************************************************/

/*******************************************************************************
 * Variables
 ******************************************************************************/

/* LED toggle counter */
static uint16_t gs_u16LedCnt = 0u;

/* CAN TX message buffer */
static uint8_t gs_au8MsgBuf[64u];
static uint32_t gs_u32MsgId = 0u;
static uint32_t gs_u32MsgLength = 0u;

/* CAN callback handler */
static void APP_CAN_RxCallback(const bsp_can_msg_t *msg);

/* Send msg main function */
static void APP_SendMsgMainFun(void);

/* BSP initialization */
static void APP_BSP_Init(void);

/*FUNCTION**********************************************************************
 *
 * Function Name : APP_Demo_Init
 * Description   : APP Demo Init
 *END**************************************************************************/
void APP_Demo_Init(void)
{
    APP_BSP_Init();
    (void)BSP_WATCHDOG_Feed();

    UDS_Init();
    (void)BSP_WATCHDOG_Feed();
    TP_Init();
    (void)BSP_WATCHDOG_Feed();

    Boot_CheckDownlaodAPPStatus();
    (void)BSP_WATCHDOG_Feed();

    APP_DebugPrintf("\nWelcome enter AC7840 CAN(500K) APP demo!\n");
}

/*FUNCTION**********************************************************************
 *
 * Function Name : APP_Demo_MainFun
 * Description   : APP main function called by main
 *END**************************************************************************/
void APP_Demo_MainFun(void)
{
    /* Keep watchdog alive from the main loop even if the 100 ms timer tick is unavailable. */
    (void)BSP_WATCHDOG_Feed();

    if(TRUE == TIMER_HAL_Is1msTickTimeout())
    {
        TP_SystemTickCtl();
        UDS_SystemTickCtl();

        gs_u16LedCnt++;
    }

    /* Toggle LED every 250ms (250 * 1ms) */
    if(gs_u16LedCnt >= 250u)
    {
        /* Toggle LED indicator - GPIO toggle should be implemented in BSP */
        gs_u16LedCnt = 0u;
    }

    TP_MainFun();
    (void)BSP_WATCHDOG_Feed();

    UDS_MainFun();
    (void)BSP_WATCHDOG_Feed();

    if(TRUE == TIMER_HAL_Is100msTickTimeout())
    {
        (void)BSP_WATCHDOG_Feed();
    }

    APP_SendMsgMainFun();
    (void)BSP_WATCHDOG_Feed();
}

/*CAN receive callback handler*/
static void APP_CAN_RxCallback(const bsp_can_msg_t *msg)
{
    if((NULL_PTR != msg) && (msg->dlc <= 8u))
    {
        /* Write received CAN message to TP layer */
        (void)TP_DriverWriteDataInTP(msg->id, msg->dlc, msg->data);
    }
}

/*Send msg main function - read from TP and send via CAN*/
static void APP_SendMsgMainFun(void)
{
    /* Read message from TP layer */
    if(TRUE == TP_DriverReadDataFromTP(sizeof(gs_au8MsgBuf), &gs_au8MsgBuf[0u], &gs_u32MsgId, &gs_u32MsgLength))
    {
        /* Transmit via CAN */
        if(STATUS_SUCCESS != BSP_CAN_Transmit(gs_u32MsgId, (uint8_t)gs_u32MsgLength, gs_au8MsgBuf))
        {
            APP_DebugPrintf("\nCAN Transmit failed!\n");
        }
    }
}

static void APP_BSP_Init(void)
{
    /* Initialize BSP CAN peripheral */
    if(STATUS_SUCCESS != BSP_CAN_Init())
    {
        APP_DebugPrintf("\nBSP_CAN_Init failed!\n");
    }

    /* Install CAN RX callback */
    BSP_CAN_InstallRxCallback(APP_CAN_RxCallback);

    /* Initialize Timer for 1ms tick */
    TIMER_HAL_Init();

    /* Initialize Watchdog */
    (void)BSP_WATCHDOG_Init();
    (void)BSP_WATCHDOG_Feed();

    /* Debug print initialization - UART should be ready from system init */
    APP_DebugPrintf("\nAPP BSP Init completed.\n");
}

/******************************************************************************
 * EOF
 *****************************************************************************/
