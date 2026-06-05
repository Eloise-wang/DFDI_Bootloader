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

#include "boot_cfg.h"
#include "unifiedStack_fls_app.h"
#include "bsp_crc.h"
#include "wdg_drv.h"

typedef struct
{
    uint8 infoDataLen;
    uint8 requestEnterBootloader;
    uint8 downloadAPPSuccessful;
    uint32 infoStartAddr;
    uint32 requestEnterBootloaderAddr;
    uint32 downloadAppSuccessfulAddr;
} tBootInfo;

static const tBootInfo gs_stBootInfo = {
    16u,
    0x5Au,
    0xA5u,
    0x20002FF0u,
    0x20002FF1u,
    0x20002FF0u,
};

#define GetInfoStorageCRC() (*(uint16 *)(gs_stBootInfo.infoStartAddr + 14u))
#define SetInforCRC(xCrc) ((*(uint16 *)(gs_stBootInfo.infoStartAddr + 14u)) = (uint16)(xCrc))
#define APP_VECTOR_TABLE_ADDR (0x0000F200u)

static boolean Boot_IsInfoValid(void);
static uint16 Boot_CalculateInfoCRC(void);

void Boot_SetDownloadAppSuccessful(void)
{
    uint16 infoCrc = 0u;

    *((uint8 *)gs_stBootInfo.downloadAppSuccessfulAddr) = gs_stBootInfo.downloadAPPSuccessful;

    infoCrc = Boot_CalculateInfoCRC();
    SetInforCRC(infoCrc);
}

boolean Boot_IsRequestEnterBootloader(void)
{
    boolean result = FALSE;

    if (TRUE == Boot_IsInfoValid())
    {
        if (gs_stBootInfo.requestEnterBootloader == *((uint8 *)gs_stBootInfo.requestEnterBootloaderAddr))
        {
            result = TRUE;
        }
    }

    return result;
}

void Boot_ClearRequestEnterBootloaderFlag(void)
{
    uint16 infoCrc = 0u;

    *((uint8 *)gs_stBootInfo.requestEnterBootloaderAddr) = 0u;

    infoCrc = Boot_CalculateInfoCRC();
    SetInforCRC(infoCrc);
}

boolean Boot_IsPowerOnTriggerReset(void)
{
    return FALSE;
}

void Boot_PowerONClearAllFlag(void)
{
    uint16 infoCrc = 0u;
    uint8 index = 0u;

    for (index = 0u; index < (gs_stBootInfo.infoDataLen >> 2u); index++)
    {
        *(((uint32 *)gs_stBootInfo.infoStartAddr) + index) = 0u;
    }

    infoCrc = Boot_CalculateInfoCRC();
    SetInforCRC(infoCrc);
}

void Boot_RemapApplication(void)
{
    uint32 totalCoreNo = 0u;
    uint32 index = 0u;
    tAPPType appType = APP_A_TYPE;
    uint32 appMirrorAddr = 0u;
    uint32 appRemapAddr = 0u;

    totalCoreNo = 0u;
    (void)index;
    (void)appMirrorAddr;
    (void)appRemapAddr;

    if (totalCoreNo > 0u)
    {
        appType = Flash_GetNewestAPPType();
        (void)appType;
    }
}

typedef void (*AppAddr)(void);
AppAddr JumpAppAddr = NULL;
volatile uint32 gBootDbg_AppMsp = 0u;
volatile uint32 gBootDbg_AppResetVector = 0u;
volatile uint32 gBootDbg_JumpAddr = 0u;

void Boot_JumpToApp(const uint32 i_AppAddr)
{
    uint32 app_msp = *((volatile uint32 *)APP_VECTOR_TABLE_ADDR);
    uint32 app_reset_vector = *((volatile uint32 *)(APP_VECTOR_TABLE_ADDR + 4u));
    uint32 nvicIndex = 0u;
    AppAddr resetHandle = NULL;

    gBootDbg_AppMsp = app_msp;
    gBootDbg_AppResetVector = app_reset_vector;
    gBootDbg_JumpAddr = i_AppAddr;

    DisableAllInterrupts();

    SysTick->CTRL = 0u;
    SysTick->LOAD = 0u;
    SysTick->VAL = 0u;

    for (nvicIndex = 0u; nvicIndex < 8u; nvicIndex++)
    {
        NVIC->ICER[nvicIndex] = 0xFFFFFFFFu;
        NVIC->ICPR[nvicIndex] = 0xFFFFFFFFu;
    }

    SCB->VTOR = APP_VECTOR_TABLE_ADDR;

    __set_MSP(app_msp);

    resetHandle = (AppAddr)i_AppAddr;
    JumpAppAddr = resetHandle;
    resetHandle();
}

static boolean Boot_IsInfoValid(void)
{
    uint16 infoCrc = 0u;
    uint16 storageCrc = 0u;
    boolean result = FALSE;

    infoCrc = Boot_CalculateInfoCRC();
    storageCrc = GetInfoStorageCRC();

    if (storageCrc == infoCrc)
    {
        result = TRUE;
    }

    return result;
}

static uint16 Boot_CalculateInfoCRC(void)
{
    uint16 infoCrc = 0u;

    (void)BSP_CRC_CalculateOnce((const uint8 *)gs_stBootInfo.infoStartAddr, gs_stBootInfo.infoDataLen - 2u, &infoCrc);

    return infoCrc;
}
