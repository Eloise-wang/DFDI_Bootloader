/*
 * user_config.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_PUBLIC_INC_USER_CONFIG_H_
#define S32K142_CAN_PUBLIC_INC_USER_CONFIG_H_

/****************************核心定义 ***********************/
/*该宏定义 >=1*/
#define CORE_NO (1u)
#if (defined CORE_NO) && (CORE_NO < 1)
#undef CORE_NO
#define CORE_NO (1u)
#elif (!defined CORE_NO)
#define CORE_NO (1u)
#endif
/************************************************************/

/****************************断言与调试输入输出/定时器**********/
/*启用调试输入输出*/
#define EN_DEBUG_IO

/*启用调试计时器*/
//#define EN_DEBUG_TIMER

/*定义断言*/
#define EN_ASSERT

/*启用调试闪存模块*/
#define EN_DEBUG_FLS_MODULE
#define EN_UDS_DEBUG
#define EN_TP_DEBUG
#define EN_APP_DEBUG

/*是否使用循环冗余校验（CRC）*/
//#define DebugBootloader_NOTCRC

/*启用调试先进先出队列*/
#define EN_DEBUG_FIFO


#if (defined EN_DEBUG_FLS_MODULE) || (defined EN_UDS_DEBUG) || (defined EN_TP_DEBUG) || (defined EN_APP_DEBUG) || (defined EN_DEBUG_FIFO)
#ifndef EN_DEBUG_PRINT
/*启用打印功能*/
#define EN_DEBUG_PRINT
#endif
#else
/*是否启用打印功能*/
//#define EN_DEBUG_PRINT
#endif
/************************************************************/

/************************UDS算法访问配置***************/
/*通过软件启用算法访问权限*/
#define EN_ALG_SW

/*启用算法对硬件的访问权限*/
#define EN_ALG_HW

/*AES 种子长度*/
#define AES_SEED_LEN (16u)

/************************************************************/

/******************启用TP并定义消息ID****************/
/*仅可启用一个TP，若启用多个TP将触发错误！*/
#define EN_CAN_TP
//#define EN_LIN_TP
//#define EN_ETHERNET_TP
//#define EN_OTHERS_TP

#ifdef EN_CAN_TP
/*接收与发送消息ID、ID类型及ID掩码配置*/
#define	RX_FUN_ID		(0x7FFu)	/*CAN TP 接收功能标识符*/
#define	RX_PHY_ID		(0x784u)	/*CAN TP 接收物理层ID*/
#define	TX_ID			(0x7F0u)	/*CAN 发送ID*/
/*是否启用TX CAN FD。若启用CAN FD，CAN TP传输的SF报文长度将超过8字节*/
//#define EN_TX_CAN_FD
#endif	//end of EN_CAN_TP

#ifdef EN_LIN_TP
#define RX_BOARD_ID (0x7Fu) /*LIN TP 接收板标识——所有消息，响应异常，但已支持*/
#define	RX_FUN_ID (0x7Eu)   /*LIN 接收报文功能标识——无需响应/仅支持单帧报文*/
#define	RX_PHY_ID (0x55u)   /*LIN 收发器物理层标识*/
#define	TX_ID (0x35u)       /*LIN 发送端报文ID（主节点 NAD ID）*/
#endif
/***********************************************************/

/***********************CRC 配置****************************/
/*通过硬件启用CRC模块*/
//#define EN_CRC_HARDWARE

/*通过软件启用CRC模块*/
#define EN_CRC_SOFTWARE

/*闪存地址是否连续*/
#define FALSH_ADDRESS_CONTINUE (FALSE)
/***********************************************************/

/********************FIFO 定义*******************************/
/*来自总线FIFO ID的接收消息*/
#define RX_BUS_FIFO        ('r')  /*RX bus fifo*/

#ifdef EN_CAN_TP
#define RX_BUS_FIFO_LEN (300u)     /*RX BUS FIFO length*/
#elif (defined EN_LIN_TP)
#define RX_BUS_FIFO_LEN (50)      /*RX BUS FIFO length*/
#else
#define RX_BUS_FIFO_LEN (50u)     /*RX BUS FIFO length*/
#endif

#ifdef EN_CAN_TP
/* 发送到总线的 FIFO ID的TX 消息  */
#define TX_BUS_FIFO        ('t')  /*RX bus fifo*/
#define TX_BUS_FIFO_LEN (100u)     /*RX BUS FIFO length*/
#elif (defined EN_LIN_TP)
/* 发送到总线的 FIFO ID的TX 消息 */
#define TX_BUS_FIFO        ('t')  /*RX bus fifo*/
#define TX_BUS_FIFO_LEN (50u)     /*RX BUS FIFO length*/
#else

#endif
/***********************************************************/

/**********************FOTA A/B 配置************************/
//#define EN_SUPPORT_APP_B
typedef enum
{
	APP_A_TYPE = 0u,         /*APP A type*/

#ifdef EN_SUPPORT_APP_B
    APP_B_TYPE = 1u,         /*APP B type*/
#endif

	APP_INVLID_TYPE = 0xFFu, /*APP invalid type*/
}tAPPType;

#ifdef EN_SUPPORT_APP_B
/*启用，最新版本无效，跳转至旧版应用*/
#define EN_NEWEST_APP_INVALID_JUMP_OLD_APP
#endif
/***********************************************************/

/*******************全局中断定义************************/
/*禁用所有中断*/
#define DisableAllInterrupts() INT_SYS_DisableIRQGlobal()

/*启用所有中断*/
#define EnableAllInterrupts() INT_SYS_EnableIRQGlobal()
/***********************************************************/

/*******************用于闪存擦除一个扇区时间的MCU类型***********/
/*MCU type for erase flash time*/
#define MCU_S12Z (1)
#define MCU_S32K14x (2) /*S32K144/6/8*/
#define MCU_MPC577XX    (3)
#define MCU_S32K142_TYPE (4)

#define MCU_TYPE (MCU_S32K142_TYPE)
/***********************************************************/


/******未接收到UDS消息时跳转至应用程序的延迟时间*******/
//#define EN_DELAY_TIME
#define DELAY_MAX_TIME_MS (5000u)

/***********************************************************/















#endif /* S32K142_CAN_PUBLIC_INC_USER_CONFIG_H_ */
