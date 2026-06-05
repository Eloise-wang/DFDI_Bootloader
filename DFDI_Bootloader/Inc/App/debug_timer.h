/*
 * debug_timer.h
 */

#ifndef DEBUG_TIMER_H_
#define DEBUG_TIMER_H_

#include "includes.h"

#ifdef EN_DEBUG_TIMER
extern void DEBUG_TIMER_Init(void);
extern uint32 DEBUG_TIMER_GetTimerValue(void);
extern void DEBUG_TIMER_Deinit(void);
#endif

#endif /* DEBUG_TIMER_H_ */
