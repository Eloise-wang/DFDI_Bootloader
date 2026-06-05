/*!
** Copyright 2020 NXP
** @file main.c
** @brief
**         Main module.
**         This module contains user's application code.
*/
/*!
**  @addtogroup main_module main module documentation
**  @{
*/
/* MODULE main */


/* Including necessary configuration files. */
#include "sdk_project_config.h"
#include "bootloader_main.h"
#include "flash.h"
#include  "TP_cfg.h"
#include "includes.h"
#include "status.h"
#include "watchdog_hal.h"

volatile int exit_code = 0;

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

#define RX_MAILBOX	(0UL)
#define RX_MSG_ID	(RX_PHY_ID)


/*BSP init*/
static void BSP_Init(void)
{
	status_t  can_status;
#if 0
    can_buff_config_t buffCfg =  {
        .enableFD = false,
        .enableBRS = true,
        .fdPadding = 0U,
        .idType = CAN_MSG_ID_STD,
        .isRemote = false
    };
#endif
	/*clock init*/
	CLOCK_SYS_Init(g_clockManConfigsArr, CLOCK_MANAGER_CONFIG_CNT, g_clockManCallbacksArr, CLOCK_MANAGER_CALLBACK_CNT);
	CLOCK_SYS_UpdateConfiguration(0U, CLOCK_MANAGER_POLICY_FORCIBLE);//CLOCK_MANAGER_POLICY_AGREEMENT CLOCK_MANAGER_POLICY_FORCIBLE

	PINS_DRV_Init(NUM_OF_CONFIGURED_PINS0, g_pin_mux_InitConfigArr0);

	POWER_SYS_Init(&powerConfigsArr, POWER_MANAGER_CONFIG_CNT, &powerStaticCallbacksConfigsArr, POWER_MANAGER_CALLBACK_CNT);
	
	can_status = CAN_Init(&can_pal1_instance, &can_pal1_Config0);
	if (can_status != STATUS_SUCCESS)
	{
	    // CAN初始化失败，就在这里死等，不往下走，也不打印
	    while(1)
	    {
	        WATCHDOG_HAL_Fed();
	    }
	}

	CAN_InstallEventCallback(&can_pal1_instance, &CAN_RXTXMsgHandle, NULL_PTR);

#if 0	
	CAN_ConfigRxBuff(&can_pal1_instance, RX_MAILBOX, &buffCfg, RX_MSG_ID);
	CAN_Receive(&can_pal1_instance, RX_MAILBOX, &gs_RXCANMsg);
#endif	
	/*Config CAN RX function ID message*/
	CAN_ConfigRxBuff(&can_pal1_instance, gs_CANRxFunIDMsgInfo.buffIdx, &gs_CANRxFunIDMsgInfo.config, gs_CANRxFunIDMsgInfo.acceptedId);
	CAN_Receive(&can_pal1_instance, gs_CANRxFunIDMsgInfo.buffIdx, &gs_RXCANMsg);

	/*Config CAN RX physical ID message*/
	CAN_ConfigRxBuff(&can_pal1_instance, gs_CANRxPhyIDMsgInfo.buffIdx, &gs_CANRxPhyIDMsgInfo.config, gs_CANRxPhyIDMsgInfo.acceptedId);
	CAN_Receive(&can_pal1_instance, gs_CANRxPhyIDMsgInfo.buffIdx, &gs_RXCANMsg);	

	CAN_ConfigTxBuff(&can_pal1_instance, gs_CANTxMsgInfo.buffIdx, &gs_CANTxMsgInfo.config);
	
	INT_SYS_EnableIRQ(CAN0_ORed_0_15_MB_IRQn);
	
	INT_SYS_EnableIRQGlobal();
	
	InitFlash();	
}

static void BSP_AbortCANTxMsg(void)
{
	
}

/*transmit message*/
static boolean TransmiteCANMsg(const uint32_t i_usCANMsgID,
                        const uint8_t i_ucDataLen,
                        const uint8_t *i_pucDataBuf, 
                        const uint32_t i_txBlockingMaxtime)
{
    // 已知参数未被使用，解决报警告的问题
    (void)i_txBlockingMaxtime;

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

/*CAN RX and TX message call back handle*/
static void CAN_RXTXMsgHandle(uint32_t instance,
                               can_event_t eventType,
                               uint32_t objIdx,
                               void *driverState)
{
    // 已知参数未被使用，为了解决报警告问题
    (void)instance;
    (void)objIdx;
    (void)driverState;

    switch(eventType)
    {
	    case CAN_EVENT_RX_COMPLETE:
	        TP_DriverWriteDataInTP(gs_RXCANMsg.id, gs_RXCANMsg.length, gs_RXCANMsg.data);

			//CAN_Receive(&can_pal1_instance, RX_MAILBOX, &gs_RXCANMsg);
#if 1
			CAN_Receive(&can_pal1_instance, gs_CANRxFunIDMsgInfo.buffIdx, &gs_RXCANMsg);
			CAN_Receive(&can_pal1_instance, gs_CANRxPhyIDMsgInfo.buffIdx, &gs_RXCANMsg);			
#endif			
	        break;

	    case CAN_EVENT_TX_COMPLETE:
	        TP_DoTxMsgSuccesfulCallback();
	        break;

	    default:
	        break;
    }

}

static void SendMsgMainFun(void)
{
	uint8 aucMsgBuf[8u];
	uint32 msgId = 0u;
	uint32 msgLength = 0u;
	
	/*get message from TP*/
	if(TRUE == TP_DriverReadDataFromTP(8u,&aucMsgBuf[0u],&msgId, &msgLength))
	{	
		TransmiteCANMsg(msgId, msgLength, aucMsgBuf, 0u);
	}
}


/*! 
  \brief The main function for the project.
  \details The startup initialization sequence is the following:
 * - startup asm routine
 * - main()
*/
int main(void)
{
  /* Write your local variable definition here */

  /*** Processor Expert internal initialization. DON'T REMOVE THIS CODE!!! ***/
  #ifdef PEX_RTOS_INIT
    PEX_RTOS_INIT();                   /* Initialization of the selected RTOS. Macro is defined by the RTOS component. */
  #endif
  /*** End of Processor Expert internal initialization.                    ***/

  /* Write your code here */
  /* For example: for(;;) { } */
  BOOTLOADER_MAIN_Init(&BSP_Init, &BSP_AbortCANTxMsg);

  APP_DebugPrintf("Welcome enter S32K142 CAN/CAN FD bootloader!\n","");

  for(;;)
  {
  	BOOTLOADER_MAIN_Demo();
#if 0
	while(CAN_GetTransferStatus(&can_pal1_instance, RX_MAILBOX) == STATUS_BUSY)
	{
		WATCHDOG_HAL_Fed();
	}

	APPDebugPrintf("RX CAN message!\n");

	CAN_Receive(&can_pal1_instance, RX_MAILBOX, &gs_RXCANMsg);
#endif

	SendMsgMainFun();
  }

  /*** Don't write any code pass this line, or it will be deleted during code generation. ***/
  /*** RTOS startup code. Macro PEX_RTOS_START is defined by the RTOS component. DON'T MODIFY THIS CODE!!! ***/
  #ifdef PEX_RTOS_START
    PEX_RTOS_START();                  /* Startup of the selected RTOS. Macro is defined by the RTOS component. */
  #endif
  /*** End of RTOS startup code.  ***/
  /*** Processor Expert end of main routine. DON'T MODIFY THIS CODE!!! ***/
  for(;;) {
    if(exit_code != 0) {
      break;
    }
  }
  return exit_code;

}

/* END main */
/*!
** @}
*/
