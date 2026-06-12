/*
 * bsp_crc.h
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 CRC校验BSP接口 - CRC-16/DNP软件查表】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 *              4. CRC算法: CRC-16/DNP (poly=0x3D65, init=0, refIn=true, refOut=true, xorOut=0xFFFF)
 *                 与上位机pack_app_package.ps1及S32K142 APP保持一致
 */

#ifndef BSP_CRC_H_
#define BSP_CRC_H_

#ifdef __cplusplus
extern "C" {
#endif

#include "includes.h"
#include <stdbool.h>

#define BSP_CRC_SEED_INIT_VALUE 0x0000U

extern bool BSP_CRC_Init(void);
extern bool BSP_CRC_Calculate(const uint8_t *pDataBuf, uint32_t dataLen, uint32_t *pCrc);
extern bool BSP_CRC_CalculateOnce(const uint8_t *pDataBuf, uint32_t dataLen, uint32_t *pCrc);
extern bool BSP_CRC_Start(uint32_t *pCrc);
extern bool BSP_CRC_Append(const uint8_t *pDataBuf, uint32_t dataLen, uint32_t *pCrc);
extern bool BSP_CRC_End(uint32_t *pCrc);
extern bool BSP_CRC_Deinit(void);

#ifdef __cplusplus
}
#endif

#endif /* BSP_CRC_H_ */
