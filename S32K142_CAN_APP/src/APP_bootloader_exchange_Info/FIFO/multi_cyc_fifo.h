/*
 * multi_cyc_fifo.h
 *
 *  Created on: 2026年4月17日
 *      Author: Eloise
 *     Project: S32K142_CAN_APP
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef APP_BOOTLOADER_EXCHANGE_INFO_FIFO_MULTI_CYC_FIFO_H_
#define APP_BOOTLOADER_EXCHANGE_INFO_FIFO_MULTI_CYC_FIFO_H_

#include "includes.h"

/*default open check input parameters*/
#define SAFE_LEVEL_O3

#ifndef TRUE
#define TRUE (1u)
#endif

#ifndef FALSE
#define FALSE (!TRUE)
#endif

/*define erro code */
typedef enum
{
    ERRO_NONE = 0u,         /*no erro*/
	ERRO_LEES_MIN,		    /*less than min*/
	ERRO_NO_NODE,
	ERRO_OVER_MAX,          /*over max*/
	ERRO_POINTER_NULL,      /*pointer null*/
	ERRO_REGISTERED_SECOND, /*timer registered*/
	ERRO_TIME_TYPE_ERRO,    /*time type erro*/
	ERRO_TIME_USEING,
	ERRO_TIMEOUT,           /*timeout*/
	ERRO_WRITE_ERRO,
	ERRO_READ_ERRO
}tErroCode;

typedef unsigned short tId;
typedef unsigned short tLen;

#define FIFO_NUM (4u)           /*Fifo num*/

#ifdef EN_LIN_TP
#define TOTAL_FIFO_BYTES (450u) /*config total bytes*/
#elif defined EN_CAN_TP
#define TOTAL_FIFO_BYTES (800u) /*config total bytes*/
#else
#define TOTAL_FIFO_BYTES (100u) /*config total bytes*/
#endif


/**
 * @Function：
 * 1. 申请 FIFO
 * 2. 向 FIFO 写数据
 * 3. 从 FIFO 读数据
 * 4. 获取 FIFO 的写入长度
 * 5. 获取 FIFO 的读出长度
 * 6. 清除 FIFO
 */



/**********************************************************
**	Function Name	:	ApplyFifo
**	Description		:	Apply a fifo
**	Input Parameter	:	i_xApplyFifoLen need apply fifo len
						i_xFifoId fifo id. Use find this fifo.
**	Modify Parameter	:	none
**	Output Parameter	:	o_peApplyStatus apply status. If apply success ERRO_NONE, else ERRO_XXX
**	Return Value		:	none
**	Version			:	v00.00.01
**	Author			:	Tomlin
**	Created Date		:	2013-3-27
**********************************************************/
extern void ApplyFifo(tLen i_xApplyFifoLen, tLen i_xFifoId, tErroCode *o_peApplyStatus);

/**********************************************************
**	Function Name	:	WriteDataInFifo
**	Description		:	write data in fifo.
**	Input Parameter	:	i_xFifoId	fifo id
						i_pucWriteDataBuf Need write data buf
						i_xWriteDatalen  write data len
**	Modify Parameter	:	none
**	Output Parameter	:	o_peWriteStatus write data status. If successfull ERRO_NONE, else ERRO_XX
**	Return Value		:	none
**	Version			:	v00.00.01
**	Author			:	Tomlin
**	Created Date		:	2013-3-27
**********************************************************/
extern void WriteDataInFifo(tId i_xFifoId, 
					   		  unsigned char *i_pucWriteDataBuf, 
					   	      tLen i_xWriteDatalen, 
					          tErroCode *o_peWriteStatus);

/**********************************************************
**	Function Name	:	ReadDataFromFifo
**	Description		:	Read data from fifo.
**	Input Parameter	:	i_xFifoId need read fifo
						i_xNeedReadDataLen read data len
**	Modify Parameter	:	none
**	Output Parameter	:	o_pucReadDataBuf need read data buf.
						o_pxReadLen need read data len
						o_peReadStatus read status. If read successfull ERRO_NONE, else ERRO_XXX
**	Return Value		:	none
**	Version			:	v00.00.01
**	Author			:	Tomlin
**	Created Date		:	2013-3-27
**********************************************************/
extern void ReadDataFromFifo(tId i_xFifoId, tLen i_xNeedReadDataLen, 
						   		  unsigned char *o_pucReadDataBuf,
						  		  tLen *o_pxReadLen,
						   		  tErroCode *o_peReadStatus);

/**********************************************************
**	Function Name	:	GetCanReadLen
**	Description		:	Get fifo have data.
**	Input Parameter	:	i_xFifoId fifo id
**	Modify Parameter	:	none
**	Output Parameter	:	o_pxCanReadLen how much data can read.
						o_peGetStatus get status. If get successfull ERRO_NONE, else ERRO_XXX
**	Return Value		:	none
**	Version			:	v00.00.01
**	Author			:	Tomlin
**	Created Date		:	2013-3-27
**********************************************************/
extern void GetCanReadLen(tId i_xFifoId, tLen *o_pxCanReadLen, tErroCode *o_peGetStatus);

/**********************************************************
**	Function Name	:	GetCanWriteLen
**	Description		:	Get can write data.
**	Input Parameter	:	i_xFifoId fifo id
**	Modify Parameter	:	none
**	Output Parameter	:	o_pxCanWriteLen how much data can write.
						o_peGetStatus get data status. If get successfull ERRO_NONE, esle ERRO_XX
**	Return Value		:	none
**	Version			:	v00.00.01
**	Author			:	Tomlin
**	Created Date		:	2013-3-27
**********************************************************/
extern void GetCanWriteLen(tId i_xFifoId, tLen *o_pxCanWriteLen, tErroCode *o_peGetStatus);

/**********************************************************
**	Function Name	:	ClearFIFO
**	Description		:	Clear FIFO, set read pointer equal write pointer
**	Input Parameter	:	i_xFifoId fifo id
**	Modify Parameter	:	none
**	Output Parameter	:	o_peGetStatus get data status. If get successfull ERRO_NONE, esle ERRO_XX
**	Return Value		:	none
**	Version			:	v00.00.01
**	Author			:	Tomlin
**	Created Date		:	2019-6-18
**********************************************************/
extern void ClearFIFO(tId i_xFifoId, tErroCode *o_peGetStatus);


#endif /*#ifndef __MULTI_CYC_FIFO_H__*/

/**************************End file******************************/
