/*
 * bsp_UDS_algorithm.c
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 UDS算法模块 - 兼容S32K142代码风格】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 */

#include "bsp_UDS_algorithm.h"
#include "bsp_AES.h"
#include "bsp_timer.h"
#include <stddef.h>

/* ============================================  默认密钥  ============================================ */
const uint8_t g_udsDefaultKey[BSP_UDS_ALG_KEY_LEN] = {
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F
};

/* ============================================  内部变量  ============================================ */

/*!< 软件定时器节拍计数 */
static uint32_t g_udsSWTimerTickCnt = 0U;

/* ============================================  内部函数 ============================================ */

/*!
 * @brief 生成伪随机数（简单线性同余生成器）
 *
 * @param seed 种子值
 * @return 伪随机数
 */
static uint32_t simpleRand(uint32_t seed)
{
    /* 简单伪随机数生成 - 线性同余法 */
    return (seed * 1103515245U + 12345U) & 0x7FFFFFFFU;
}

/* ============================================  API实现  ============================================ */

void BSP_UDS_ALG_Init(void)
{
    g_udsSWTimerTickCnt = 0U;
}

bool BSP_UDS_ALG_Encrypt(const uint8_t *pPlainText, uint32_t dataLen, uint8_t *pCipherText)
{
    bool ret = false;

    if ((0 == pPlainText) || (0 == pCipherText) || (0U == dataLen))
    {
        return false;
    }

    /* 数据长度必须是16的倍数 */
    if (dataLen % 16U != 0U)
    {
        return false;
    }

    BSP_AES_Encrypt((int8_t *)pPlainText, (int32_t)dataLen, 
                     (int8_t *)&g_udsDefaultKey[0], (int8_t *)pCipherText);
    
    ret = true;
    return ret;
}

bool BSP_UDS_ALG_Decrypt(const uint8_t *pCipherText, uint32_t dataLen, uint8_t *pPlainText)
{
    bool ret = false;

    if ((0 == pCipherText) || (0 == pPlainText) || (0U == dataLen))
    {
        return false;
    }

    /* 数据长度必须是16的倍数 */
    if (dataLen % 16U != 0U)
    {
        return false;
    }

    BSP_AES_Decrypt((int8_t *)pCipherText, (int32_t)dataLen,
                     (int8_t *)&g_udsDefaultKey[0], (int8_t *)pPlainText);
    
    ret = true;
    return ret;
}

bool BSP_UDS_ALG_GetRandom(uint32_t needRandomDataLen, uint8_t *pRandomDataBuf)
{
    bool ret = true;
    uint32_t index;
    uint8_t *pRandomTmp = 0;
    uint32_t random;
    uint32_t timerTick;

    if ((0U == needRandomDataLen) || (0 == pRandomDataBuf))
    {
        ret = false;
        return ret;
    }

    /* 获取定时器节拍作为随机种子 */
    timerTick = BSP_Timer_GetTick();
    random = timerTick ^ (g_udsSWTimerTickCnt << 16U);

    /* 使用简单伪随机数生成器 */
    random = simpleRand(random);

    pRandomTmp = (uint8_t *)&random;

    for (index = 0U; index < needRandomDataLen; index++)
    {
        if ((index & 0x03U) == 0x03U)
        {
            /* 每4字节更新一次随机数 */
            random = simpleRand(random);
        }

        pRandomDataBuf[index] = pRandomTmp[index & 0x03U];
    }

    return ret;
}

void BSP_UDS_ALG_AddSWTimerTick(void)
{
    g_udsSWTimerTickCnt++;
}

void BSP_UDS_ALG_Deinit(void)
{
    g_udsSWTimerTickCnt = 0U;
}
