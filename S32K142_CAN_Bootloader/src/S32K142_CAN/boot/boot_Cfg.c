/*
 * boot_Cfg.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */


/*******************************************************************************
 * User Include
 ******************************************************************************/
#include "boot_cfg.h"
#include "flash_hal_cfg.h"
#include "fls_app.h"
#include "CRC_hal.h"

/*******************************************************************************
 * Variables
 ******************************************************************************/
typedef struct
{
	uint8 infoDataLen;             /*Exchange inforamtion length must N * 4.*/
	uint8 requestEnterBootloader;  /*Request enter bootloader mode flag*/
	uint8 downloadAPPSuccessful;   /*downlaod APP successful flag*/
	uint32 infoStartAddr;          /*exchange information start address*/
	uint32 requestEnterBootloaderAddr; /*Request enter bootloader flag address */
	uint32 downloadAppSuccessfulAddr;  /*download APP successful flag address*/
}tBootInfo;

static const tBootInfo gs_stBootInfo = {
	16u,    /*Exchange inforamtion length must N * 4.*/
	0x5Au,  //请求进入引导加载程序模式标识
	0xA5u, //下载应用成功标识
	0x20002FF0u,  //交换信息起始地址
	0x20002FF1u,  //请求进入引导加载程序标志位地址
	0x20002FF0u, //下载应用成功标识地址
};

/*get information storage CRC*/
#define GetInfoStorageCRC() (*(uint16 *)(gs_stBootInfo.infoStartAddr + 14))

/*set information CRC */
#define SetInforCRC(xCrc) ((*(uint16 *)(gs_stBootInfo.infoStartAddr + 14)) = (uint16)(xCrc))

/* 定义 APP 的真实物理起始地址（中断向量表的基址）*/
/* 根据你的 .ld 文件，APP 存放在这里 */
#define APP_VECTOR_TABLE_ADDR 0x0000F200u

/*Is information valid?*/
static boolean Boot_IsInfoValid(void);

/*calculate information CRC*/
static uint16 Boot_CalculateInfoCRC(void);

/*set download app successful */
void Boot_SetDownloadAppSuccessful(void)
{
	uint16 infoCrc = 0u;

	*((uint8 *)gs_stBootInfo.downloadAppSuccessfulAddr) = gs_stBootInfo.downloadAPPSuccessful;

	infoCrc = Boot_CalculateInfoCRC();
	SetInforCRC(infoCrc);
}

/*Is request enter bootloader?*/
boolean Boot_IsRequestEnterBootloader(void)
{
	boolean result = FALSE;

	if(TRUE == Boot_IsInfoValid())
	{
		if(gs_stBootInfo.requestEnterBootloader == *((uint8 *)gs_stBootInfo.requestEnterBootloaderAddr))
		{
			result = TRUE;
		}
	}
	
	return result;
}

/*clear request enter bootloader flag*/
void Boot_ClearRequestEnterBootloaderFlag(void)
{
	uint16 infoCrc = 0u;

	*((uint8 *)gs_stBootInfo.requestEnterBootloaderAddr) = 0u;

	infoCrc = Boot_CalculateInfoCRC();
	SetInforCRC(infoCrc);
}

/*Is power on trigger reset?*/
boolean Boot_IsPowerOnTriggerReset(void)
{
	boolean result = TRUE;

	result = POWER_SYS_GetResetSrcStatusCmd(RCM, RCM_POWER_ON);

	return result;
}

/*when power on, clear all flag in RAM for ECC.*/
void Boot_PowerONClearAllFlag(void)
{
	uint16 infoCrc = 0u;
	uint8 index = 0u;

	/*clear RAM with 4 bytes for ECC*/
	for(index = 0u; index < (gs_stBootInfo.infoDataLen >> 2u); index++)
	{
		*(((uint32 *)gs_stBootInfo.infoStartAddr) + index) = 0u;
	}
	
	infoCrc = Boot_CalculateInfoCRC();
	SetInforCRC(infoCrc);
}

