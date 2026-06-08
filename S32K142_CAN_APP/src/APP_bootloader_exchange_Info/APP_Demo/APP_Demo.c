/*
 * APP_Demo.c
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include "APP_Demo.h"
#include "sdk_project_config.h"
#include "UDS_app.h"
#include "TP.h"
#include "boot.h"
#include "timer_hal.h"
#include "watchdog_hal.h"
#include "bootloader_debug.h"
#include "uds_app_cfg.h"
#include "device_registers.h"


/*******************************************************************************
 * User Include
 ******************************************************************************/

/*******************************************************************************
 * Variables
 ******************************************************************************/
/* User includes (#include below this line is not maintained by Processor Expert) */
typedef struct
{
	uint32 buffIdx;
	can_buff_config_t config;
	uint32 acceptedId;
}tCANRxMsgInfo;

typedef struct
{
	uint32 buffIdx;
	can_buff_config_t config;
}tCANTxMsgInfo;

#define CAN_MSG_TYPE (FLEXCAN_MSG_ID_STD) //FLEXCAN_MSG_ID_EXT

static const tCANRxMsgInfo gs_CANRxFunIDMsgInfo = {
	0u,
	{
		.enableFD = true,
		.enableBRS = true,
		.fdPadding = 0U,
		.idType = CAN_MSG_TYPE,
		.isRemote = false
	},
	RX_FUN_ID
};

static const tCANRxMsgInfo gs_CANRxPhyIDMsgInfo = {
	1u,
	{
		.enableFD = true,
		.enableBRS = true,
		.fdPadding = 0U,
		.idType = CAN_MSG_TYPE,
		.isRemote = false
	},
	RX_PHY_ID
};

static const tCANTxMsgInfo gs_CANTxMsgInfo = {
	2u,
	{
		.enableFD = false,
		.enableBRS = false,
		.fdPadding = 0U,
		.idType = CAN_MSG_TYPE,
		.isRemote = false
	},
};

static can_message_t gs_RXCANMsg;

/*CAN RX and TX message call back handle*/
static void CAN_RXTXMsgHandle(uint32_t instance,
							 can_event_t eventType,
							 uint32_t objIdx,
							 void *driverState);

/*transmit message*/
static boolean TransmiteCANMsg(const uint32_t i_usCANMsgID,
                        const uint8_t i_ucDataLen,
                        const uint8_t *i_pucDataBuf, 
                        const uint32_t i_txBlockingMaxtime);

static void BSP_Init(void);

static void SendMsgMainFun(void);

/*FUNCTION**********************************************************************
 *
 * Function Name : APP_Demo_Init
 * Description   : APP Demo Init
 *END**************************************************************************/
void APP_Demo_Init(void)
{
	BSP_Init();

	UDS_Init();
	TP_Init();

	Boot_CheckDownlaodAPPStatus();

	APPDebugPrintf("Welcome enter S32K142 CAN/CAN FD(Nomial:500K, data:500K) APP demo!\n","");
}

/*FUNCTION**********************************************************************
 *
 * Function Name : APP_Demo_MainFun
 * Description   : APP main function called by main
 *END**************************************************************************/
void APP_Demo_MainFun(void)
{
	static uint16 ledCnt = 0u;

	WATCHDOG_HAL_Fed();
	
	if(TRUE == TIMER_HAL_Is1msTickTimeout())
	{
		TP_SystemTickCtl();

		UDS_SystemTickCtl();

		ledCnt++;
	}

	if(ledCnt >= 250u)
	{
		ToggleDebugIO();
		
		ledCnt = 0u;
	}

	TP_MainFun();

	UDS_MainFun();

	if(TRUE == TIMER_HAL_Is100msTickTimeout())
	{
		WATCHDOG_HAL_Fed();
	}

	SendMsgMainFun();
}

