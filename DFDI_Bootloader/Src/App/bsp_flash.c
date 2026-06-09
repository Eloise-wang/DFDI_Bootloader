/*
 * bsp_flash.c
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 AC7840 Flash适配层实现 - A/B双镜像支持】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 */

#include "bsp_flash.h"
#include "device_status.h"

/*******************************************************************************
 * 内部变量
 ******************************************************************************/
static flash_config_t g_flashConfig;
static int g_bFlashInit = 0;

    /* APP Flash块信息 */
static const BlockInfo_t g_astAppABlockInfo[] =
{
    {APP_A_START_ADDR, APP_A_END_ADDR},       /* APP_A代码区: 0x00010000 ~ 0x0006FFFF (384KB) */
    {APP_A_INFO_ADDR, APP_A_INFO_END_ADDR}    /* APP_A Info区: 0x00070000 ~ 0x000707FF (2KB) */
};

/* APP B Flash块信息 */
static const BlockInfo_t g_astAppBBlockInfo[] =
{
    {APP_B_START_ADDR, APP_B_END_ADDR},       /* APP_B代码区: 0x00080000 ~ 0x000DFFFF (384KB) */
    {APP_B_INFO_ADDR, APP_B_INFO_END_ADDR}    /* APP_B Info区: 0x000E0000 ~ 0x000E07FF (2KB) */
};

/* APP块信息指针数组 */
static const BlockInfo_t *g_apastAppBlockInfo[] =
{
    g_astAppABlockInfo,  /* APP_A */
    g_astAppBBlockInfo    /* APP_B */
};

/* 每个APP的块数量 */
static const uint32_t g_auAppBlockNum[] =
{
    sizeof(g_astAppABlockInfo) / sizeof(BlockInfo_t), /* APP_A: 2个块 */
    sizeof(g_astAppBBlockInfo) / sizeof(BlockInfo_t)  /* APP_B: 2个块 */
};

/*******************************************************************************
 * 内部函数声明
 ******************************************************************************/
static boolean BSP_Flash_Hal_Init(void);
static boolean BSP_Flash_Hal_EraseSector(const uint32_t startAddr, const uint32_t sectorCount);
static boolean BSP_Flash_Hal_ProgramData(const uint32_t startAddr, const uint8_t *pDataBuf, const uint32_t dataLen);
static boolean BSP_Flash_Hal_ReadData(const uint32_t startAddr, const uint32_t readLen, uint8_t *pDataBuf);
static void BSP_Flash_Hal_Deinit(void);

/*******************************************************************************
 * 函数实现
 ******************************************************************************/

/*
 * @brief Flash适配层初始化
 * @param none
 * @return TRUE-成功, FALSE-失败
 */
boolean BSP_Flash_Init(void)
{
    flash_user_config_t userConfig;

    if (g_bFlashInit)
    {
        return TRUE;
    }

    /* 配置Flash参数 */
    userConfig.pFlashBase = PFLASH_BASE_ADDR;
    userConfig.pFlashSize = PFLASH_SIZE;
    userConfig.dFlashBase = DFLASH_BASE_ADDR;
    userConfig.flexRAMBase = 0U;  /* AC7840 FlexRAM基地址 */
    userConfig.callback = NULL;

    /* 初始化Flash驱动 */
    FLASH_DRV_Init(&userConfig, &g_flashConfig);

    g_bFlashInit = 1;
    return TRUE;
}

/*
 * @brief Flash驱动层初始化
 */
static boolean BSP_Flash_Hal_Init(void)
{
    return BSP_Flash_Init();
}

/*
 * @brief 擦除Flash扇区
 * @param startAddr 起始地址
 * @param sectorCount 扇区数量
 * @return TRUE-成功, FALSE-失败
 */
