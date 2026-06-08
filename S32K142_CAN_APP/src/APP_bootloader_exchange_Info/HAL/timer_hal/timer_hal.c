/*
 * timer_hal.c
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */
#include "timer_hal.h"

/*******************************************************************************
 * User Include
 ******************************************************************************/

/*******************************************************************************
 * Variables
 ******************************************************************************/
static uint16 gs_1msCnt = 0u;
static uint16 gs_100msCnt = 0u;

void LPTmr_ISR(void)
{
	LPTMR_DRV_ClearCompareFlag(INST_LPTMR_1);
	TIMER_HAL_1msPeriod();
}

/*FUNCTION**********************************************************************
 *
 * Function Name : TIMER_HAL_Init
 * Description   : This function initial this module.
 *
 * Implements : TIMER_HAL_Init_Activity
 *END**************************************************************************/
void TIMER_HAL_Init(void)
{
	/*Notes:必须先开单个中断再开总中断*/
	LPTMR_DRV_Init(INST_LPTMR_1, &lpTmr1_config0, false);

	//中断注册函数：中断号（告诉CPU中断来了执行谁）
	INT_SYS_InstallHandler(LPTMR0_IRQn, &LPTmr_ISR, NULL_PTR);

	//打开单个中断：外设级（允许这个中断发出请求）
	INT_SYS_EnableIRQ(LPTMR0_IRQn);

	//打开所有终端：CPU全局级别（允许CPU响应所有中断）
	INT_SYS_EnableIRQGlobal();

	LPTMR_DRV_StartCounter(INST_LPTMR_1);
}

/*Timer 1ms period called*/
void TIMER_HAL_1msPeriod(void)
{
    uint16 cntTmp = 0u;

    /*Just for check time overflow or not?*/
    cntTmp = gs_1msCnt + 1u;
    if(0u != cntTmp)
    {
        gs_1msCnt++;
    }

    cntTmp = gs_100msCnt + 1u;
    if(0u != cntTmp)
    {
        gs_100msCnt++;
    }
}

/*FUNCTION**********************************************************************
 *
 * Function Name : TIMER_HAL_Is1msTickTimeout
 * Description   : This function is check timeout. If timeout return TRUE, else return FALSE.
 *
 * Implements : Is1msTickTimeout_Activity
 *END**************************************************************************/
boolean  TIMER_HAL_Is1msTickTimeout(void)
{
    boolean result = FALSE;

    if(gs_1msCnt)
    {
        result = TRUE;

        gs_1msCnt--;
    }

    return result;
}

/*FUNCTION**********************************************************************
 *
 * Function Name : TIMER_HAL_Is10msTickTimeout
 * Description   : This function is check timeout or not. If timeout return TRUE, else return FALSE.
 *
 * Implements : Is10msTickTimeout_Activity
 *END**************************************************************************/

boolean TIMER_HAL_Is100msTickTimeout(void)
{
    boolean result = FALSE;

    if(gs_100msCnt >= 100u)
    {
        result = TRUE;

        gs_100msCnt -= 100u;
    }

    return result;
}

/*get timer tick cnt for random seed.*/
uint32 TIMER_HAL_GetTimerTickCnt(void)
{
	/*This two variables not init before used, because it used for generate random*/
	uint32 hardwareTimerTickCnt;
	uint32 timerTickCnt;
	
#if 0
	/*For S32K1xx get timer counter(LPTIMER), get timer count will trigger the period incorrect.*/
	hardwareTimerTickCnt = LPTMR_DRV_GetCounterValueByCount(INST_LPTMR_1);
#endif

	timerTickCnt = ((hardwareTimerTickCnt & 0xFFFFu)) | (timerTickCnt << 16u);


	return timerTickCnt;
}


/*FUNCTION**********************************************************************
 *
 * Function Name : TIMER_HAL_Deinit
 * Description   : This function initial this module.
 *
 * Implements : TIMER_HAL_Deinit_Activity
 *END**************************************************************************/
void TIMER_HAL_Deinit(void)
{


}
/******************************************************************************
 * EOF
 *****************************************************************************/
