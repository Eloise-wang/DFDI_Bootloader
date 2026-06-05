/*
 * flash_hal.h
 *
 *  Created on: 2026年4月14日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef S32K142_CAN_HAL_FLASH_HAL_FLASH_HAL_H_
#define S32K142_CAN_HAL_FLASH_HAL_FLASH_HAL_H_

#include "flash_hal_Cfg.h"


typedef boolean (*tpfFlashInit)(void);
typedef void (*tpfFlashDeInit)(void);
typedef boolean (*tpfEraseSecotr)(const uint32, const uint32);
typedef boolean (*tpfProgramData)(const uint32, const uint8 *, const uint32);
typedef boolean (*tpfReadFlashData)(const uint32, const uint32, uint8 *);

typedef struct
{
	tpfFlashInit pfFlashInit;
	tpfEraseSecotr pfEraserSecotr;     /* 擦除扇区 */
	tpfProgramData pfProgramData;      /* 程序数据 */
	tpfReadFlashData pfReadFlashData;  /* 读flash数据 */
	tpfFlashDeInit pfFlashDeinit;
}tFlashOperateAPI;



/*******************************************************************************
 * API
 ******************************************************************************/
/*! @}*/
/*!
 * @name 注册 Flash API
 * 寄存器操作数 FLASH API.
 *
 * 要禁用此模块，你需要调用另一个函数（参见 \ref Uninitialize "禁用模块"）
 */
/*! @{*/

/*!
 * @brief 注册操作数 API.
 *
 * 该函数返回初始状态。
 *
 * @param[out] operate flash API
 * @返回寄存器状态.
 */
extern boolean FLASH_HAL_RegisterFlashAPI(tFlashOperateAPI *o_pstFlashOperateAPI);

#endif /* S32K142_CAN_HAL_FLASH_HAL_FLASH_HAL_H_ */
