/*
 * bsp_watchdog.c
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 看门狗BSP实现 - 兼容S32K142代码风格】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 */

#include "bsp_watchdog.h"
#include "ckgen_drv.h"

/* ============================================  宏定义  ============================================ */

#define BSP_WDG_PRESCALER_DIV (256UL)

/* ============================================  全局变量  ============================================ */

/*!< 看门狗初始化标志 */
static bool g_bWatchdogInit = false;

/*!< 看门狗配置 - 使用默认配置 */
static wdg_user_config_t g_wdgConfig;

/* ============================================  内部函数  ============================================ */

static uint16_t BSP_WATCHDOG_ConvertMsToTimeoutValue(uint32_t timeoutMs, bool prescalerEn)
{
    uint32_t wdgClockHz = 0U;
    uint32_t timeoutTicks;

    (void)CKGEN_DRV_GetFreq(LSI_CLK, &wdgClockHz);
    if (wdgClockHz == 0U)
    {
        return WDG_TIMEOUT_RESET_DEFAULT_VALUE;
    }

    if (prescalerEn)
    {
        wdgClockHz /= BSP_WDG_PRESCALER_DIV;
        if (wdgClockHz == 0U)
        {
            wdgClockHz = 1U;
        }
    }

    timeoutTicks = (wdgClockHz * timeoutMs) / 1000U;
    if (timeoutTicks == 0U)
    {
        timeoutTicks = 1U;
    }
    else if (timeoutTicks > 0xFFFFU)
    {
        timeoutTicks = 0xFFFFU;
    }

    return (uint16_t)timeoutTicks;
}

/* ============================================  API实现  ============================================ */

bool BSP_WATCHDOG_Init(void)
{
    /* 获取默认配置 */
    WDG_DRV_GetDefaultConfig(&g_wdgConfig);

    /* 配置看门狗参数 */
    g_wdgConfig.prescalerEn = true;                  /* 使用固定256预分频，便于按ms换算 */
    g_wdgConfig.timeoutValue = BSP_WATCHDOG_ConvertMsToTimeoutValue(BSP_WDG_TIMEOUT_MS, g_wdgConfig.prescalerEn);
    g_wdgConfig.clkSource = WDG_LSI_CLOCK;          /* 使用LSI时钟(约32kHz) */
    g_wdgConfig.windowValue = 0U;                   /* 窗口值为0，禁用窗口模式 */
    g_wdgConfig.updateEn = true;                     /* 允许更新 */
    g_wdgConfig.intEn = false;                       /* 不使能中断 */
    g_wdgConfig.winEn = false;                       /* 禁用窗口模式 */
    g_wdgConfig.opMode.stopEn = true;                /* STOP模式下使能 */
    g_wdgConfig.opMode.debugEn = false;             /* DEBUG模式下禁用 */

    /* 初始化看门狗 */
    status_t status = WDG_DRV_Init(WDG_INST, &g_wdgConfig);
    if (STATUS_SUCCESS == status)
    {
        g_bWatchdogInit = true;
        return true;
    }

    return false;
}

bool BSP_WATCHDOG_Feed(void)
{
    if (!g_bWatchdogInit)
    {
        return false;
    }

    /* 刷新看门狗计数器 */
    WDG_DRV_Trigger(WDG_INST);
    return true;
}

bool BSP_WATCHDOG_SystemReset(void)
{
    if (!g_bWatchdogInit)
    {
        return false;
    }

    /* 设置超时为0，立即触发复位 */
    status_t status = WDG_DRV_SetTimeout(WDG_INST, 0U);
    if (STATUS_SUCCESS == status)
    {
        /* 等待复位发生 */
        while (1)
        {
            /* 空循环，等待看门狗复位 */
        }
    }

    return false;
}

bool BSP_WATCHDOG_Deinit(void)
{
    if (!g_bWatchdogInit)
    {
        return true;
    }

    status_t status = WDG_DRV_Deinit(WDG_INST);
    if (STATUS_SUCCESS == status)
    {
        g_bWatchdogInit = false;
        return true;
    }

    return false;
}
