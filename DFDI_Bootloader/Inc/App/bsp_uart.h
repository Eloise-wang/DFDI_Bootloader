/*
 * bsp_uart.h
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 UART1 BSP接口 - PC8=RX, PC9=TX】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 *              4. 引脚配置：PC8=UART1_RX, PC9=UART1_TX
 */

#ifndef BSP_UART_H_
#define BSP_UART_H_

#ifdef __cplusplus
extern "C" {
#endif

/* ===========================================  Includes  =========================================== */
#include "stdint.h"
#include "stdbool.h"
#include "uart_drv.h"
#include "device_status.h"

/* ============================================  Defines  ============================================ */

/*!< UART实例号 */
#define BSP_UART_INSTANCE 1U

/*!< 默认波特率 */
#define BSP_UART_DEFAULT_BAUD_RATE 115200U

/*!< UART超时时间(ms) */
#define BSP_UART_TIMEOUT_MS 1000U

/* ============================================  类型定义  ============================================ */

/*!< UART配置结构 */
typedef struct
{
    uint32_t baudRate;                    /*!< 波特率 */
    uart_parity_mode_t parityMode;        /*!< 校验模式 */
    uart_stop_bit_count_t stopBitCount;   /*!< 停止位 */
    uart_bit_count_per_char_t bitCount;   /*!< 数据位 */
} bsp_uart_config_t;

/* ============================================  API  ============================================ */

/*!
 * @brief 初始化UART1
 *
 * @param[in] config UART配置（NULL使用默认配置）
 * @return TRUE-成功, FALSE-失败
 *
 * @note 默认配置：115200, 8N1, 中断模式
 */
extern bool BSP_UART_Init(const bsp_uart_config_t *config);

/*!
 * @brief 发送数据（阻塞）
 *
 * @param[in] pData 数据缓冲区
 * @param[in] length 数据长度
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_UART_Send(const uint8_t *pData, uint32_t length);

/*!
 * @brief 接收数据（阻塞）
 *
 * @param[out] pData 数据缓冲区
 * @param[in] length 期望接收长度
 * @param[in] timeoutMs 超时时间(ms)
 * @return TRUE-成功(接收完成), FALSE-失败(超时)
 */
extern bool BSP_UART_Receive(uint8_t *pData, uint32_t length, uint32_t timeoutMs);

/*!
 * @brief 发送一个字节（阻塞）
 *
 * @param[in] data 要发送的字节
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_UART_PutChar(uint8_t data);

/*!
 * @brief 接收一个字节（阻塞）
 *
 * @param[out] pData 接收到的字节
 * @param[in] timeoutMs 超时时间(ms)
 * @return TRUE-成功, FALSE-失败(超时)
 */
extern bool BSP_UART_GetChar(uint8_t *pData, uint32_t timeoutMs);

/*!
 * @brief 安装接收回调函数
 *
 * @param[in] callback 回调函数
 * @param[in] pUserData 用户数据
 * @return 之前的回调函数
 */
extern uart_callback_t BSP_UART_InstallRxCallback(uart_callback_t callback, void *pUserData);

/*!
 * @brief 安装发送回调函数
 *
 * @param[in] callback 回调函数
 * @param[in] pUserData 用户数据
 * @return 之前的回调函数
 */
extern uart_callback_t BSP_UART_InstallTxCallback(uart_callback_t callback, void *pUserData);

/*!
 * @brief 非阻塞发送
 *
 * @param[in] pData 数据缓冲区
 * @param[in] length 数据长度
 * @return TRUE-成功启动, FALSE-失败
 */
extern bool BSP_UART_SendAsync(const uint8_t *pData, uint32_t length);

/*!
 * @brief 非阻塞接收
 *
 * @param[out] pData 数据缓冲区
 * @param[in] length 期望接收长度
 * @return TRUE-成功启动, FALSE-失败
 */
extern bool BSP_UART_ReceiveAsync(uint8_t *pData, uint32_t length);

/*!
 * @brief 去初始化UART
 *
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_UART_Deinit(void);

/*!
 * @brief 设置波特率
 *
 * @param[in] baudRate 波特率
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_UART_SetBaudRate(uint32_t baudRate);

#ifdef __cplusplus
}
#endif

#endif /* BSP_UART_H_ */
