/*
 * bsp_crc.h
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 CRC校验BSP接口 - 兼容S32K142代码风格】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 *              4. CRC算法: CRC-32 (与S32K142保持一致)
 */

#ifndef BSP_CRC_H_
#define BSP_CRC_H_

#ifdef __cplusplus
extern "C" {
#endif

/* ===========================================  Includes  =========================================== */
#include "stdint.h"
#include "stdbool.h"
#include "crc_drv.h"
#include "device_status.h"

/* ============================================  Defines  ============================================ */

/*!< CRC实例号 - AC7840只有一个CRC */
#ifndef CRC_INST
#define CRC_INST 0U
#endif

/*!< CRC初始值 */
#define BSP_CRC_SEED_INIT_VALUE 0xFFFFFFFFU

/* ============================================  API  ============================================ */

/*!
 * @brief 初始化CRC模块
 *
 * @return TRUE-初始化成功, FALSE-初始化失败
 */
extern bool BSP_CRC_Init(void);

/*!
 * @brief 计算数据块的CRC值
 *
 * @param[in] pDataBuf 数据缓冲区
 * @param[in] dataLen 数据长度
 * @param[out] pCrc CRC结果指针
 * @return TRUE-成功, FALSE-失败
 *
 * @note 该函数使用硬件CRC计算CRC-16/DNP
 *       支持分次调用累加计算
 */
extern bool BSP_CRC_Calculate(const uint8_t *pDataBuf, uint32_t dataLen, uint32_t *pCrc);

/*!
 * @brief 一次计算完成CRC
 *
 * @param[in] pDataBuf 数据缓冲区
 * @param[in] dataLen 数据长度
 * @param[out] pCrc CRC结果指针
 * @return TRUE-成功, FALSE-失败
 *
 * @note 初始化、计算、结束操作一次性完成
 */
extern bool BSP_CRC_CalculateOnce(const uint8_t *pDataBuf, uint32_t dataLen, uint32_t *pCrc);

/*!
 * @brief 开始CRC计算（初始化种子）
 *
 * @param[out] pCrc CRC变量指针
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_CRC_Start(uint32_t *pCrc);

/*!
 * @brief 追加CRC计算数据
 *
 * @param[in] pDataBuf 数据缓冲区
 * @param[in] dataLen 数据长度
 * @param[out] pCrc CRC变量指针
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_CRC_Append(const uint8_t *pDataBuf, uint32_t dataLen, uint32_t *pCrc);

/*!
 * @brief 结束CRC计算（取反）
 *
 * @param[out] pCrc CRC变量指针
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_CRC_End(uint32_t *pCrc);

/*!
 * @brief 去初始化CRC模块
 *
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_CRC_Deinit(void);

#ifdef __cplusplus
}
#endif

#endif /* BSP_CRC_H_ */
