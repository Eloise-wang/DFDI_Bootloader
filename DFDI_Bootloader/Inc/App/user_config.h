/*
 * user_config.h
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 Bootloader 用户配置 】
 *       Note : 1. 适配芯片：AC78406
 */

#ifndef USER_CONFIG_H_
#define USER_CONFIG_H_

/* 核心定义 */
#ifndef CORE_NO
#define CORE_NO (1u)
#endif

/* 调试配置 */
#define EN_DEBUG_IO
/* #define EN_DEBUG_TIMER */
#define EN_ASSERT
#define EN_DEBUG_FLS_MODULE
#define EN_UDS_DEBUG
#define EN_TP_DEBUG
#define EN_APP_DEBUG
#define EN_DEBUG_FIFO

#if (defined EN_DEBUG_FLS_MODULE) || (defined EN_UDS_DEBUG) || (defined EN_TP_DEBUG) || (defined EN_APP_DEBUG) || (defined EN_DEBUG_FIFO)
#ifndef EN_DEBUG_PRINT
#define EN_DEBUG_PRINT
#endif
#endif

/* UDS 算法 */
#define EN_ALG_SW
#define EN_ALG_HW
#define AES_SEED_LEN (16u)

/* TP 配置 */
#define EN_CAN_TP
#ifdef EN_CAN_TP
#define RX_FUN_ID (0x7FFu)
#define RX_PHY_ID (0x784u)
#define TX_ID     (0x7F0u)
/* #define EN_TX_CAN_FD */
#endif

/* CRC 配置 */
#define EN_CRC_SOFTWARE
#define FALSH_ADDRESS_CONTINUE (FALSE)

/* FIFO 配置 */
#define RX_BUS_FIFO ('r')
#define RX_BUS_FIFO_LEN (300u)
#define TX_BUS_FIFO ('t')
#define TX_BUS_FIFO_LEN (100u)

/* FOTA A/B 配置 */
/* #define EN_SUPPORT_APP_B */
#ifndef APP_TYPE_ENUM_DEFINED
#define APP_TYPE_ENUM_DEFINED
typedef enum
{
    APP_A_TYPE = 0u,
#ifdef EN_SUPPORT_APP_B
    APP_B_TYPE = 1u,
#endif
    APP_INVLID_TYPE = 0xFFu,
} tAPPType;
#endif

#ifdef EN_SUPPORT_APP_B
#define EN_NEWEST_APP_INVALID_JUMP_OLD_APP
#endif

/* 全局中断 */
#define DisableAllInterrupts() __disable_irq()
#define EnableAllInterrupts()  __enable_irq()

/* MCU type */
#define MCU_S12Z (1)
#define MCU_S32K14x (2)
#define MCU_MPC577XX (3)
#define MCU_S32K142_TYPE (4)
#define MCU_TYPE (MCU_S32K142_TYPE)

/* 未接收到 UDS 消息时跳转 APP 的延迟时间 */
/* #define EN_DELAY_TIME */
#define DELAY_MAX_TIME_MS (5000u)

#endif /* USER_CONFIG_H_ */
