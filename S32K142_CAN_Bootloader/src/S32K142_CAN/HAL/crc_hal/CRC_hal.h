/*
 * CRC_hal.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_HAL_CRC_HAL_CRC_HAL_H_
#define S32K142_CAN_HAL_CRC_HAL_CRC_HAL_H_

#include "includes.h"

#define CRC_SEED_INIT_VALUE	0xffff
typedef uint32 tCrc;

/*******************************************************************************
 * API
 ******************************************************************************/
/*!
 * @brief 初始化CRC模块
 *
 * This function returns the state of the initial.
 *
 * @param[in] instance instance number
 * @return the initial state.
 */
extern boolean CRC_HAL_Init(void);

/*!
 * @brief 创建循环冗余校验码.
 *
 * This function returns the state of the initial.
 *
 * @param[in] instance instance number
 * @param[in] data buf
 * @param[in] data len
 * @param[out] CRC value
 * @return the initial state.
 */
extern void CRC_HAL_CreatHardwareCrc(const uint8 *i_pucDataBuf, const uint32 i_ulDataLen, uint32 *m_pCurCrc);

/*FUNCTION**********************************************************************
 *
 * Function Name : CRC_HAL_StartSoftwareCrc
 * Description   : 该函数使用终端软件查找表或通过计算来生成循环冗余校验值。
 *
 * Implements : CreatCrc_Activity
 *END**************************************************************************/
extern void CRC_HAL_StartSoftwareCrc(uint32 *m_pCurCrc);

/*FUNCTION**********************************************************************
 *
 * Function Name : CRC_HAL_CreatHardwareCrc
 * Description   : 该函数通过软件查找表或计算的方式生成循环冗余校验码。
 *
 * Implements : CreatCrc_Activity
 *END**************************************************************************/
void CRC_HAL_CreatSoftwareCrc(const uint8_t *i_pucDataBuf, const uint32_t i_ulDataLen, uint32_t *m_pCurCrc);

/*FUNCTION**********************************************************************
 *
 * Function Name : CRC_HAL_EndSoftwareCrc
 * Description   : 该函数使用终端软件查找表或通过计算来生成循环冗余校验值。
 *
 * Implements : CreatCrc_Activity
 *END**************************************************************************/
extern void CRC_HAL_EndSoftwareCrc(uint32 *m_pCurCrc);

/*FUNCTION**********************************************************************
 *
 * Function Name : CRC_HAL_CalculateCRCOnce
 * Description   : 仅计算一次循环冗余校验
 *
 * Implements : CreatCrc_Activity
 *END**************************************************************************/
extern void CRC_HAL_CalculateCRCOnce(const uint8_t *i_pucDataBuf, const uint32_t i_ulDataLen, uint32_t *m_pCurCrc);

/*!
 * @brief 去初始化
 *
 * TODO:此处为部分说明。
 *
 * @param[in] instance instance number
 */
void CRC_HAL_Deinit(void);


#endif /* S32K142_CAN_HAL_CRC_HAL_CRC_HAL_H_ */
