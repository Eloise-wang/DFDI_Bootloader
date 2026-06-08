/*!
 * @file bsp_timer.h
 *
 * @brief BSP Timer interface for AC7840 - compatible with S32K142 timer_hal
 *
 */

#ifndef BSP_TIMER_H
#define BSP_TIMER_H

#ifdef __cplusplus
extern "C" {
#endif

/* ===========================================  Includes  =========================================== */
#include "stdint.h"
#include "stdbool.h"

/* ============================================  Defines  ============================================ */
/*!< Boolean type for compatibility */
#ifndef boolean
#define boolean uint8_t
#endif
#ifndef TRUE
#define TRUE    1U
#endif
#ifndef FALSE
#define FALSE   0U
#endif

/* ====================================  Functions declaration  ===================================== */
/*!
 * @brief Initialize timer module (LPTMR/PIT for 1ms tick)
 *
 * @return none
 */
void TIMER_HAL_Init(void);

/*!
 * @brief Deinitialize timer module
 *
 * @return none
 */
void TIMER_HAL_Deinit(void);

/*!
 * @brief 1ms period callback - called by timer ISR every 1ms
 *        This function increments internal counters
 *
 * @return none
 */
void TIMER_HAL_1msPeriod(void);

/*!
 * @brief Check if 1ms tick has elapsed
 *        This function decrements the counter if > 0
 *
 * @return TRUE if 1ms elapsed (counter decremented), FALSE otherwise
 */
boolean TIMER_HAL_Is1msTickTimeout(void);

/*!
 * @brief Check if 100ms tick has elapsed
 *        This function decrements the counter by 100 if >= 100
 *
 * @return TRUE if 100ms elapsed, FALSE otherwise
 */
boolean TIMER_HAL_Is100msTickTimeout(void);

/*!
 * @brief Get hardware timer tick count for random seed
 *
 * @return timer tick count
 */
uint32_t TIMER_HAL_GetTimerTickCnt(void);

/* ===========================================  Extended API  =========================================== */
/*!
 * @brief Get current system tick in milliseconds
 *
 * @return tick count in milliseconds
 */
uint32_t BSP_Timer_GetTick(void);

/*!
 * @brief Check if specified milliseconds have elapsed since startTime
 *
 * @param[in] startTime - Start time from BSP_Timer_GetTick()
 * @param[in] ms - Milliseconds to check
 * @return true if elapsed, false otherwise
 */
boolean BSP_Timer_IsElapsed(uint32_t startTime, uint32_t ms);

/*!
 * @brief Blocking delay for specified milliseconds
 *
 * @param[in] ms - Milliseconds to delay
 * @return none
 */
void BSP_Timer_DelayMs(uint32_t ms);

#ifdef __cplusplus
}
#endif

#endif /* BSP_TIMER_H */

/* =============================================  EOF  ============================================== */
