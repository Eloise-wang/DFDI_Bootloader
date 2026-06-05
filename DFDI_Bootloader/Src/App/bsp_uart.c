/*
 * bsp_uart.c
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 UART1 BSP实现 - PC8=RX, PC9=TX】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 *              4. 引脚配置：PC8=UART1_RX, PC9=UART1_TX
 */

#include "bsp_uart.h"
#include "uart_drv.h"
#include "uart_hw.h"
#include "gpio_drv.h"
#include "gpio_hw.h"
#include "ac7840x.h"
#include "ckgen_drv.h"
#include "device_status.h"

/* ============================================  宏定义  ============================================ */

/*!< UART1 TX pin (PC9) */
#define BSP_UART_TX_PORT GPIOC
#define BSP_UART_TX_PIN  9U

/*!< UART1 RX pin (PC8) */
#define BSP_UART_RX_PORT GPIOC
#define BSP_UART_RX_PIN  8U

/* ============================================  变量  ============================================ */

/*!< UART驱动状态结构 */
static uart_state_t g_uartState;

/*!< UART初始化标志 */
static bool g_bUartInit = false;

/* ============================================  内部函数  ============================================ */

/*!
 * @brief 配置UART1引脚
 *
 * PC8 -> UART1_RX
 * PC9 -> UART1_TX
 *
 * @return none
 */
static void BSP_UART_InitPins(void)
{
    /* 配置TX引脚 - PC9 */
    /* 设置为复用功能模式 (UART1_TX) */
    GPIO_DRV_SetMuxModeSel(PORTC, BSP_UART_TX_PIN, PORT_MUX_ALT2);
    
    /* 配置RX引脚 - PC8 */
    /* 设置为复用功能模式 (UART1_RX) */
    GPIO_DRV_SetMuxModeSel(PORTC, BSP_UART_RX_PIN, PORT_MUX_ALT2);
}

/*!
 * @brief 使能UART1外设时钟
 *
 * @return none
 */
static void BSP_UART_EnableClock(void)
{
    /* 使能GPIO时钟 */
    CKGEN_DRV_Enable(CLK_GPIO, true);
    
    /* 使能UART1时钟 */
    CKGEN_DRV_Enable(CLK_UART1, true);
}

/*!
 * @brief 获取默认UART配置
 *
 * @param[out] config 配置结构指针
 * @return none
 */
static void BSP_UART_GetDefaultConfig(bsp_uart_config_t *config)
{
    if (0 != config)
    {
        config->baudRate = BSP_UART_DEFAULT_BAUD_RATE;
        config->parityMode = UART_PARITY_DISABLED;
        config->stopBitCount = UART_ONE_STOP_BIT;
        config->bitCount = UART_8_BITS_PER_CHAR;
    }
}

/* ============================================  API实现  ============================================ */

bool BSP_UART_Init(const bsp_uart_config_t *config)
{
    status_t status;
    uart_user_config_t uartConfig;
    bsp_uart_config_t defaultConfig;
    
    if (g_bUartInit)
    {
        return true;
    }
    
    /* 获取配置 */
    if (0 == config)
    {
        BSP_UART_GetDefaultConfig(&defaultConfig);
        config = &defaultConfig;
    }
    
    /* 使能时钟 */
    BSP_UART_EnableClock();
    
    /* 配置引脚 */
    BSP_UART_InitPins();
    
    /* 填充UART配置 */
    uartConfig.baudRate = config->baudRate;
    uartConfig.parityMode = config->parityMode;
    uartConfig.stopBitCount = config->stopBitCount;
    uartConfig.bitCountPerChar = config->bitCount;
    uartConfig.transferType = UART_USING_INTERRUPTS;  /* 中断模式 */
    uartConfig.rxDMAChannel = 0xFFU;
    uartConfig.txDMAChannel = 0xFFU;
    uartConfig.rxCallback = 0;
    uartConfig.rxCallbackParam = 0;
    uartConfig.txCallback = 0;
    uartConfig.txCallbackParam = 0;
    
    /* 初始化UART */
    status = UART_DRV_Init(BSP_UART_INSTANCE, &g_uartState, &uartConfig);
    if (STATUS_SUCCESS == status)
    {
        g_bUartInit = true;
        return true;
    }
    
    return false;
}

bool BSP_UART_Send(const uint8_t *pData, uint32_t length)
{
    status_t status;
    
    if ((0 == pData) || (0 == length))
    {
        return false;
    }
    
    if (!g_bUartInit)
    {
        return false;
    }
    
    status = UART_DRV_SendDataBlocking(BSP_UART_INSTANCE, pData, length, BSP_UART_TIMEOUT_MS);
    
    return (STATUS_SUCCESS == status) ? true : false;
}

bool BSP_UART_Receive(uint8_t *pData, uint32_t length, uint32_t timeoutMs)
{
    status_t status;
    
    if ((0 == pData) || (0 == length))
    {
        return false;
    }
    
    if (!g_bUartInit)
    {
        return false;
    }
    
    if (0 == timeoutMs)
    {
        timeoutMs = BSP_UART_TIMEOUT_MS;
    }
    
    status = UART_DRV_ReceiveDataBlocking(BSP_UART_INSTANCE, pData, length, timeoutMs);
    
    return (STATUS_SUCCESS == status) ? true : false;
}

bool BSP_UART_PutChar(uint8_t data)
{
    return BSP_UART_Send(&data, 1U);
}

bool BSP_UART_GetChar(uint8_t *pData, uint32_t timeoutMs)
{
    return BSP_UART_Receive(pData, 1U, timeoutMs);
}

uart_callback_t BSP_UART_InstallRxCallback(uart_callback_t callback, void *pUserData)
{
    if (!g_bUartInit)
    {
        return 0;
    }
    
    return UART_DRV_InstallRxCallback(BSP_UART_INSTANCE, callback, pUserData);
}

uart_callback_t BSP_UART_InstallTxCallback(uart_callback_t callback, void *pUserData)
{
    if (!g_bUartInit)
    {
        return 0;
    }
    
    return UART_DRV_InstallTxCallback(BSP_UART_INSTANCE, callback, pUserData);
}

bool BSP_UART_SendAsync(const uint8_t *pData, uint32_t length)
{
    status_t status;
    
    if ((0 == pData) || (0 == length))
    {
        return false;
    }
    
    if (!g_bUartInit)
    {
        return false;
    }
    
    status = UART_DRV_SendData(BSP_UART_INSTANCE, pData, length);
    
    return (STATUS_SUCCESS == status) ? true : false;
}

bool BSP_UART_ReceiveAsync(uint8_t *pData, uint32_t length)
{
    status_t status;
    
    if ((0 == pData) || (0 == length))
    {
        return false;
    }
    
    if (!g_bUartInit)
    {
        return false;
    }
    
    status = UART_DRV_ReceiveData(BSP_UART_INSTANCE, pData, length);
    
    return (STATUS_SUCCESS == status) ? true : false;
}

bool BSP_UART_Deinit(void)
{
    status_t status;
    
    if (!g_bUartInit)
    {
        return true;
    }
    
    status = UART_DRV_Deinit(BSP_UART_INSTANCE);
    
    if (STATUS_SUCCESS == status)
    {
        g_bUartInit = false;
        return true;
    }
    
    return false;
}

bool BSP_UART_SetBaudRate(uint32_t baudRate)
{
    status_t status;
    
    if (!g_bUartInit)
    {
        return false;
    }
    
    status = UART_DRV_SetBaudRate(BSP_UART_INSTANCE, baudRate);
    
    return (STATUS_SUCCESS == status) ? true : false;
}
