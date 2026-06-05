/*
 * flash.c
 *
 *  Created on: 2026年4月11日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 Flash 配置头文件，核心定义了 Flash 分区地址、编程大小、驱动范围等关键参数，用于 Flash 擦写、程序升级（Bootloader 烧录 App）等场景】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */


#ifndef DRIVER_FLASH_FLASH_CFG_H_
#define DRIVER_FLASH_FLASH_CFG_H_

#include "sdk_project_config.h"

#define USE_FLASH_DRIVER
#define EN_DISABAL_INTERRUPT

/*注释原因：当前 Bootloader 不用 “逻辑地址 / 块管理” 这种复杂结构*/
//typedef unsigned long tLogicalAddr;
//typedef struct
//{
//	tLogicalAddr xBlockStartLogicalAddr; /*block start logical addr*/
//	tLogicalAddr xBlockEndLogicalAddr;   /*block end logical addr*/
//}tBlockInfo;


/* 各程序闪存大小*/
#define PROGRAM_SIZE (128u)


//启动地址由链接脚本 .ld 决定
//#define STARTUP_ADDR (0x00000000u) /*startup address*/

/*应用程序闪存状态信息地址*/
extern uint32_t __APP_FLASH_INFO_ADDR[];
//#define APP_FLASH_INFO_ADDR ((uint32_t*)__APP_FLASH_INFO_ADDR)
#define APP_FLASH_INFO_ADDR (0x0000F000u)

#define FLASH_DRIVER_START (0x12u)
#define FLASH_DRIVER_END (0xABu)

/*flash driver start addr*/
//extern uint32_t __FLASH_DRIVER_START_ADDR[];
////#define FLASH_DRIVER_START_ADDR ((uint32_t*)__FLASH_DRIVER_START_ADDR)
#define FLASH_DRIVER_START_ADDR (0x1FFFF700u)
//
///*flash driver end addr*/
//extern uint32_t __FLASH_DRIVER_END_ADDR[];
////#define FLASH_DRIVER_START_ADDR ((uint32_t*)__FLASH_DRIVER_END_ADDR)
#define FLASH_DRIVER_END_ADDR   (0x1FFFFFF0u)

/*flash driver max data len*/
#define FLASH_DRIVER_LEN (FLASH_DRIVER_END_ADDR - FLASH_DRIVER_START_ADDR + 1u)

/*slave application data address offset base*/
#define SLAVE_APP_OFFSET_BASE (0x10000000u)

///*application can used space*/
//extern const tBlockInfo g_astBlockNum[];
//
///*logical num*/
//extern const unsigned char g_ucBlockNum;

//#ifdef NXF47391

//#define FLASH_API_DEBUG
//#define FLASH_SDK_USING

//#endif	//end of NXF47391


#endif /* DRIVER_FLASH_FLASH_CFG_H_ */

/************************End file********************************/
