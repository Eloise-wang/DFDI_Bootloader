/*
 * boot.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include "boot.h"

#include "includes.h"
#include "unifiedStack_fls_app.h"
#include "unifiedStack_uds_app.h"
#include "bsp_watchdog.h"

static boolean Boot_IsAPPValid(void)
{
    boolean bResult = FALSE;

    bResult = Flash_IsReadAppInfoFromFlashValid();

    if (TRUE == bResult)
    {
        bResult = Flash_IsAppInFlashValid();
    }

    return bResult;
}

void Boot_JumpToAppOrNot(void)
{
    uint32 resetHandlerAddr = 0u;

    if ((TRUE == Boot_IsAPPValid()) &&
        (TRUE != Boot_IsRequestEnterBootloader()) &&
        (TRUE != Boot_IsStayInBootloader()))
    {
        Boot_RemapApplication();

        resetHandlerAddr = Flash_GetResetHandlerAddr();

        (void)WDG_DRV_Deinit(WDG_INST);
        WDG_DRV_Trigger(WDG_INST);

        Boot_JumpToApp(resetHandlerAddr);
    }
}

/*request bootloader mode check*/
boolean Boot_CheckReqBootloaderMode(void)
{
    boolean ret = FALSE;

    if (TRUE == Boot_IsRequestEnterBootloader())
    {
        Boot_ClearRequestEnterBootloaderFlag();
        Boot_SetStayInBootloaderFlag();

        if (TRUE == UDS_TxMsgToHost())
        {
            ret = TRUE;
            APP_DebugPrintf("\n Enter bootloader mode\n");
        }
        else
        {
            APP_DebugPrintf("\n Enter bootloader mode and transmit confirm message failed!\n");
        }
    }

    return ret;
}
