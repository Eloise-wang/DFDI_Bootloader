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
#include "bsp_flash.h"
#include "bsp_crc.h"
#include "wdg_drv.h"

typedef struct
{
    uint8 infoDataLen;
    uint8 requestEnterBootloader;
    uint8 downloadAPPSuccessful;
    uint8 stayInBootloader;
    uint32 infoStartAddr;
    uint32 requestEnterBootloaderAddr;
    uint32 downloadAppSuccessfulAddr;
    uint32 stayInBootloaderAddr;
} tBootInfo;

static const tBootInfo gs_stBootInfo = {
    16u,
    0x5Au,
    0xA5u,
    0xC3u,
    0x20002FF0u,
    0x20002FF1u,
    0x20002FF0u,
    0x20002FF2u,
};

#define GetInfoStorageCRC() (*(uint16 *)(gs_stBootInfo.infoStartAddr + 14u))
#define SetInforCRC(xCrc) ((*(uint16 *)(gs_stBootInfo.infoStartAddr + 14u)) = (uint16)(xCrc))

/* 根据槽位获取向量表地址（VTOR = 槽位起始地址） */
static uint32 Boot_GetVectorTableAddr(tAPPType appType)
{
    uint32 addr = 0u;
    switch (appType)
    {
        case APP_A_TYPE:
            addr = APP_A_VTOR_ADDR;
            break;
#ifdef EN_SUPPORT_APP_B
        case APP_B_TYPE:
            addr = APP_B_VTOR_ADDR;
            break;
#endif
        default:
            break;
    }
    return addr;
}

/* 根据跳转地址推导出槽位类型 */
static tAPPType Boot_GetAppTypeFromAddr(uint32 jumpAddr)
{
    tAPPType appType = APP_A_TYPE;
    if ((jumpAddr >= APP_B_START_ADDR) && (jumpAddr <= APP_B_END_ADDR))
    {
        appType = APP_B_TYPE;
    }
    return appType;
}

static boolean Boot_IsInfoValid(void);
static uint32 Boot_CalculateInfoCRC(void);

void Boot_SetDownloadAppSuccessful(void)
{
    uint32 infoCrc = 0u;

    *((uint8 *)gs_stBootInfo.downloadAppSuccessfulAddr) = gs_stBootInfo.downloadAPPSuccessful;
    *((uint8 *)gs_stBootInfo.stayInBootloaderAddr) = 0u;

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
    uint32 infoCrc = 0u;

    *((uint8 *)gs_stBootInfo.requestEnterBootloaderAddr) = 0u;

    infoCrc = Boot_CalculateInfoCRC();
    SetInforCRC(infoCrc);
}

void Boot_SetStayInBootloaderFlag(void)
{
    uint32 infoCrc = 0u;

    *((uint8 *)gs_stBootInfo.stayInBootloaderAddr) = gs_stBootInfo.stayInBootloader;

    infoCrc = Boot_CalculateInfoCRC();
    SetInforCRC(infoCrc);
}

void Boot_ClearStayInBootloaderFlag(void)
{
    uint32 infoCrc = 0u;

    *((uint8 *)gs_stBootInfo.stayInBootloaderAddr) = 0u;

    infoCrc = Boot_CalculateInfoCRC();
    SetInforCRC(infoCrc);
}

boolean Boot_IsStayInBootloader(void)
{
    boolean result = FALSE;

    if (TRUE == Boot_IsInfoValid())
    {
        if (gs_stBootInfo.stayInBootloader == *((uint8 *)gs_stBootInfo.stayInBootloaderAddr))
        {
            result = TRUE;
        }
    }

    return result;
}

boolean Boot_IsPowerOnTriggerReset(void)
{
    return FALSE;
}

void Boot_PowerONClearAllFlag(void)
{
    uint32 infoCrc = 0u;
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
    tAPPType appType = APP_A_TYPE;

    /* 始终获取最新有效APP（A/B 中选择） */
    appType = Flash_GetNewestAPPType();
    (void)appType;
}

typedef void (*AppAddr)(void);
AppAddr JumpAppAddr = NULL;
volatile uint32 gBootDbg_AppMsp = 0u;
volatile uint32 gBootDbg_AppResetVector = 0u;
volatile uint32 gBootDbg_JumpAddr = 0u;

void Boot_JumpToApp(const uint32 i_AppAddr)
{
    tAPPType appType = Boot_GetAppTypeFromAddr(i_AppAddr);
    uint32 vectorTableAddr = Boot_GetVectorTableAddr(appType);

    uint32 app_msp = *((volatile uint32 *)vectorTableAddr);
    uint32 app_reset_vector = *((volatile uint32 *)(vectorTableAddr + 4u));
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

    SCB->VTOR = vectorTableAddr;

    __set_MSP(app_msp);

    resetHandle = (AppAddr)i_AppAddr;
    JumpAppAddr = resetHandle;
    resetHandle();
}

static boolean Boot_IsInfoValid(void)
{
    uint32 infoCrc = 0u;
    uint16 storageCrc = 0u;
    boolean result = FALSE;

    infoCrc = Boot_CalculateInfoCRC();
    storageCrc = GetInfoStorageCRC();

    if ((uint16)infoCrc == storageCrc)
    {
        result = TRUE;
    }

    return result;
}

static uint32 Boot_CalculateInfoCRC(void)
{
    uint32 infoCrc = 0u;

    (void)BSP_CRC_CalculateOnce((const uint8 *)gs_stBootInfo.infoStartAddr, gs_stBootInfo.infoDataLen - 2u, &infoCrc);

    return infoCrc;
}
