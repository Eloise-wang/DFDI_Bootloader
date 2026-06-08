/*
 * autolibc.h
 *
 *  Created on: 2026年4月15日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：S32DS 3.4 + GCC 7.2.1
 */

#ifndef UNIFIEDSTACK_AUTOLIBC_H_
#define UNIFIEDSTACK_AUTOLIBC_H_
 
 /*==============================================================================
                              DEFINES AND MACROS
 ==============================================================================*/
 /* labs() 函数与 abs() 函数完全一致，因为在32位PPC架构中，整型与长整型的数据类型相同 */
 #define fsl_labs(a) fsl_abs(a)
 
 
 /*==============================================================================
                              FUNCTION PROTOTYPES
 ==============================================================================*/
 void *fsl_memcpy (void *pavDest2, const void *pcoavSource2,uint32_t u32Length2);
 void *fsl_memset (void *pavDest3, uint8_t u8Fill3, uint32_t u32Length3);
 void *fsl_memmove (void *pavDest4,const void *pcoavSource4,uint32_t u32Length4);
 int32_t fsl_memcmp ( const void *pcoavMemA5,
                      const void *pcoavMemB5,
                      uint32_t u32Size5
                    );
 int32_t fsl_strcmp (const char_t *pcoszStrA6, const char_t *pcoszStrB6);
 char_t *fsl_strncpy (char_t *pszDest7, const char_t *pcoszSrc7, uint32_t u32Length7);
 uint32_t fsl_strlen (const char_t pcozsStr8[]);
 void fsl_srand (uint32_t u32Seed9);
 uint32_t fsl_rand (void);
int32_t fsl_abs (int32_t s32Number);
int64_t fsl_abs64 (int64_t s64Number);

#endif /* UNIFIEDSTACK_AUTOLIBC_H_ */
