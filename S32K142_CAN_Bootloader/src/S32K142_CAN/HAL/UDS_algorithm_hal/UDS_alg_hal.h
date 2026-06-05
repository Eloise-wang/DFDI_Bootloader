/*
 * UDS_alg_hal.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_HAL_UDS_ALGORITHM_HAL_UDS_ALG_HAL_H_
#define S32K142_CAN_HAL_UDS_ALGORITHM_HAL_UDS_ALG_HAL_H_

#include "includes.h"

/*!
 * @brief 初始化该模块。
 *
 * 该函数返回初始状态
 *
 * @param[in] instance instance number
 * @return the initial state.
 */
void UDS_ALG_HAL_Init(void);


/*!
 * @brief 对UDS数据进行加密。
 *
 * 该函数返回加密数据的状态。
 *
 * @param[in] i_pPlainText point plaintext
 * @param[in] i_dataLen point plaintext data lenght
 * @param[out]  o_pCipherText point ciphertext
 * @return encrypt data status.
 */
extern boolean UDS_ALG_HAL_EncryptData(const uint8 *i_pPlainText, const uint32 i_dataLen, uint8 *o_pCipherText);


/*!
 * @brief 对UDS数据进行解密。
 *
 * 该函数返回解密数据的状态。
 *
 * @param[in] i_pCipherText point ciphertext
 * @param[in] i_dataLen point ciphertext data lenght
 * @param[out]  o_pPlainText point plaintext
 * @return decrypt data status.
 */
extern boolean UDS_ALG_HAL_DecryptData(const uint8 *i_pCipherText, const uint32 i_dataLen, uint8 *o_pPlainText);


/*!
 * @brief 通过UDS获取随机数据。
 *
 * 该函数用于返回获取随机数据的状态。
 *
 * @param[in] i_needRandomLen need random data len
 * @param[out]  o_pRandomBuf point random data buff
 * @return get random data status.
 */
extern boolean UDS_ALG_HAL_GetRandom(const uint32 i_needRandomDataLen, uint8 *o_pRandomDataBuf);

/*UDS 软件定时器时钟节拍*/
extern void UDS_ALG_HAL_AddSWTimerTickCnt(void);


/*!
 * @brief 去初始化
 *
 * TODO:Some description here.
 *
 * @param[in] instance instance number
 */
void UDS_ALG_HAL_Deinit(void);








#endif /* S32K142_CAN_HAL_UDS_ALGORITHM_HAL_UDS_ALG_HAL_H_ */
