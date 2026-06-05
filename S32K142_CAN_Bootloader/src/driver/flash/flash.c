/*
 * flash.c
 *
 *  Created on: 2026年4月11日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#include "flash.h"
#include "flash_hal_Cfg.h"

//#ifdef NXF47391
/*! @brief 配置结构体 flashCfg_0 */
static const flash_user_config_t Flash_InitConfig0 =
{
    .PFlashBase  = 0x00000000U,                     /* Base address of Program Flash block */
    .PFlashSize  = 0x00040000U,                     /* Size of Program Flash block         */
    .DFlashBase  = 0x10000000U,                     /* Base address of Data Flash block    */
    .EERAMBase   = 0x14000000U,                     /* Base address of FlexRAM block */
    /* 若使用回调函数，则此函数可访问的任何代码均不得置于以程序擦除操作为目标的Flash区块中。*/
    .CallBack    = NULL_CALLBACK
};

/* 声明一个由FlashInit初始化的FLASH配置结构体，该结构体将被所有闪存操作使用  */
static flash_ssd_config_t flashSSDConfig;

//#endif	//NXF47391 的结束

#ifdef USE_FLASH_DRIVER
const tFlashOptInfo *g_pstFlashOptInfo = NULL_PTR;
#endif	//USE_FLASH_DRIVER 的结束

#ifndef FLASH_SDK_USING
/*FUNCTION**********************************************************************
 *
 * Function Name : FLASH_DRV_GetDEPartitionCode
 * Description   : 从FlexNVM分区代码中获取DFlash大小。
 *
 *END**************************************************************************/
static void FLASH_DRV_GetDEPartitionCode(flash_ssd_config_t * const pSSDConfig,
										 uint8_t DEPartitionCode)
{
	/* 选择 D-Flash 的大小 */
	switch (DEPartitionCode)
	{
		case 0x00U:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_0000;
			break;
		case 0x01U:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_0001;
			break;
		case 0x02U:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_0010;
			break;
		case 0x03U:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_0011;
			break;
		case 0x04U:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_0100;
			break;
		case 0x05U:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_0101;
			break;
		case 0x06U:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_0110;
			break;
		case 0x07U:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_0111;
			break;
		case 0x08U:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_1000;
			break;
		case 0x09U:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_1001;
			break;
		case 0x0AU:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_1010;
			break;
		case 0x0BU:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_1011;
			break;
		case 0x0CU:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_1100;
			break;
		case 0x0DU:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_1101;
			break;
		case 0x0EU:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_1110;
			break;
		case 0x0FU:
			pSSDConfig->DFlashSize = (uint32_t)FEATURE_FLS_DF_SIZE_1111;
			break;
		default:
			/* 未定义的值 */
			break;
	}
}

/*FUNCTION**********************************************************************
 *
 * Function Name : FLASH_DRV_Init
 * Description   : 通过清除状态错误位来初始化Flash模块
 * 并通过固态硬盘配置结构报告内存配置信息。
 *
 * Implements    : FLASH_DRV_Init_Activity
 *END**************************************************************************/
static status_t FLASH_DRV_Init(const flash_user_config_t * const pUserConf,
                               flash_ssd_config_t * const pSSDConfig)
{
		DEV_ASSERT(pUserConf != NULL);
		DEV_ASSERT(pSSDConfig != NULL);
		status_t ret = STATUS_SUCCESS;
#if FEATURE_FLS_HAS_FLEX_NVM
		uint8_t DEPartitionCode;	/* store D/E-Flash Partition Code */
#endif

		pSSDConfig->PFlashBase = pUserConf->PFlashBase;
		pSSDConfig->PFlashSize = pUserConf->PFlashSize;
		pSSDConfig->DFlashBase = pUserConf->DFlashBase;
		pSSDConfig->EERAMBase = pUserConf->EERAMBase;
		pSSDConfig->CallBack = pUserConf->CallBack;

#if FEATURE_FLS_HAS_FLEX_NVM
		/* 针对FTFC与S32K144 CSEc部件的临时解决方案 */
		/* 从闪存配置寄存器1中获取DEPART值 */
		DEPartitionCode = (uint8_t)((SIM->FCFG1 & SIM_FCFG1_DEPART_MASK) >> SIM_FCFG1_DEPART_SHIFT);
		/* 获取数据flash容量 */
		FLASH_DRV_GetDEPartitionCode(pSSDConfig, DEPartitionCode);
		if (pSSDConfig->DFlashSize < FEATURE_FLS_DF_BLOCK_SIZE)
		{
			pSSDConfig->EEESize = FEATURE_FLS_FLEX_RAM_SIZE;
		}
		else
		{
			pSSDConfig->EEESize = 0U;
		}
#else /* FEATURE_FLS_HAS_FLEX_NVM == 0 */
		/* 如果D/E-Flash 的大小 = 0 */
		pSSDConfig->DFlashSize = 0U;
		pSSDConfig->EEESize = 0U;
#endif /* FEATURE_FLS_HAS_FLEX_NVM 结束 */

		return ret;

}

