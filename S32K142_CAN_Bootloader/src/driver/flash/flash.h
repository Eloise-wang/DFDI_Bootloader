/*
 * flash.c
 *
 *  Created on: 2026年4月11日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */


#ifndef DRIVER_FLASH_FLASH_H_
#define DRIVER_FLASH_FLASH_H_

#include "flash_cfg.h"
//#ifdef NXF47391
/*******************************************************************************
*   回调函数
*******************************************************************************/
/*! @回调函数指针数据类型
 *
 *  如果在应用程序中使用回调函数，任何可从该函数访问的代码
 *  不得置于针对编程/擦除操作的闪存块中。
 *   可通过使用START/END_FUNCTION_DEFINITION/DECLARATION_RAMSECTION宏将函数放置在RAM段中。
 */
typedef void (* flash_callback_t) (void) ;

/*! @brief  Null callback */
#define NULL_CALLBACK      ((flash_callback_t)0xFFFFFFFFU)

#ifndef FLASH_SDK_USING

/* Word size 2 bytes */
#define FTFx_WORD_SIZE     0x0002U
/* Long word size 4 bytes */
#define FTFx_LONGWORD_SIZE 0x0004U
/* Phrase size 8 bytes */
#define FTFx_PHRASE_SIZE   0x0008U
/* Double-phrase size 16 bytes */
#define FTFx_DPHRASE_SIZE  0x0010U

/*!
 * @brief Flash 用户 配置结构
 *
 * 接口 : flash_user_config_t_Class
 */
typedef struct
{
    uint32_t PFlashBase;            /*!< P-Flash存储器的基地址 */
    uint32_t PFlashSize;            /*!< P-Flash存储器的字节大小 */
    uint32_t DFlashBase;            /*!< 对于FlexNVM器件，此为D-Flash存储器的基地址
                                     *    (FlexNVM memory); 对于非FlexNVM器件，该字段未被使用 */
    uint32_t EERAMBase;             /*!< FlexRAM（适用于FlexNVM器件）的基地址
                                     *    或加速RAM（适用于非FlexNVM器件）*/
    flash_callback_t CallBack;      /*!< 用于处理时间关键事件的回调函数。此函数可调用的所有代码
                                     *   不得放置在针对编程/擦除操作的闪存块中*/
} flash_user_config_t;

/*!
 * @brief Flash SSD 配置结构
 *
 * 该结构体包含C90TFS/FTFx的静态参数，这些参数与设备相关。
 * 其中PFlashBlockBase、PFlashBlockSize、DFlashBlockBase、EERAMBlockBase以及CallBack等字段通过flash_user_config_t结构体进行传递，
 * 其余参数如DFlashBlockSize和EEEBlockSize则会在FLASH_DRV_Init()函数中自动完成初始化。
 * 接口 : flash_ssd_config_t_Class
 */
typedef struct
{
    uint32_t PFlashBase;          /*!< P-Flash存储器的基地址 */
    uint32_t PFlashSize;          /*!< P-Flash存储器的字节大小 */
    uint32_t DFlashBase;          /*!< 对于FlexNVM器件，此为D-Flash存储器（FlexNVM存储器）的基地址;
                                   *    对于非FlexNVM器件，该字段未被使用 */
    uint32_t DFlashSize;          /*!< 对于FlexNVM器件，此为该区域以字节为单位的大小
                                   *    该部分用作来自FlexNVM存储器的D-Flash;
                                   *    对于非FlexNVM器件，该字段未被使用 */
    uint32_t EERAMBase;           /*!< FlexRAM（适用于FlexNVM器件）的基地址
                                   *    或加速随机存取存储器（适用于非FlexNVM器件） */
    uint32_t EEESize;             /*!< 对于FlexNVM器件，此为已划分的EEPROM区域的字节大小
                                   *    源自FlexRAM；对于非FlexNVM器件，该字段未被使用 */
    flash_callback_t CallBack;    /*!< 用于处理时间关键事件的回调函数。此函数可执行的所有代码
                                   *   不得放置在针对编程/擦除操作的闪存块中 */
} flash_ssd_config_t;
#endif	//FLASH_SDK_USING 结束

