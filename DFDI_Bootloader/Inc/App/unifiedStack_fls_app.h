/*
 * fls_app.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef UNIFIEDSTACK_FLS_APP_H_
#define UNIFIEDSTACK_FLS_APP_H_
 #include "bsp_flash.h"
 #include "includes.h"
 
 /*每个程序flash容量*/
 #define PROGRAM_SIZE (128u)
 
 /*Flash finger print length*/
 #define FL_FINGER_PRINT_LENGTH  (17u)
 
 /*无效 UDS 服务 ID*/
 #define INVALID_UDS_SERVICES_ID (0xFFu)
 
 typedef enum
 {
     FLASH_IDLE,           /*flash 空闲*/
     FLASH_ERASING,        /*擦除 flash */
     FLASH_PROGRAMMING,    /*program flash*/
     FLASH_CHECKING,       /*校验 flash*/
     FLASH_WAITTING       /*等待传输消息成功*/
 }tFlshJobModle;
 
 typedef enum
 {
     FLASH_OPERATE_ERRO,  /*flash 操作错误*/
     FLASH_OPERATE_RIGHT  /*flash 操作正确*/
 }tFlashErroCode;
 
 /** flash加载器下载步骤 */
 typedef enum
 {
     FL_REQUEST_STEP,      /*flash 需求步骤*/
     FL_TRANSFER_STEP,     /*flash 传输数据步骤*/
     FL_EXIT_TRANSFER_STEP,/*退出传输数据步骤*/
     FL_CHECKSUM_STEP      /*校验和步骤*/
 
 }tFlDownloadStepType;
 
 
 
 /*输入参数：真/假。真 = 操作成功，反之则失败.*/
 typedef void (*tpfResponse)(uint8);
 typedef void (*tpfReuestMoreTime)(uint8, void (*)(uint8));
 
 /*flash app module init*/
 extern void FLASH_APP_Init(void);
 
 /*Init flash download*/
 extern void Flash_InitDowloadInfo(void);
 
 /*flash operate main function*/
 extern void Flash_OperateMainFunction(void);
 
 /*Flash程序区域。由uds服务0x36u调用*/
 extern uint8 Flash_ProgramRegion(const uint32 i_addr,
                                              const uint8 *i_pDataBuf, 
                                              const uint32 i_dataLen);
 
 /*从flash中读取的应用信息是否有效?*/
 extern uint8 Flash_IsReadAppInfoFromFlashValid(void);
 
 /*flash中的应用是否有效？若有效则返回TRUE，否则返回FALSE.*/
 extern uint8 Flash_IsAppInFlashValid(void);
 
 /*保存已接收的校验和循环冗余校验*/
 extern void Flash_SavedReceivedCheckSumCrc(uint32 i_receivedCrc);
 
 /*在内存中擦除闪存驱动器*/
 extern void Flash_EraseFlashDriverInRAM(void);
 
 extern void Flash_SetNextDownloadStep(const tFlDownloadStepType i_donwloadStep);
 
 extern tFlDownloadStepType Flash_GetCurDownloadStep(void);
 
 
 /*等效下载步骤*/
 extern boolean Flash_IsEqualDonwloadStep(const tFlDownloadStepType i_donwloadStep);
 
 /*保存下载数据信息*/
 extern void Flash_SaveDownloadDataInfo(const uint32 i_dataStartAddr, const uint32 i_dataLen);
 
 
 /*设置操作flash激活任务*/
 extern void Flash_SetOperateFlashActiveJob(const tFlshJobModle i_activeJob, 
                                     const tpfResponse i_pfActiveFinshedCallBack, 
                                     const uint8 i_requestUDSSerID, 
                                     const tpfReuestMoreTime i_pfRequestMoreTimeCallback);
 
 
 /*获取flash活跃任务*/
 extern tFlshJobModle Flash_GetOperateFlashActiveJob(void);
 
 
 /*设置等待并执行响应操作*/
 /*注册flash任务回调函数。flash任务结束后将触发回调执行.*/
 extern void Flash_RegisterJobCallback(tpfResponse i_pfDoResponse);
 
 /*保存打印标识*/
 extern void Flash_SavePrintfigner(const uint8 *i_pPrintfigner, const uint8 i_printfinerLen);
 
 /*写入引导程序最后一步调用的flash应用程序信息*/
 extern uint8 Flash_WriteFlashAppInfo(void);
 
 /*获取最新APP信息*/
 extern tAPPType Flash_GetNewestAPPType(void);
 
 /*获得旧的APP信息*/
 extern tAPPType Flash_GetOldAPPType(void);

/* 获取当前升级目标槽位（在一次擦除/下载流程中保持稳定） */
extern tAPPType Flash_GetTargetAPPType(void);
 
 /*get rest hander address*/
 extern uint32 Flash_GetResetHandlerAddr(void);
 
 /*判断是否为有效地址*/
 extern boolean Flash_IsValidAddr(const tAPPType i_appType, const uint32 i_dataAddr, const uint32 i_dataLen);
 
 /*是否为flash驱动器数据*/
 extern boolean Flash_IsFlashDriverData(const uint32 i_dataAddr, const uint32 i_dataLen);
 
 /*APP类型是否已擦除*/
 extern boolean Flash_IsAPPTypeErased(const tAPPType i_erasedAPPType);
 
 #endif /* UNIFIEDSTACK_FLS_APP_H_ */