static boolean BSP_Flash_Hal_EraseSector(const uint32_t startAddr, const uint32_t sectorCount)
{
    uint32_t i;
    status_t status;

    if (!g_bFlashInit)
    {
        return FALSE;
    }

    for (i = 0; i < sectorCount; i++)
    {
        /* 擦除单个扇区 */
        status = FLASH_DRV_EraseSector(&g_flashConfig, startAddr + i * PFLASH_PAGE_SIZE, PFLASH_PAGE_SIZE);
        if (status != STATUS_SUCCESS)
        {
            return FALSE;
        }
    }

    return TRUE;
}

/*
 * @brief 编程Flash数据
 * @param startAddr 起始地址
 * @param pDataBuf 数据缓冲区
 * @param dataLen 数据长度(必须8字节对齐)
 * @return TRUE-成功, FALSE-失败
 */
static boolean BSP_Flash_Hal_ProgramData(const uint32_t startAddr, const uint8_t *pDataBuf, const uint32_t dataLen)
{
    status_t status;

    if (!g_bFlashInit || (pDataBuf == NULL))
    {
        return FALSE;
    }

    /* 数据长度必须8字节对齐 */
    if (dataLen & (PFLASH_WRITE_UNIT - 1))
    {
        return FALSE;
    }

    /* 编程Flash */
    status = FLASH_DRV_Program(&g_flashConfig, startAddr, dataLen, pDataBuf);
    if (status != STATUS_SUCCESS)
    {
        return FALSE;
    }

    return TRUE;
}

/*
 * @brief 读取Flash数据
 * @param startAddr 起始地址
 * @param readLen 读取长度
 * @param pDataBuf 数据缓冲区
 * @return TRUE-成功, FALSE-失败
 */
static boolean BSP_Flash_Hal_ReadData(const uint32_t startAddr, const uint32_t readLen, uint8_t *pDataBuf)
{
    if ((pDataBuf == NULL) || (readLen == 0))
    {
        return FALSE;
    }

    /* 直接内存拷贝 - Flash可以直接像内存一样读取 */
    for (uint32_t i = 0; i < readLen; i++)
    {
        pDataBuf[i] = *((volatile uint8_t *)(startAddr + i));
    }

    return TRUE;
}

/*
 * @brief Flash反初始化
 */
static void BSP_Flash_Hal_Deinit(void)
{
    /* AC7840 Flash驱动可能没有LockCtrl，使用禁用Flash操作 */
    g_bFlashInit = 0;
}

/*
 * @brief 注册Flash操作API
 * @param pstFlashOperateAPI API结构体指针
 * @return TRUE-成功, FALSE-失败
 */
boolean BSP_Flash_RegisterAPI(tFlashOperateAPI *pstFlashOperateAPI)
{
    if (pstFlashOperateAPI == NULL)
    {
        return FALSE;
    }

    /* 注册API函数 */
    pstFlashOperateAPI->pfFlashInit = BSP_Flash_Hal_Init;
    pstFlashOperateAPI->pfEraserSecotr = BSP_Flash_Hal_EraseSector;
    pstFlashOperateAPI->pfProgramData = BSP_Flash_Hal_ProgramData;
    pstFlashOperateAPI->pfReadFlashData = BSP_Flash_Hal_ReadData;
    pstFlashOperateAPI->pfFlashDeinit = BSP_Flash_Hal_Deinit;

    volatile int a = 0;  // 加在这里
    return TRUE;
}

/*
 * @brief 获取Flash配置信息
 * @param appType APP类型(APP_A_TYPE/APP_B_TYPE)
 * @param ppBlockInfo 块信息输出指针
 * @param pItemLen 块数量输出指针
 * @return TRUE-成功, FALSE-失败
 */
boolean BSP_Flash_GetConfigInfo(tAPPType appType, BlockInfo_t **ppBlockInfo, uint32_t *pItemLen)
{
    if (appType >= APP_INVLID_TYPE)
    {
        return FALSE;
    }

    if ((ppBlockInfo == NULL) || (pItemLen == NULL))
    {
        return FALSE;
    }

    *ppBlockInfo = (BlockInfo_t *)g_apastAppBlockInfo[appType];
    *pItemLen = g_auAppBlockNum[appType];

    return TRUE;
}