/*remap multi-core application*/
void Boot_RemapApplication(void)
{
	uint32 totalCoreNo = 0u;
	uint32 index = 0u;
	tAPPType appType = APP_A_TYPE;
	uint32 appMirrorAddr = 0u;
	uint32 appRemapAddr = 0u;
	
	totalCoreNo = FLASH_HAL_GetConfigCoreNo();
	if(totalCoreNo > 0u)
	{
		appType = Flash_GetNewestAPPType();
		
		for(index = 0u; index < totalCoreNo; index++)
		{
			if((TRUE == FLASH_HAL_GetMultiCoreMirrorAddr(appType,index,&appMirrorAddr)) &&
				(TRUE == FLASH_HAL_GetMultiCoreRemapAddr(appType,index,&appRemapAddr)))
			{
				/*do remap multi core application*/
			}
			else
			{
				/*trigger MCU reset*/
			}
		}
	}
}

/*FUNCTION**********************************************************************
 *
 * Function Name : Boot_JumpToApp
 * Description   : 该功能可跳转至应用。
 *
 * Implements : 
 *END**************************************************************************/
 typedef void (*AppAddr)(void);
AppAddr JumpAppAddr = NULL;
volatile uint32 gBootDbg_AppMsp = 0u;
volatile uint32 gBootDbg_AppResetVector = 0u;
volatile uint32 gBootDbg_JumpAddr = 0u;
void Boot_JumpToApp(const uint32 i_AppAddr)
{
	/* 提取 APP 的初始堆栈指针（MSP），它永远存放在向量表的第 1 个字（4字节）*/
	uint32_t app_msp = *((volatile uint32_t *)APP_VECTOR_TABLE_ADDR);
	uint32_t app_reset_vector = *((volatile uint32_t *)(APP_VECTOR_TABLE_ADDR + 4u));
	uint32 nvicIndex = 0u;

	gBootDbg_AppMsp = (uint32)app_msp;
	gBootDbg_AppResetVector = (uint32)app_reset_vector;
	gBootDbg_JumpAddr = (uint32)i_AppAddr;

	/* 关闭所有全局中断，防止在交接过程中发生异常 */
	DisableAllInterrupts();

	S32_SysTick->CSR = 0u;
	S32_SysTick->RVR = 0u;
	S32_SysTick->CVR = 0u;

	for(nvicIndex = 0u; nvicIndex < S32_NVIC_ICER_COUNT; nvicIndex++)
	{
		S32_NVIC->ICER[nvicIndex] = 0xFFFFFFFFu;
		S32_NVIC->ICPR[nvicIndex] = 0xFFFFFFFFu;
	}

	/* 将向量表偏移寄存器 (VTOR) 指向 APP 的基址 */
	S32_SCB->VTOR = APP_VECTOR_TABLE_ADDR;

	/* 设置主堆栈指针 (MSP) */

	__asm volatile ("msr msp, %0" : : "r"(app_msp));

	/* 执行真正的跳转（i_AppAddr 是从 fls_app.c 传进来的复位函数指针） */
	AppAddr resetHandle = (AppAddr)(i_AppAddr);

	(resetHandle)();

#if 0
	/*example for CodeWarroir -- MagniV*/
	AppAddr appAddr;
		
	__asm{
		LD D6, i_AppAddr
		TFR D6, X
		ST X, appAddr
		JSR [appAddr]
	}
#endif
}

/*Is information valid?*/
static boolean Boot_IsInfoValid(void)
{
	uint16 infoCrc = 0u;
	uint16 storageCrc = 0u;
	boolean result = FALSE;
	
	infoCrc = Boot_CalculateInfoCRC();

	storageCrc = GetInfoStorageCRC();

	if(storageCrc == infoCrc)
	{
		result = TRUE;
	}

	return result;
}

/*calculate information CRC*/
static uint16 Boot_CalculateInfoCRC(void)
{
	uint32 infoCrc = 0u;

	CRC_HAL_CalculateCRCOnce((const uint8 *)gs_stBootInfo.infoStartAddr, gs_stBootInfo.infoDataLen - 2u, &infoCrc);

	return (uint16)infoCrc;
}


/******************************************************************************
 * EOF
 *****************************************************************************/
