/*
 * AES.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_HAL_UDS_ALGORITHM_HAL_AES_H_
#define S32K142_CAN_HAL_UDS_ALGORITHM_HAL_AES_H_
#include "includes.h"

#ifdef EN_ALG_SW

/**
**  p:    plaintxt
**  plen: plaintxt length
**  key:  AES key
**  ciper:cipertext
**/
void aes(sint8 *p, sint32 plen, sint8 *key, sint8 * cipher);

/**
** c         : ciphertext
** clen      : ciphertext length
** key       : AES key
** pPlainText: plaintxt
**/
void deAes(sint8 *c, sint32 clen, sint8 *key, sint8 * pPlainText);
#endif


#endif /* S32K142_CAN_HAL_UDS_ALGORITHM_HAL_AES_H_ */
