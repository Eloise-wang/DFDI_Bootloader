/*
 * toolchain.h
 *
 *  Created on: 2026年6月5日
 *      Author: Eloise
 *     Project: DFDI_Bootloader
 *       Brief: 【 工具链兼容宏定义 】
 *       Note : 1. 适配芯片：AC78406
 */

#ifndef TOOLCHAIN_H_
#define TOOLCHAIN_H_

#if defined __ghs__ || defined (__GNUC__)
    #define ASM_KEYWORD         __asm
    #define INTERRUPT_FUNC      __interrupt
    #define INLINE              inline
    #define PACKED_STRUCT_BEGIN
    #define PACKED_STRUCT_FIELD(x) x __attribute__((packed))
    #define PACKED_STRUCT_END   __attribute__((packed))
    #define ALIGNEDXB(x)        __attribute__((aligned(x)))
#elif defined __DCC__
    #define ASM_KEYWORD         __asm volatile
    #define INTERRUPT_FUNC      __interrupt__
    #define INLINE              __inline__
    #define PACKED_STRUCT_BEGIN __packed__
    #define PACKED_STRUCT_FIELD(x) x
    #define PACKED_STRUCT_END
    #define ALIGNEDXB(x)        __attribute__((aligned(x)))
#elif defined __MWERKS__
    #define INLINE              inline
#elif defined __CC_ARM
    #define ASM_KEYWORD         __asm
    #define INTERRUPT_FUNC      __irq
    #define INLINE              __inline
    #define PACKED_STRUCT_BEGIN
    #define PACKED_STRUCT_FIELD(x) x __attribute__((packed))
    #define PACKED_STRUCT_END   __attribute__((packed))
    #define ALIGNEDXB(x)        __attribute__((aligned(x)))
#elif defined __IAR_SYSTEMS_ICC__
    #define ASM_KEYWORD         __asm volatile
    #define INTERRUPT_FUNC      __interrupt
    #define INLINE              inline
    #define STRINGIZE(X) #X
    #define PACKED_STRUCT_BEGIN __packed
    #define PACKED_STRUCT_FIELD(x)  x
    #define PACKED_STRUCT_END
    #define ALIGNEDXB(n) _Pragma(STRINGIZE(data_alignment=n))
#else
    #error "Unknown toolchain"
#endif

#endif /* TOOLCHAIN_H_ */
