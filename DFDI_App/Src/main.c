/*
 * main.c
 *
 *  Created on: 2026年6月8日
 *      Author: Eloise
 *     Project: DFDI_App
 *       Brief: 【 AC7840 APP 主程序入口 - 参考S32K142实现】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 */

#include "includes.h"
#include "APP_Demo.h"
#include "boot_cfg.h"

volatile int exit_code = 0;

/*******************************************************************************
 * Function: HardFault_Handler
 * Description: 硬件错误中断处理函数
 ******************************************************************************/
void HardFault_Handler(void)
{
    /* 捕获硬件错误，死循环等待调试 */
    while(1)
    {
        /* 可在此处添加错误处理或看门狗复位 */
    }
}

/*******************************************************************************
 * Function: main
 * Description: 应用主入口
 ******************************************************************************/
int main(void)
{
    /* 初始化 APP Demo */
    APP_Demo_Init();

    /* 主循环 */
    for(;;)
    {
        APP_Demo_MainFun();

        if(exit_code != 0)
        {
            break;
        }
    }

    return exit_code;
}

/*******************************************************************************
 * EOF
 ******************************************************************************/
