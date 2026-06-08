/*
 * CRC_hal.h
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef APP_BOOTLOADER_EXCHANGE_INFO_HAL_CRC_HAL_CRC_HAL_H_
#define APP_BOOTLOADER_EXCHANGE_INFO_HAL_CRC_HAL_CRC_HAL_H_

#include "includes.h"


/*******************************************************************************
 * Definitions
 ******************************************************************************/

#define CRC_SEED_INIT_VALUE	0xffff
typedef uint32 tCrc;

/*******************************************************************************
 * API
 ******************************************************************************/
 
/**
 * @Function:
 * 1. 初始化CRC硬件模块：芯片内部有硬件 CRC 计算器；
 * 2. 硬件直接算一整段数据的CRC：我直接给他一段数据和该数据长度，然后他返回CRC结果；
 * 3. 软件CRC开始(重置初始值 = 0xFFFF)；
 * 4. 软件累加计算CRC的值；
 * 5. 结束 CRC 计算，做最终反转 / 异或处理
 *
 * @Notes:
 * 1.  硬件 CRC：整片校验、跳转 App 用
 * 2. 软件 CRC：分段计算、UDS 刷写用
 * 3. Start → 分段喂数据 → End → 对比结果
 */




/*! @}*/
/*!
 * @name Initialize
 * Initial this module.
 *
 * To disable this module, you need call another function (see \ref Uninitialize "Disable Module")
 */
/*! @{*/

/*!
 * @brief To initial this module.
 *
 * This function returns the state of the initial.
 *
 * @param[in] instance instance number
 * @return the initial state.
 */
extern boolean CRC_HAL_Init(void);


/*! @}*/
/*!
 * @name Create CRC
 * Initial this module.
 *
 * To disable this module, you need call another function (see \ref Uninitialize "Disable Module")
 */
/*! @{*/

/*!
 * @brief To create CRC.
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
/*! @}*/

/*FUNCTION**********************************************************************
 *
 * Function Name : CRC_HAL_StartSoftwareCrc
 * Description   : This function use end software lookup table or calculate  to create crc.
 *
 * Implements : CreatCrc_Activity
 *END**************************************************************************/
extern void CRC_HAL_StartSoftwareCrc(uint32 *m_pCurCrc);

/*FUNCTION**********************************************************************
 *
 * Function Name : CRC_HAL_CreatSoftwareCrc
 * Description   : This function use software lookup table or calculate  to create crc..
 *
 * Implements : CreatCrc_Activity
 *END**************************************************************************/
void CRC_HAL_CreatSoftwareCrc(const uint8_t *i_pucDataBuf, const uint32_t i_ulDataLen, uint32_t *m_pCurCrc);

/*FUNCTION**********************************************************************
 *
 * Function Name : CRC_HAL_EndSoftwareCrc
 * Description   : This function use end software lookup table or calculate  to create crc..
 *
 * Implements : CreatCrc_Activity
 *END**************************************************************************/
extern void CRC_HAL_EndSoftwareCrc(uint32 *m_pCurCrc);

/*FUNCTION**********************************************************************
 *
 * Function Name : CRC_HAL_CalculateCRCOnce
 * Description   : Calcualte CRC once
 *
 * Implements : CreatCrc_Activity
 *END**************************************************************************/
extern void CRC_HAL_CalculateCRCOnce(const uint8_t *i_pucDataBuf, const uint32_t i_ulDataLen, uint32_t *m_pCurCrc);

/*!
 * @anchor Uninitialize
 * @name Disable Module
 * TODO:Some description here.
 */
/*! @{*/

/*!
 * @brief uninitial this module.
 *
 * TODO:Some description here.
 *
 * @param[in] instance instance number
 */
void CRC_HAL_Deinit(void);

/*! @}*/

#if defined (__cplusplus)
}
#endif

/*! @}*/

#endif /* CRC_H */
/*******************************************************************************
 * EOF
 ******************************************************************************/