/*
 * @brief 获取APP信息
 * @param appType APP类型
 * @param pAppInfoStartAddr APP信息起始地址输出指针
 * @param pBlockSize 块大小输出指针
 * @return TRUE-成功, FALSE-失败
 */
boolean BSP_Flash_GetAPPInfo(tAPPType appType, uint32_t *pAppInfoStartAddr, uint32_t *pBlockSize)
{
    if (appType >= APP_INVLID_TYPE)
    {
        return FALSE;
    }

    if ((pAppInfoStartAddr == NULL) || (pBlockSize == NULL))
    {
        return FALSE;
    }

    switch (appType)
    {
        case APP_A_TYPE:
            *pAppInfoStartAddr = APP_A_INFO_ADDR;
            *pBlockSize = APP_INFO_SIZE;
            break;
#ifdef EN_SUPPORT_APP_B
        case APP_B_TYPE:
            *pAppInfoStartAddr = APP_B_INFO_ADDR;
            *pBlockSize = APP_INFO_SIZE;
            break;
#endif
        default:
            return FALSE;
    }

    return TRUE;
}

/*
 * @brief 获取擦除一个扇区的最大时间(ms)
 */
uint32_t BSP_Flash_GetEraseSectorMaxTimeMs(void)
{
    return ERASE_SECTOR_MAX_TIME_MS;
}

/*
 * @brief 获取1个扇区的字节数
 */
uint32_t BSP_Flash_Get1SectorBytes(void)
{
    return PFLASH_PAGE_SIZE;
}

/*
 * @brief 获取APP类型的总扇区数
 * @param appType APP类型
 * @return 扇区数
 */
uint32_t BSP_Flash_GetTotalSectors(tAPPType appType)
{
    uint32_t totalSize;

    switch (appType)
    {
        case APP_A_TYPE:
            totalSize = APP_SIZE + APP_INFO_SIZE;
            break;
#ifdef EN_SUPPORT_APP_B
        case APP_B_TYPE:
            totalSize = APP_SIZE + APP_INFO_SIZE;
            break;
#endif
        default:
            return 0;
    }

    return totalSize / PFLASH_PAGE_SIZE;
}

/*
 * @brief 扇区号转Flash地址
 * @param appType APP类型
 * @param sectorNo 扇区号
 * @param pFlashAddr Flash地址输出指针
 * @return TRUE-成功, FALSE-失败
 */
boolean BSP_Flash_SectorNumberToAddress(tAPPType appType, uint32_t sectorNo, uint32_t *pFlashAddr)
{
    if (appType >= APP_INVLID_TYPE)
    {
        return FALSE;
    }

    if (pFlashAddr == NULL)
    {
        return FALSE;
    }

    switch (appType)
    {
        case APP_A_TYPE:
            *pFlashAddr = APP_A_START_ADDR + sectorNo * PFLASH_PAGE_SIZE;
            break;
#ifdef EN_SUPPORT_APP_B
        case APP_B_TYPE:
            *pFlashAddr = APP_B_START_ADDR + sectorNo * PFLASH_PAGE_SIZE;
            break;
#endif
        default:
            return FALSE;
    }

    return TRUE;
}

/*
 * @brief 获取Flash长度对应的扇区数
 * @param startAddr 起始地址
 * @param length 长度
 * @return 扇区数
 */
uint32_t BSP_Flash_LengthToSectors(uint32_t startAddr, uint32_t length)
{
    uint32_t sectors;

    (void)startAddr;  /* 未使用参数，消除警告 */

    /* 计算需要多少个扇区 */
    sectors = length / PFLASH_PAGE_SIZE;
    if (length % PFLASH_PAGE_SIZE)
    {
        sectors++;
    }

    return sectors;
}