#endif	//FLASH_SDK_USING 的结束

/* 初始化 flash*/
void InitFlash(void)
{
    /* 初始化 flash */
	FLASH_DRV_Init(&Flash_InitConfig0, &flashSSDConfig);
}

/* 初始化flash   g_stFlashOptInfo指针*/
void InitFlashAPI(void)
{
    //计算偏移量
    uint32_t *tmp = NULL;
    uint32_t flashDriverStartAdd = 0;
    uint32_t flashDriverEndAdd = 0;

#ifdef USE_FLASH_DRIVER
    FLASH_HAL_GetFlashDriverInfo(&flashDriverStartAdd, &flashDriverEndAdd);
    tmp = (uint32_t *)flashDriverStartAdd;

    for(uint32_t i = 0u; i < (sizeof(tFlashOptInfo) / sizeof(uint32_t)); i++)
    {
        tmp[i] += (uint32_t)flashDriverStartAdd;
    }

    g_pstFlashOptInfo = (tFlashOptInfo *)flashDriverStartAdd;
#else
    (void)tmp;
    (void)flashDriverStartAdd;
    (void)flashDriverEndAdd;
#endif

	/* 禁用缓存以确保所有闪存操作能够立即生效，此功能取决于具体设备 */
#ifdef S32K142_SERIES
	//__asm("ISB"); // Instruction Synchronization Barrier
	//__asm("DSB"); // Data synchronization Barrier
	//__asm("DMB");	// Data memory Barrier
//	MSCM->OCMDR[0u] |= MSCM_OCMDR_OCM1(0xFu);
//	MSCM->OCMDR[1u] |= MSCM_OCMDR_OCM1(0xFu);
//	MSCM->OCMDR[2u] |= MSCM_OCMDR_OCM1(0xFu);
#endif /* S32K144_SERIES */
}

//#ifdef USE_FLASH_DRIVER

/*擦除 flash*/
unsigned char EraseFlashSector(const unsigned long i_ulLogicalAddr,
                               const unsigned long i_ulEraseLen)
{
    status_t ret;        /* Store the driver APIs return code */

#ifdef USE_FLASH_DRIVER
    ret = g_pstFlashOptInfo->FLASH_EraseSector(&flashSSDConfig, i_ulLogicalAddr, i_ulEraseLen);
#else
    (void)i_ulLogicalAddr;
    (void)i_ulEraseLen;
    ret = STATUS_SUCCESS;
#endif
    DEV_ASSERT(STATUS_SUCCESS == ret);

    return ret;
}

/*写入闪存。若写入闪存成功则返回TRUE，否则返回FALSE。*/
unsigned char WriteFlash(const uint32_t i_xStartAddr,
                         const void *i_pvDataBuf,
                         const unsigned short i_usDataLen)
{
    status_t ret;        /* 存储驱动程序应用程序编程接口的返回码 */

#ifdef USE_FLASH_DRIVER
    ret = g_pstFlashOptInfo->FLASH_Program(&flashSSDConfig, i_xStartAddr, i_usDataLen, i_pvDataBuf);
#else
    (void)i_xStartAddr;
    (void)i_pvDataBuf;
    (void)i_usDataLen;
    ret = STATUS_SUCCESS;
#endif
    DEV_ASSERT(STATUS_SUCCESS == ret);

#if 0
    /* Verify the program operation at margin level value of 1, user margin */
    ret = g_pstFlashOptInfo->FLASH_ProgramCheck(&flashSSDConfig, i_xStartAddr, i_usDataLen, i_pvDataBuf, &failAddr, 1u);
    DEV_ASSERT(STATUS_SUCCESS == ret);
#endif

    return ret;
}

#if 0
/*启动flash命令*/
static status_t FLASH_DRV_CommandSequence(const flash_ssd_config_t * pSSDConfig)
{
    return FALSE;
}
#endif

/*flash 擦除验证*/
unsigned char FlashEraseVerify(const unsigned long i_ulStartVerifyAddr,
                               const unsigned long i_ulVerifyLen)
{
    status_t ret;        /* 存储驱动程序应用程序编程接口的返回码 */

#ifdef USE_FLASH_DRIVER
    ret = g_pstFlashOptInfo->FLASH_VerifySection(&flashSSDConfig, i_ulStartVerifyAddr, i_ulVerifyLen >> 4, 1u);
#else
    (void)i_ulStartVerifyAddr;
    (void)i_ulVerifyLen;
    ret = STATUS_SUCCESS;
#endif
    DEV_ASSERT(STATUS_SUCCESS == ret);

    return ret;
}
//#endif	//USE_FLASH_DRIVE结束

