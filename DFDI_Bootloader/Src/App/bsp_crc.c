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
 *              4. CRC算法: CRC-16/DNP (Poly=0x3D65, RefIn=true, RefOut=true, XorOut=0xFFFF)
 */

#include "bsp_crc.h"

/* ============================================  全局变量  ============================================ */

/*!< CRC初始化标志 */
static bool g_bCrcInit = false;

/*!< CRC配置结构 */
static crc_user_config_t g_crcConfig;

/*!< 当前CRC实例的CRC值 */
static uint16_t g_curCrc = 0U;

/* ============================================  内部函数  ============================================ */

/*!
 * @brief 配置CRC为CRC-16/DNP模式
 *
 * @return none
 */
static void CRC_ConfigureDnp(void)
{
    /* 获取默认配置 */
    CRC_DRV_GetDefaultConfig(&g_crcConfig);

    /* CRC-16/DNP配置:
     * Poly: 0x3D65
     * Seed: 0xFFFF
     * RefIn: true (字节和位反转)
     * RefOut: true
     * XorOut: 0xFFFF
     */
    g_crcConfig.crcProtocolType = CRC_PROTOCOL_16BIT;
    g_crcConfig.poly = 0x3D65U;                      /* CRC-16/DNP 多项式 */
    g_crcConfig.seed = BSP_CRC_SEED_INIT_VALUE;      /* 初始值 */
    g_crcConfig.writeTransposeType = CRC_TRANSPOSE_BITS_BYTES;  /* 写数据时位和字节都反转 */
    g_crcConfig.readTransposeType = CRC_TRANSPOSE_BITS_BYTES;  /* 读结果时位和字节都反转 */
    g_crcConfig.finalXOR = true;                      /* 结果异或0xFFFF */
    g_crcConfig.writeBytesNumOnce = CRC_WRITE_1_BYTE_ONCE;
}

/* ============================================  API实现  ============================================ */

bool BSP_CRC_Init(void)
{
    /* 配置CRC为DNP模式 */
    CRC_ConfigureDnp();

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

bool BSP_CRC_Calculate(const uint8_t *pDataBuf, uint32_t dataLen, uint16_t *pCrc)
{
    if (!g_bCrcInit || (NULL == pDataBuf) || (NULL == pCrc))
    {
        return false;
    }

    /* 写入数据计算CRC */
    CRC_DRV_WriteData(CRC_INST, pDataBuf, dataLen);

    /* 获取CRC结果（低16位） */
    uint32_t result = CRC_DRV_GetCrcResult(CRC_INST);
    *pCrc = (uint16_t)(result & 0xFFFFU);

    return true;
}

bool BSP_CRC_CalculateOnce(const uint8_t *pDataBuf, uint32_t dataLen, uint16_t *pCrc)
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

bool BSP_CRC_Start(uint16_t *pCrc)
{
    if (!g_bCrcInit || (NULL == pCrc))
    {
        return false;
    }

    /* 重新初始化CRC（设置种子） */
    CRC_ConfigureDnp();
    CRC_DRV_Init(CRC_INST, &g_crcConfig);

    g_curCrc = BSP_CRC_SEED_INIT_VALUE;
    *pCrc = g_curCrc;

    return true;
}

bool BSP_CRC_Append(const uint8_t *pDataBuf, uint32_t dataLen, uint16_t *pCrc)
{
    if (!g_bCrcInit || (NULL == pDataBuf) || (NULL == pCrc))
    {
        return false;
    }

    /* 写入数据 */
    CRC_DRV_WriteData(CRC_INST, pDataBuf, dataLen);

    /* 更新当前CRC值 */
    uint32_t result = CRC_DRV_GetCrcResult(CRC_INST);
    g_curCrc = (uint16_t)(result & 0xFFFFU);
    *pCrc = g_curCrc;

    return true;
}

bool BSP_CRC_End(uint16_t *pCrc)
{
    if (!g_bCrcInit || (NULL == pCrc))
    {
        return false;
    }

    /* CRC-16/DNP 需要对结果取反（在配置中已设置finalXOR=true） */
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
