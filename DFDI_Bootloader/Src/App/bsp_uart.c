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
#include "device_register.h"
#include "osif.h"
#include <stdarg.h>
#include <stdio.h>

/* ============================================  宏定义  ============================================ */

/*!< UART1 base */
#define BSP_UART_BASE UART1

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
    module_clk_config_t clkConfig;

    /* 使能GPIO时钟 */
    CKGEN_DRV_Enable(CLK_GPIO, true);

    /* 配置并使能UART1外设时钟源 */
    clkConfig.source = HSIDIV2_CLK;
    clkConfig.div = 1U;
    CKGEN_DRV_SetModuleClock(UART1_CLK, &clkConfig);
    CKGEN_DRV_Enable(CLK_UART1, true);
    CKGEN_DRV_SoftReset(SRST_UART1, true);
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
    
    if (0U == (CKGEN->PERI_CLK_MUX2 & (CKGEN_PERI_CLK_MUX2_UART0_MUX_Msk << ((uint32_t)CLK_UART1 * 4U))))
    {
        CKGEN->PERI_CLK_MUX2 |= 5U << ((uint32_t)CLK_UART1 * 4U);
    }

    (void)UART_DRV_SetBaudRate(BSP_UART_INSTANCE, config->baudRate);
    UART_SetBitCountPerChar(BSP_UART_BASE, config->bitCount);
    UART_SetStopBitCount(BSP_UART_BASE, config->stopBitCount);
    UART_SetParityMode(BSP_UART_BASE, config->parityMode);
    UART_SetFIFO(BSP_UART_BASE, true);
    UART_SetTransmitterCmd(BSP_UART_BASE, true);
    UART_SetReceiverCmd(BSP_UART_BASE, true);

    g_bUartInit = true;
    return true;
}

bool BSP_UART_Send(const uint8_t *pData, uint32_t length)
{
    if ((0 == pData) || (0 == length))
    {
        return false;
    }
    
    if (!g_bUartInit)
    {
        return false;
    }
    
    for (uint32_t i = 0; i < length; i++)
    {
        while (!UART_GetStatusFlag(BSP_UART_BASE, UART_TX_DATA_NOT_FULL))
        {
        }
        UART_Putchar(BSP_UART_BASE, pData[i]);
    }

    return true;
}

bool BSP_UART_Receive(uint8_t *pData, uint32_t length, uint32_t timeoutMs)
{
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

    uint32_t received = 0U;
    uint32_t startMs = OSIF_GetMilliseconds();

    while (received < length)
    {
        if (UART_GetStatusFlag(BSP_UART_BASE, UART_RX_DATA_READY))
        {
            UART_Getchar(BSP_UART_BASE, &pData[received]);
            received++;
            continue;
        }

        if ((OSIF_WAIT_FOREVER != timeoutMs) && ((OSIF_GetMilliseconds() - startMs) >= timeoutMs))
        {
            return false;
        }
    }

    return true;
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
    if ((0 == pData) || (0 == length))
    {
        return false;
    }
    
    if (!g_bUartInit)
    {
        return false;
    }

    return BSP_UART_Send(pData, length);
}

bool BSP_UART_ReceiveAsync(uint8_t *pData, uint32_t length)
{
    if ((0 == pData) || (0 == length))
    {
        return false;
    }
    
    if (!g_bUartInit)
    {
        return false;
    }

    return BSP_UART_Receive(pData, length, BSP_UART_TIMEOUT_MS);
}

bool BSP_UART_Deinit(void)
{
    if (!g_bUartInit)
    {
        return true;
    }

    UART_SetTransmitterCmd(BSP_UART_BASE, false);
    UART_SetReceiverCmd(BSP_UART_BASE, false);
    CKGEN_DRV_SoftReset(SRST_UART1, false);
    CKGEN_DRV_Enable(CLK_UART1, false);
    g_bUartInit = false;
    return true;
}

bool BSP_UART_SetBaudRate(uint32_t baudRate)
{
    if (!g_bUartInit)
    {
        return false;
    }

    (void)UART_DRV_SetBaudRate(BSP_UART_INSTANCE, baudRate);
    return true;
}

bool BSP_UART_Printf(const char *fmt, ...)
{
    static char buffer[256];
    va_list ap;
    int len;

    if (!g_bUartInit)
    {
        if (!BSP_UART_Init(NULL))
        {
            return false;
        }
    }

    va_start(ap, fmt);
    len = vsnprintf(buffer, sizeof(buffer), fmt, ap);
    va_end(ap);

    if (len > 0)
    {
        uint32_t sendLen = ((uint32_t)len >= sizeof(buffer)) ? (sizeof(buffer) - 1U) : (uint32_t)len;
        for (uint32_t i = 0; i < sendLen; i++)
        {
            if (buffer[i] == '\n')
            {
                (void)BSP_UART_PutChar((uint8_t)'\r');
            }
            (void)BSP_UART_PutChar((uint8_t)buffer[i]);
        }
        return true;
    }
    return false;
}
