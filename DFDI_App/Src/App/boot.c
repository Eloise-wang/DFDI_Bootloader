/*
 * boot.c
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 */

/*******************************************************************************
 * User Include
 ******************************************************************************/
#include "includes.h"
#include "boot.h"
#include "unifiedStack_uds_app.h"

/*******************************************************************************
 * Variables
 ******************************************************************************/

/*download APP successful mode check*/
boolean Boot_CheckDownlaodAPPStatus(void)
{
	boolean ret = FALSE;

	if(TRUE == Boot_IsDownloadAPPSccessful())
	{
		ClearDownloadAPPSuccessfulFlag();

		/*write a message to host based on TP*/
		if(TRUE == UDS_TxMsgToHost())
		{
			ret = TRUE;
			Debug_Printf("\n Downlaod APP successful!\n");
		}
		else
		{
			Debug_Printf("\n Enter APP mode and transmit confirm message failed!\n");
		}
	}

	return ret;
}


/******************************************************************************
 * EOF
 *****************************************************************************/