typedef struct
{
#if 0
    status_t (*FLASH_EraseAllBlock)(const flash_ssd_config_t * pSSDConfig);
    status_t (*FLASH_VerifyAllBlock)(const flash_ssd_config_t * pSSDConfig,uint8_t marginLevel);
    status_t (*FLASH_EraseSector)(const flash_ssd_config_t * pSSDConfig,uint32_t dest,uint32_t size);
    status_t (*FLASH_VerifySection)(const flash_ssd_config_t * pSSDConfig,uint32_t dest,uint16_t number,uint8_t marginLevel);
    void (*FLASH_EraseSuspend)(void);
    void (*FLASH_EraseResume)(void);
    status_t (*FLASH_Program)(const flash_ssd_config_t * pSSDConfig,uint32_t dest, uint32_t size,const uint8_t * pData);
    status_t (*FLASH_ProgramCheck)(const flash_ssd_config_t * pSSDConfig,uint32_t dest,uint32_t size,const uint8_t * pExpectedData,uint32_t * pFailAddr,uint8_t marginLevel);
    status_t (*FLASH_ProgramSection)(const flash_ssd_config_t * pSSDConfig,uint32_t dest,uint16_t number);
    status_t (*FLASH_EraseBlock)(const flash_ssd_config_t * pSSDConfig, uint32_t dest);
    status_t (*FLASH_CommandSequence)(const flash_ssd_config_t * pSSDConfig);
    status_t (*FLASH_VerifyBlock)(const flash_ssd_config_t * pSSDConfig,uint32_t dest,uint8_t marginLevel);
#endif

	status_t (*FLASH_EraseSector)(const flash_ssd_config_t *, uint32_t, uint32_t);
	status_t (*FLASH_Program)(const flash_ssd_config_t * pSSDConfig,uint32_t dest, uint32_t size,const uint8_t * pData);
    status_t (*FLASH_VerifySection)(const flash_ssd_config_t * pSSDConfig,uint32_t dest,uint16_t number,uint8_t marginLevel);
	void (*FLASH_GetDefaultConfig)(flash_user_config_t * const );
} tFlashOptInfo;

//#define FLASH_API_DEBUG

#ifdef FLASH_API_DEBUG
extern void Flash_test(void);
#endif	//FLASH_API_DEBUG 结束

//#endif	//end of NXF47391

//#ifdef USE_FLASH_DRIVER

extern unsigned char EraseFlashSector(const unsigned long i_ulLogicalAddr,
                                      const unsigned long i_ulEraseLen);

extern unsigned char WriteFlash(const uint32_t i_xStartAddr,
                                const void *i_pvDataBuf,
                                const unsigned short i_usDataLen);

/*flash 擦除验证*/
extern unsigned char FlashEraseVerify(const unsigned long i_ulStartVerifyAddr,
                                      const unsigned long i_ulVerifyLen);
//#endif	//USE_FLASH_DRIVER的结束

/*初始化flash*/
extern void InitFlash(void);

/* 初始化 falsh g_stFlashOptInfo 指针 */
extern void InitFlashAPI(void);

/***********************************************************
** 从FLASH中读取一个字节。读取数据的地址必须为全局地址。
************************************************************/
extern unsigned char ReadFlashByte(const unsigned long i_ulGloabalAddress);

/********************************************************
**	从当前页面闪存中读取数据。
** 	paramer :
**		@	i_ulLogicalAddr : 本地地址
**		@	i_ulLength : 需要读取数据长度
**		@	o_pucDataBuf : 读取数据BUF
*********************************************************/
extern void ReadFlashMemory(const unsigned long i_ulLogicalAddr,
                            const unsigned long i_ulLength,
                            unsigned char* o_pucDataBuf);

#endif /* DRIVER_FLASH_FLASH_H_ */
