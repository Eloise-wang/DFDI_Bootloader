/*
 * time_hal.c
 *
 *  Created on: 2026年4月14日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 定时器模块】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */
#include "timer_hal.h"
/*******************************************************************************
 * Variables
 ******************************************************************************/
static uint16 gs_1msCnt = 0u;
static uint16 gs_100msCnt = 0u;

static void LPTimerISR(void)
{
	LPTMR_DRV_ClearCompareFlag(INST_LPTMR_1);

	TIMER_HAL_1msPeriod();
}

/*FUNCTION**********************************************************************
 *
 * han'shu'ming'cheng : TIMER_HAL_Init
 * Description   : 该函数用于初始化此模块
 *
 * Implements : TIMER_HAL_Init_Activity
 *END**************************************************************************/
void TIMER_HAL_Init(void)
{
	LPTMR_DRV_Init(INST_LPTMR_1, &lptmr_1_config0, false);

	//添加句柄
	INT_SYS_InstallHandler(LPTMR0_IRQn, &LPTimerISR, (isr_t *)0);

	//使能中断
	INT_SYS_EnableIRQ(LPTMR0_IRQn);

	//启动LPTMR计数器
	LPTMR_DRV_StartCounter(INST_LPTMR_1);
}

//调用1毫秒周期定时器
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
 * Description   : 该函数用来核查是否超时，超时返回true，否则返回false
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
 * Function Name : TIMER_HAL_Is100msTickTimeout
 * Description   : 该函数用来核查是否超时，超时返回true，否则返回false
 *
 * Implements : Is100msTickTimeout_Activity
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

/*  获取定时器计数值以用作随机数种子*/
uint32 TIMER_HAL_GetTimerTickCnt(void)
{
	/*This two variables not init before used, because it used for generate random*/
	uint32 hardwareTimerTickCnt;
	uint32 timerTickCnt;
	
#if 0
	/*For S32K1xx get timer counter(LPTIMER), get timer count will trigger the period incorrect.*/
	hardwareTimerTickCnt = LPTMR_DRV_GetCounterValueByCount(INST_LPTMR1);
#endif

	timerTickCnt = ((hardwareTimerTickCnt & 0xFFFFu) ) | (timerTickCnt << 16u);

	return timerTickCnt;
}


/*FUNCTION**********************************************************************
 *
 * Function Name : TIMER_HAL_Deinit
 * Description   : 去初始化
 *
 * Implements : TIMER_HAL_Deinit_Activity
 *END**************************************************************************/
void TIMER_HAL_Deinit(void)
{

}
