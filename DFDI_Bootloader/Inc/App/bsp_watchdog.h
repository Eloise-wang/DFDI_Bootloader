/*
 * bsp_watchdog.h
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 看门狗BSP接口 - 兼容S32K142代码风格】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 */

#ifndef BSP_WATCHDOG_H_
#define BSP_WATCHDOG_H_

#ifdef __cplusplus
extern "C" {
#endif

/* ===========================================  Includes  =========================================== */
#include "stdint.h"
#include "stdbool.h"
#include "wdg_drv.h"
#include "device_status.h"

/* ============================================  Defines  ============================================ */

/*!< 看门狗实例号 - AC7840只有一个看门狗 */
#ifndef WDG_INST
#define WDG_INST 0U
#endif

/*!< 看门狗默认超时时间 (ms) - 约100ms后触发复位 */
#ifndef BSP_WDG_TIMEOUT_MS
#define BSP_WDG_TIMEOUT_MS 100U
#endif

/* ============================================  API  ============================================ */

/*!
 * @brief 初始化看门狗
 *
 * @note 初始化后看门狗开始计数，超时后触发系统复位
 *       需定期调用 BSP_WATCHDOG_Feed() 喂狗
 *
 * @return TRUE-初始化成功, FALSE-初始化失败
 */
extern bool BSP_WATCHDOG_Init(void);

/*!
 * @brief 喂狗（刷新计数器）
 *
 * @note 需定期调用以防止看门狗复位系统
 *
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_WATCHDOG_Feed(void);

/*!
 * @brief 触发系统复位
 *
 * @note 通过设置极短超时时间触发看门狗复位
 *
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_WATCHDOG_SystemReset(void);

/*!
 * @brief 去初始化看门狗
 *
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_WATCHDOG_Deinit(void);

#ifdef __cplusplus
}
#endif

#endif /* BSP_WATCHDOG_H_ */
