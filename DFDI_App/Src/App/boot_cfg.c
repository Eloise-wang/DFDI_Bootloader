/*
 * boot_cfg.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */


/*******************************************************************************
 * User Include
 ******************************************************************************/
#include "boot_cfg.h"

#include "bsp_crc.h"

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
	0x5Au,
	0xA5u,
	0x20002FF0u,
	0x20002FF1u,
	0x20002FF0u,
};

/*get information storage CRC*/
#define GetInfoStorageCRC() (*(uint16 *)(gs_stBootInfo.infoStartAddr + 14))

/*set information CRC */
#define SetInforCRC(xCrc) ((*(uint16 *)(gs_stBootInfo.infoStartAddr + 14)) = (uint16)(xCrc))

/*Is information valid?*/
static boolean Boot_IsInfoValid(void);

/*calculate information CRC*/
static uint32 Boot_CalculateInfoCRC(void);

/*set download app successful */
void SetDownloadAppSuccessful(void)
{
	uint32 infoCrc = 0u;

	*((uint8 *)gs_stBootInfo.downloadAppSuccessfulAddr) = gs_stBootInfo.downloadAPPSuccessful;

	infoCrc = Boot_CalculateInfoCRC();
	SetInforCRC(infoCrc);
}

/*Is request enter bootloader?*/
void Boot_RequestEnterBootloader(void)
{
	uint32 infoCrc = 0u;

	*((uint8 *)gs_stBootInfo.requestEnterBootloaderAddr) = gs_stBootInfo.requestEnterBootloader;

	infoCrc = Boot_CalculateInfoCRC();
	SetInforCRC(infoCrc);
}

/*Is download APP successful?*/
boolean Boot_IsDownloadAPPSccessful(void)
{
	boolean result = FALSE;

	if(TRUE == Boot_IsInfoValid())
	{
		if(gs_stBootInfo.downloadAPPSuccessful == *((uint8 *)gs_stBootInfo.downloadAppSuccessfulAddr))
		{
			result = TRUE;
		}
	}

	return result;
}

/*clear download APP successful flag*/
void ClearDownloadAPPSuccessfulFlag(void)
{
	uint32 infoCrc = 0u;

	*((uint8 *)gs_stBootInfo.downloadAppSuccessfulAddr) = 0u;

	infoCrc = Boot_CalculateInfoCRC();
	SetInforCRC(infoCrc);
}

/*Is information valid?*/
static boolean Boot_IsInfoValid(void)
{
	uint32 infoCrc = 0u;
	uint16 storageCrc = 0u;
	boolean result = FALSE;

	infoCrc = Boot_CalculateInfoCRC();

	storageCrc = GetInfoStorageCRC();

	if((uint16)infoCrc == storageCrc)
	{
		result = TRUE;
	}

	return result;
}

/*calculate information CRC*/
static uint32 Boot_CalculateInfoCRC(void)
{
	uint32 infoCrc = 0u;

	BSP_CRC_CalculateOnce((const uint8 *)gs_stBootInfo.infoStartAddr, gs_stBootInfo.infoDataLen - 2u, &infoCrc);

	return infoCrc;
}


/******************************************************************************
 * EOF
 *****************************************************************************/