/***********************************************************
**从闪存中读取一个字节。读取的数据地址必须为全局地址。
************************************************************/
unsigned char ReadFlashByte(const unsigned long i_ulGloabalAddress)
{
    unsigned char  ucReadvalue;

    /* 从全局地址中获取数值*/
    ucReadvalue = (*((unsigned long *)i_ulGloabalAddress));

    return ucReadvalue;
}

/********************************************************
**	从当前页面闪存中读取数据。
** 	paramer :
**		@	i_ulLogicalAddr : 当前地址
**		@	i_ulLength : 需要读取数据长度
**		@	o_pucDataBuf : read data buf
*********************************************************/
void ReadFlashMemory(const unsigned long i_ulLogicalAddr,
                     const unsigned long i_ulLength,
                     unsigned char* o_pucDataBuf)
{
    unsigned long ulGlobalAddr;
    unsigned long ulIndex = 0u;

    ulGlobalAddr = i_ulLogicalAddr;

    for(ulIndex = 0u; ulIndex < i_ulLength; ulIndex++)
    {
        o_pucDataBuf[ulIndex] = ReadFlashByte(ulGlobalAddr);
        ulGlobalAddr++;
    }
}

#ifdef FLASH_API_DEBUG
/* Data source for program operation */
#define BUFFER_SIZE         0x100u          /* 数据源大小 */
uint8_t sourceBuffer[BUFFER_SIZE];

void Flash_test(void)
{
    status_t ret;        /* 存储驱动程序API的返回码 */
    uint32_t address;
    uint32_t size;
    uint32_t failAddr;

    /* 初始化数据源 */
    for (uint32_t i = 0u; i < BUFFER_SIZE; i++)
    {
        sourceBuffer[i] = i;
    }

    /* 擦除第六个PFlash扇区*/
    address = 20u * FEATURE_FLS_PF_BLOCK_SECTOR_SIZE;
    size = FEATURE_FLS_PF_BLOCK_SECTOR_SIZE;
    DISABLE_INTERRUPTS();
#ifndef	FLASH_SDK_USING
    ret = g_pstFlashOptInfo->FLASH_EraseSector(&flashSSDConfig, address, size);
#else
    ret = FLASH_DRV_EraseSector(&flashSSDConfig, address, size);
#endif	//FLASH_SDK_USING结束
    DEV_ASSERT(STATUS_SUCCESS == ret);

    /* 禁用回调函数 */
    flashSSDConfig.CallBack = NULL_CALLBACK;

    /* Verify the erase operation at margin level value of 1, user read */
    ret = g_pstFlashOptInfo->FLASH_VerifySection(&flashSSDConfig, address, size / FTFx_DPHRASE_SIZE, 1u);
    DEV_ASSERT(STATUS_SUCCESS == ret);

    /* 向已擦除的PFlash扇区写入部分数据*/
    size = BUFFER_SIZE;
    ret = g_pstFlashOptInfo->FLASH_Program(&flashSSDConfig, address, size, sourceBuffer);
    DEV_ASSERT(STATUS_SUCCESS == ret);

    /* Verify the program operation at margin level value of 1, user margin */
    ret = g_pstFlashOptInfo->FLASH_ProgramCheck(&flashSSDConfig, address, size, sourceBuffer, &failAddr, 1u);
    DEV_ASSERT(STATUS_SUCCESS == ret);
    ENABLE_INTERRUPTS();

#if (FEATURE_FLS_HAS_FLEX_NVM == 1u)
    /* Erase a sector in DFlash */
    address = flashSSDConfig.DFlashBase;
    size = FEATURE_FLS_DF_BLOCK_SECTOR_SIZE;
    ret = g_pstFlashOptInfo->FLASH_EraseSector(&flashSSDConfig, address, size);
    DEV_ASSERT(STATUS_SUCCESS == ret);

    /* Verify the erase operation at margin level value of 1, user read */
    ret = g_pstFlashOptInfo->FLASH_VerifySection(&flashSSDConfig, address, size / FTFx_PHRASE_SIZE, 1u);
    DEV_ASSERT(STATUS_SUCCESS == ret);

    /* Write some data to the erased DFlash sector */
    address = flashSSDConfig.DFlashBase;
    size = BUFFER_SIZE;
    ret = g_pstFlashOptInfo->FLASH_Program(&flashSSDConfig, address, size, sourceBuffer);
    DEV_ASSERT(STATUS_SUCCESS == ret);

    /* Verify the program operation at margin level value of 1, user margin */
    ret = g_pstFlashOptInfo->FLASH_ProgramCheck(&flashSSDConfig, address, size, sourceBuffer, &failAddr, 1u);
    DEV_ASSERT(STATUS_SUCCESS == ret);
#endif /* FEATURE_FLS_HAS_FLEX_NVM */
}
#endif	//FLASH_API_DEBUG结束




