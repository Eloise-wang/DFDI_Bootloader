/*
 * common_types.h
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *     Brief: 【 公共类型定义 - 兼容S32K142代码风格】
 *       Note : 1. 适配芯片：AC78406
 *              2. 编码格式：UTF-8
 *              3. 编译环境：MDK-ARM / GCC
 */

#ifndef DFDI_COMMON_TYPES_H_
#define DFDI_COMMON_TYPES_H_

/*******************************************************************************
 * 空指针定义
 ******************************************************************************/
#ifndef NULL
    #define NULL ((void *)0)
#endif

#ifndef NULL_PTR
    #define NULL_PTR ((void *)0)
#endif

/*******************************************************************************
 * 布尔类型定义
 ******************************************************************************/
#ifndef FALSE
    #define FALSE 0U
#endif

#ifndef TRUE
    #define TRUE 1U
#endif

/*******************************************************************************
 * 字节序相关定义
 ******************************************************************************/
#ifndef LITTLE
    #define LITTLE 1
#endif

#ifndef BIG
    #define BIG 2
#endif

#ifndef MACHINE_ENDIAN
    #define MACHINE_ENDIAN LITTLE
#endif

/* 小端序转换宏 */
#if (LITTLE == MACHINE_ENDIAN)
    #ifndef ntohs
        #define ntohs(a) (((((uint16_t)(a)) >> 8) & 0x00ffU) | \
                          (((uint16_t)(((uint16_t)(a)) << 8)) & 0xff00U))
    #endif

    #ifndef ntohl
        #define ntohl(a) (((((uint32_t)(a)) >> 24) & 0x000000ffU) | \
                          ((((uint32_t)(a)) >> 8 ) & 0x0000ff00U) | \
                          ((uint32_t)(((uint32_t)(a)) << 8 ) & 0x00ff0000U) | \
                          ((uint32_t)(((uint32_t)(a)) << 24) & 0xff000000U))
    #endif

    #ifndef htons
        #define htons(a) ntohs(a)
    #endif

    #ifndef htonl
        #define htonl(a) ntohl(a)
    #endif

    #ifndef ntohll
        #define ntohll(a) (((((uint64_t)(a)) & 0xFF00000000000000ULL) >> 56U) | \
                          ((((uint64_t)(a)) & 0x00FF000000000000ULL) >> 40U) | \
                          ((((uint64_t)(a)) & 0x0000FF0000000000ULL) >> 24U) | \
                          ((((uint64_t)(a)) & 0x000000FF00000000ULL) >> 8U)  | \
                          ((((uint64_t)(a)) & 0x00000000FF000000ULL) << 8U)  | \
                          ((((uint64_t)(a)) & 0x0000000000FF0000ULL) << 24U) | \
                          ((((uint64_t)(a)) & 0x000000000000FF00ULL) << 40U) | \
                          ((((uint64_t)(a)) & 0x00000000000000FFULL) << 56U))
    #endif

    #ifndef htonll
        #define htonll(a) ntohll(a)
    #endif

#elif (BIG == MACHINE_ENDIAN)
    #ifndef ntohs
        #define ntohs(a) (a)
    #endif

    #ifndef ntohl
        #define ntohl(a) (a)
    #endif

    #ifndef htons
        #define htons(a) (a)
    #endif

    #ifndef htonl
        #define htonl(a) (a)
    #endif
#else
    #error "Setup MACHINE_ENDIAN! Options: BIG or LITTLE."
#endif

/*******************************************************************************
 * 基础类型定义 - 使用条件编译避免重复定义
 ******************************************************************************/

#include <stdint.h>

#ifndef _STDINT_H
#define _STDINT_H
#endif
#ifndef __STDINT_H
#define __STDINT_H
#endif
#ifndef _SYS__STDINT_H
#define _SYS__STDINT_H
#endif

    typedef signed char sint8_t;
    typedef signed short sint16_t;
    typedef signed int sint32_t;
    typedef signed long long sint64_t;

    typedef unsigned char uint8_t;
    typedef unsigned short uint16_t;
    typedef unsigned int uint32_t;
    typedef unsigned long long uint64_t;

/* boolean类型 - 如果未定义则定义 */
#ifndef _BOOLEAN_DEFINED
#ifndef boolean
    typedef unsigned char boolean;
#endif
#define _BOOLEAN_DEFINED 1
#endif

/* 兼容S32K142的简短类型名 */
typedef uint32_t uint32;
typedef uint16_t uint16;
typedef uint8_t uint8;
typedef uint64_t uint64;

typedef int8_t int8;
typedef int16_t int16;
typedef int32_t int32;
typedef int64_t int64;

typedef sint8_t sint8;
typedef sint16_t sint16;
typedef sint32_t sint32;
typedef sint64_t sint64;

typedef int int_t;
typedef char char_t;
typedef unsigned int uint_t;
typedef double float64_t;
typedef unsigned int uaddr_t;

#endif /* DFDI_COMMON_TYPES_H_ */
