/*
 * bsp_UDS_algorithm.h
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 UDS算法模块 - 兼容S32K142代码风格】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 */

#ifndef BSP_UDS_ALGORITHM_H_
#define BSP_UDS_ALGORITHM_H_

#ifdef __cplusplus
extern "C" {
#endif

/* ===========================================  Includes  =========================================== */
#include "stdint.h"
#include "stdbool.h"
#include "bsp_timer.h"

/* ============================================  Defines  ============================================ */

/*!< UDS默认AES密钥 */
#define BSP_UDS_ALG_KEY_LEN 16U
extern const uint8_t g_udsDefaultKey[BSP_UDS_ALG_KEY_LEN];

/* ============================================  API  ============================================ */

/*!
 * @brief 初始化UDS算法模块
 *
 * @return none
 */
extern void BSP_UDS_ALG_Init(void);

/*!
 * @brief UDS数据加密
 *
 * @param[in] pPlainText 明文数据（长度必须是16的倍数）
 * @param[in] dataLen 数据长度
 * @param[out] pCipherText 密文输出缓冲区
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_UDS_ALG_Encrypt(const uint8_t *pPlainText, uint32_t dataLen, uint8_t *pCipherText);

/*!
 * @brief UDS数据解密
 *
 * @param[in] pCipherText 密文数据（长度必须是16的倍数）
 * @param[in] dataLen 数据长度
 * @param[out] pPlainText 明文输出缓冲区
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_UDS_ALG_Decrypt(const uint8_t *pCipherText, uint32_t dataLen, uint8_t *pPlainText);

/*!
 * @brief 获取随机数据
 *
 * @param[in] needRandomDataLen 需要的长度
 * @param[out] pRandomDataBuf 随机数据缓冲区
 * @return TRUE-成功, FALSE-失败
 */
extern bool BSP_UDS_ALG_GetRandom(uint32_t needRandomDataLen, uint8_t *pRandomDataBuf);

/*!
 * @brief 软件定时器节拍增加
 *
 * @note 需在定时器中断或定时任务中周期性调用
 *
 * @return none
 */
extern void BSP_UDS_ALG_AddSWTimerTick(void);

/*!
 * @brief 去初始化UDS算法模块
 *
 * @return none
 */
extern void BSP_UDS_ALG_Deinit(void);

#ifdef __cplusplus
}
#endif

#endif /* BSP_UDS_ALGORITHM_H_ */
