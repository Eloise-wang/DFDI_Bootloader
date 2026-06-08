/*
 * bsp_crc.c
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 CRC校验BSP实现 - 兼容S32K142代码风格】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 *              4. CRC算法: CRC-32 (与S32K142保持一致)
 */

#include "bsp_crc.h"

/* ============================================  全局变量  ============================================ */

/*!< CRC初始化标志 */
static bool g_bCrcInit = false;

/*!< CRC配置结构 */
static crc_user_config_t g_crcConfig;

/*!< 当前CRC实例的CRC值 */
static uint32_t g_curCrc = 0U;

/* ============================================  内部函数  ============================================ */

/*!
 * @brief 配置CRC为CRC-32模式
 *
 * @return none
 */
static void CRC_Configure32(void)
{
    /* 获取默认配置 */
    CRC_DRV_GetDefaultConfig(&g_crcConfig);

    /* CRC-32配置:
     * Poly: 0x04C11DB7 (标准CRC-32)
     * Seed: 0xFFFFFFFF
     * RefIn: false
     * RefOut: false
     * XorOut: 0xFFFFFFFF
     */
    g_crcConfig.crcProtocolType = CRC_PROTOCOL_32BIT;
    g_crcConfig.poly = 0x04C11DB7U;              /* CRC-32 多项式 */
    g_crcConfig.seed = BSP_CRC_SEED_INIT_VALUE;      /* 初始值 0xFFFFFFFF */
    g_crcConfig.writeTransposeType = CRC_TRANSPOSE_NONE;
    g_crcConfig.readTransposeType = CRC_TRANSPOSE_NONE;
    g_crcConfig.finalXOR = true;                      /* 结果异或0xFFFFFFFF */
    g_crcConfig.writeBytesNumOnce = CRC_WRITE_4_BYTE_ONCE;
}

/* ============================================  API实现  ============================================ */

bool BSP_CRC_Init(void)
{
    /* 配置CRC为32模式 */
    CRC_Configure32();

    /* 初始化CRC硬件 */
    status_t status = CRC_DRV_Init(CRC_INST, &g_crcConfig);
    if (STATUS_SUCCESS == status)
    {
        g_bCrcInit = true;
        g_curCrc = BSP_CRC_SEED_INIT_VALUE;
        return true;
    }

    return false;
}

bool BSP_CRC_Calculate(const uint8_t *pDataBuf, uint32_t dataLen, uint32_t *pCrc)
{
    if (!g_bCrcInit || (NULL == pDataBuf) || (NULL == pCrc))
    {
        return false;
    }

    /* 写入数据计算CRC */
    CRC_DRV_WriteData(CRC_INST, pDataBuf, dataLen);

    /* 获取CRC结果 */
    *pCrc = CRC_DRV_GetCrcResult(CRC_INST);

    return true;
}

bool BSP_CRC_CalculateOnce(const uint8_t *pDataBuf, uint32_t dataLen, uint32_t *pCrc)
{
    if (!BSP_CRC_Start(pCrc))
    {
        return false;
    }

    if (!BSP_CRC_Append(pDataBuf, dataLen, pCrc))
    {
        return false;
    }

    if (!BSP_CRC_End(pCrc))
    {
        return false;
    }

    return true;
}

bool BSP_CRC_Start(uint32_t *pCrc)
{
    if (!g_bCrcInit || (NULL == pCrc))
    {
        return false;
    }

    /* 重新初始化CRC（设置种子） */
    CRC_Configure32();
    CRC_DRV_Init(CRC_INST, &g_crcConfig);

    g_curCrc = BSP_CRC_SEED_INIT_VALUE;
    *pCrc = g_curCrc;

    return true;
}

bool BSP_CRC_Append(const uint8_t *pDataBuf, uint32_t dataLen, uint32_t *pCrc)
{
    if (!g_bCrcInit || (NULL == pDataBuf) || (NULL == pCrc))
    {
        return false;
    }

    /* 写入数据 */
    CRC_DRV_WriteData(CRC_INST, pDataBuf, dataLen);

    /* 更新当前CRC值 */
    g_curCrc = CRC_DRV_GetCrcResult(CRC_INST);
    *pCrc = g_curCrc;

    return true;
}

bool BSP_CRC_End(uint32_t *pCrc)
{
    if (!g_bCrcInit || (NULL == pCrc))
    {
        return false;
    }

    /* CRC-32 最终异或已在硬件配置中完成 */
    *pCrc = g_curCrc;

    return true;
}

bool BSP_CRC_Deinit(void)
{
    if (!g_bCrcInit)
    {
        return true;
    }

    status_t status = CRC_DRV_Deinit(CRC_INST);
    if (STATUS_SUCCESS == status)
    {
        g_bCrcInit = false;
        return true;
    }

    return false;
}