/*CAN RX and TX message call back handle*/
static void CAN_RXTXMsgHandle(uint32_t instance,
                             can_event_t eventType,
                             uint32_t objIdx,
                             void *driverState)
{
    (void)instance;  // 标记未使用
    (void)objIdx;    // 标记未使用
    (void)driverState;    // 标记未使用
  switch(eventType)
  {
	    case CAN_EVENT_RX_COMPLETE:
		TP_DriverWriteDataInTP(gs_RXCANMsg.id, gs_RXCANMsg.length, gs_RXCANMsg.data);

			CAN_Receive(&can_pal1_instance, gs_CANRxFunIDMsgInfo.buffIdx, &gs_RXCANMsg);
			CAN_Receive(&can_pal1_instance, gs_CANRxPhyIDMsgInfo.buffIdx, &gs_RXCANMsg);

			break;

	    case CAN_EVENT_TX_COMPLETE:
		TP_DoTxMsgSuccesfulCallback();
	        break;

	    default:
	        break;
  }

}

/*transmit message*/
static boolean TransmiteCANMsg(const uint32_t i_usCANMsgID,
                        const uint8_t i_ucDataLen,
                        const uint8_t *i_pucDataBuf, 
                        const uint32_t i_txBlockingMaxtime)
{
	(void)i_txBlockingMaxtime; //标记未使用
	status_t status;
	can_message_t canMessage;

	canMessage.cs = 0u;
	canMessage.id = i_usCANMsgID;
	canMessage.length = i_ucDataLen;

	fsl_memcpy(canMessage.data, i_pucDataBuf, i_ucDataLen);

	/*config tx message buff*/
	CAN_ConfigTxBuff(&can_pal1_instance, gs_CANTxMsgInfo.buffIdx, &gs_CANTxMsgInfo.config);
	
	status = CAN_Send(&can_pal1_instance, gs_CANTxMsgInfo.buffIdx, &canMessage);
	if(STATUS_SUCCESS != status)
	{
		return FALSE;
	}

	return TRUE;
}

/*Send msg main function*/
static void SendMsgMainFun(void)
{
	uint8 aucMsgBuf[64u];
	uint32 msgId = 0u;
	uint32 msgLength = 0u;
	
	/*get message from TP*/
	if(TRUE == TP_DriverReadDataFromTP(sizeof(aucMsgBuf),&aucMsgBuf[0u],&msgId, &msgLength))
	{	
		TransmiteCANMsg(msgId, msgLength, aucMsgBuf, 0u);		
	}
}

static void BSP_Init(void)
{
	CLOCK_SYS_Init(g_clockManConfigsArr, CLOCK_MANAGER_CONFIG_CNT, g_clockManCallbacksArr, CLOCK_MANAGER_CALLBACK_CNT);
	CLOCK_SYS_UpdateConfiguration(0U, CLOCK_MANAGER_POLICY_AGREEMENT);

	PINS_DRV_Init(NUM_OF_CONFIGURED_PINS0, g_pin_mux_InitConfigArr0);

	CAN_Init(&can_pal1_instance, &can_pal1_Config0);
	CAN_InstallEventCallback(&can_pal1_instance, &CAN_RXTXMsgHandle, NULL_PTR);

	/*Config CAN RX function ID message*/
	CAN_ConfigRxBuff(&can_pal1_instance, gs_CANRxFunIDMsgInfo.buffIdx, &gs_CANRxFunIDMsgInfo.config, gs_CANRxFunIDMsgInfo.acceptedId);
	CAN_Receive(&can_pal1_instance, gs_CANRxFunIDMsgInfo.buffIdx, &gs_RXCANMsg);

	/*Config CAN RX physical ID message*/
	CAN_ConfigRxBuff(&can_pal1_instance, gs_CANRxPhyIDMsgInfo.buffIdx, &gs_CANRxPhyIDMsgInfo.config, gs_CANRxPhyIDMsgInfo.acceptedId);
	CAN_Receive(&can_pal1_instance, gs_CANRxPhyIDMsgInfo.buffIdx, &gs_RXCANMsg);

	CAN_ConfigTxBuff(&can_pal1_instance, gs_CANTxMsgInfo.buffIdx, &gs_CANTxMsgInfo.config);

	INT_SYS_EnableIRQ(CAN0_ORed_0_15_MB_IRQn);

	INT_SYS_EnableIRQGlobal();

	WATCHDOG_HAL_Init();
	
	TIMER_HAL_Init();

	BOOTLOADER_DEBUG_Init();
}

/******************************************************************************
 * EOF
 *****************************************************************************/