/*
 * @brief 读取Flash数据
 * @param addr 起始地址
 * @param len 读取长度
 * @param pDataBuf 数据缓冲区
 * @return TRUE-成功, FALSE-失败
 */
boolean BSP_Flash_ReadData(uint32_t addr, uint32_t len, uint8_t *pDataBuf)
{
    return BSP_Flash_Hal_ReadData(addr, len, pDataBuf);
}

/*
 * @brief 获取Flash驱动保留区信息
 *
 * AC78406: Flash驱动是ROM内置的，不需要RAM区的Flash驱动。
 * 返回FALSE以跳过RAM Flash驱动机制(S32K142遗留代码)。
 */
boolean BSP_Flash_GetDriverInfo(uint32_t *pFlashDriverStartAddr, uint32_t *pFlashDriverEndAddr)
{
    if ((NULL_PTR == pFlashDriverStartAddr) || (NULL_PTR == pFlashDriverEndAddr))
    {
        return FALSE;
    }

    /* AC78406 uses ROM-based Flash driver, no RAM Flash driver needed */
    return FALSE;
}

/*
 * @brief 获取Reset Handler写入信息
 */
boolean BSP_Flash_GetResetHandlerInfo(boolean *pIsEnableWriteResetHandle, uint32_t *pResetHandleOffset, uint32_t *pResetHandleLength)
{
    if ((NULL_PTR == pIsEnableWriteResetHandle) || (NULL_PTR == pResetHandleOffset) || (NULL_PTR == pResetHandleLength))
    {
        return FALSE;
    }

    *pIsEnableWriteResetHandle = TRUE;
    *pResetHandleOffset = 4u;
    *pResetHandleLength = 4u;
    return TRUE;
}

/*
 * @brief 检查APP地址配置是否合法
 */
boolean BSP_Flash_APPAddrCheck(void)
{
    if ((APP_A_START_ADDR < PFLASH_BASE_ADDR) || (APP_A_END_ADDR > (PFLASH_BASE_ADDR + PFLASH_SIZE - 1u)))
    {
        return FALSE;
    }

#ifdef EN_SUPPORT_APP_B
    if ((APP_B_START_ADDR < PFLASH_BASE_ADDR) || (APP_B_END_ADDR > (PFLASH_BASE_ADDR + PFLASH_SIZE - 1u)))
    {
        return FALSE;
    }
#endif

    return TRUE;
}

/*
 * @brief 写APP信息数据
 */
boolean BSP_Flash_WriteAPPInfoData(uint32_t addr, const uint8_t *pDataBuf, uint32_t len)
{
    tFlashOperateAPI flashApi;

    if ((NULL_PTR == pDataBuf) || (0u == len))
    {
        return FALSE;
    }

    if (TRUE != BSP_Flash_RegisterAPI(&flashApi))
    {
        return FALSE;
    }

    if ((NULL_PTR == flashApi.pfFlashInit) || (NULL_PTR == flashApi.pfEraserSecotr) || (NULL_PTR == flashApi.pfProgramData))
    {
        return FALSE;
    }

    if (TRUE != flashApi.pfFlashInit())
    {
        return FALSE;
    }

    if (TRUE != flashApi.pfEraserSecotr(addr, BSP_Flash_LengthToSectors(addr, len)))
    {
        return FALSE;
    }

    return flashApi.pfProgramData(addr, pDataBuf, len);
}

/*
 * @brief 获取启动向量表偏移量
 * @note ARM Cortex-M向量表偏移寄存器 VTOR 的偏移量
 *       APP的向量表从其起始地址开始，所以偏移量就是APP起始地址
 */
uint32_t BSP_Flash_GetVectorTableOffset(void)
{
    /* 暂时返回0，后续根据Bootloader跳转逻辑调整 */
    return 0;
}

/**************************End file********************************/
