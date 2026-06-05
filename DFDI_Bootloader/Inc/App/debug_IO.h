/*
 * debug_IO.h
 */

#ifndef DEBUG_IO_H_
#define DEBUG_IO_H_

#include "includes.h"

#ifdef EN_DEBUG_IO
extern void DEBUG_IO_Init(void);
extern void DEBUG_IO_Deinit(void);
extern void DEBUG_IO_SetDebugIOLow(void);
extern void DEBUG_IO_SetDebugIOHigh(void);
extern void DEBUG_IO_ToggleDebugIO(void);
#endif

#endif /* DEBUG_IO_H_ */
