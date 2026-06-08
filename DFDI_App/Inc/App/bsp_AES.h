/*
 * bsp_AES.h
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 AES加密算法 - 软件实现】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 *              4. 算法：AES-128 ECB模式
 */

#ifndef BSP_AES_H_
#define BSP_AES_H_

#ifdef __cplusplus
extern "C" {
#endif

/* ===========================================  Includes  =========================================== */
#include "stdint.h"
#include "stdbool.h"

/* ============================================  Defines  ============================================ */
#define AES_KEY_LENGTH 16U  /* AES-128 密钥长度 */

/* ============================================  API  ============================================ */

/*!
 * @brief AES加密
 *
 * @param[in] pPlainText 明文数据（长度必须是16的倍数）
 * @param[in] plainTextLen 明文长度
 * @param[in] pKey AES密钥（16字节）
 * @param[out] pCipherText 密文输出缓冲区
 * @return none
 *
 * @note plainTextLen必须是16的倍数
 */
extern void BSP_AES_Encrypt(int8_t *pPlainText, int32_t plainTextLen, 
                            int8_t *pKey, int8_t *pCipherText);

/*!
 * @brief AES解密
 *
 * @param[in] pCipherText 密文数据（长度必须是16的倍数）
 * @param[in] cipherTextLen 密文长度
 * @param[in] pKey AES密钥（16字节）
 * @param[out] pPlainText 明文输出缓冲区
 * @return none
 *
 * @note cipherTextLen必须是16的倍数
 */
extern void BSP_AES_Decrypt(int8_t *pCipherText, int32_t cipherTextLen,
                            int8_t *pKey, int8_t *pPlainText);

#ifdef __cplusplus
}
#endif

#endif /* BSP_AES_H_ */
