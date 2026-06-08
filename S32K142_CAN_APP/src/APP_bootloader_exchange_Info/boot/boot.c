/*
 * boot.c
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include "boot.h"
#include "UDS_app.h"

/*******************************************************************************
 * User Include
 ******************************************************************************/
#include "includes.h"

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
			APPDebugPrintf("\n Downlaod APP successful!\n");
		}
		else
		{
			APPDebugPrintf("\n Enter APP mode and transmit confirm message failed!\n");
		}
	}

	return ret;
}


/******************************************************************************
 * EOF
 *****************************************************************************/
