/*
 * multi_cyc_fifo.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: S32K142_CAN_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：S32K142_64
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef UNIFIED_STACK_FIFO_MULTI_CYC_FIFO_H_
#define UNIFIED_STACK_FIFO_MULTI_CYC_FIFO_H_

#include "includes.h"

/*默认开启校验输入参数*/
#define SAFE_LEVEL_O3

#ifndef TRUE
#define TRUE (1u)
#endif

#ifndef FALSE
#define FALSE (!TRUE)
#endif

/*定义错误码 */
typedef enum
{
    ERRO_NONE = 0u,         /*没有错误*/
	ERRO_LEES_MIN,		    /*小于最小值*/
	ERRO_NO_NODE,
	ERRO_OVER_MAX,          /*超出上限*/
	ERRO_POINTER_NULL,      /*空指针*/
	ERRO_REGISTERED_SECOND, /*计时器已注册*/
	ERRO_TIME_TYPE_ERRO,    /*时间类型错误*/
	ERRO_TIME_USEING,
	ERRO_TIMEOUT,           /*超时*/
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

/**********************************************************
**	Function Name	:	ApplyFifo
**	Description		:	采用FIFO模式
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
**	Description		:	写数据到FIFO
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
**	Description		:	从FIFO里面读数据
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
**	Description		:	从FIFO里面获取数据
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
**	Description		:	清空FIFO缓冲区，将读指针与写指针设为一致
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
