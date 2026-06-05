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

/* ============================================  全局变量  ============================================ */

/*!< 看门狗初始化标志 */
static bool g_bWatchdogInit = false;

/*!< 看门狗配置 - 使用默认配置 */
static wdg_user_config_t g_wdgConfig;

/* ============================================  API实现  ============================================ */

bool BSP_WATCHDOG_Init(void)
{
    /* 获取默认配置 */
    WDG_DRV_GetDefaultConfig(&g_wdgConfig);

    /* 配置看门狗参数 */
    g_wdgConfig.timeoutValue = BSP_WDG_TIMEOUT_MS;  /* 超时时间(ms) */
    g_wdgConfig.clkSource = WDG_LSI_CLOCK;          /* 使用LSI时钟(约32kHz) */
    g_wdgConfig.windowValue = 0U;                   /* 窗口值为0，禁用窗口模式 */
    g_wdgConfig.updateEn = true;                     /* 允许更新 */
    g_wdgConfig.prescalerEn = false;                 /* 不使用256预分频 */
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
