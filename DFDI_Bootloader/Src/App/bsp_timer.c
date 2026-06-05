/*!
 * @file bsp_timer.c
 *
 * @brief BSP Timer implementation for AC7840 - compatible with S32K142 timer_hal
 *
 */

/* ===========================================  Includes  =========================================== */
#include "bsp_timer.h"
#include "timer_drv.h"
#include "gpio_drv.h"
#include "device_register.h"
#include "stdbool.h"

/* ============================================  Defines  ============================================ */
#define BSP_TIMER_INSTANCE        (0U)   /*!< Timer instance 0 */
#define BSP_TIMER_CHANNEL        (0U)   /*!< Timer channel 0 for 1ms tick */

/* ==========================================  Variables  ========================================== */
/*!
 * @brief 1ms counter - incremented by ISR
 */
static volatile uint16_t gs_1msCnt = 0U;

/*!
 * @brief 100ms counter - incremented by ISR
 */
static volatile uint16_t gs_100msCnt = 0U;

/*!
 * @brief System tick for extended API
 */
static volatile uint32_t s_systemTick = 0U;

/* ==========================================  Timer ISR  ========================================== */
/*!
 * @brief Timer channel 0 interrupt handler - 1ms tick
 */
static void BSP_Timer_Isr(void *device, uint32_t wpara, uint32_t lpara)
{
    (void)device;
    (void)wpara;
    (void)lpara;
    
    /* Call 1ms period handler */
    TIMER_HAL_1msPeriod();
    
    /* Increment system tick for extended API */
    s_systemTick++;
}

/* ==========================================  S32K142 Compatible API  ========================================== */
/*!
 * @brief Initialize timer module
 *        Configures timer channel 0 for 1ms interrupt
 */
void TIMER_HAL_Init(void)
{
    timer_user_channel_config_t channelConfig;
    
    /* Initialize timer module */
    TIMER_DRV_Init(BSP_TIMER_INSTANCE, false);
    
    /* Get default channel configuration */
    TIMER_DRV_GetDefaultChanConfig(&channelConfig);
    
    /* Configure for periodic mode, 1ms period */
    channelConfig.timerMode = TIMER_PERIODIC_COUNTER;
    channelConfig.periodUnits = TIMER_PERIOD_UNITS_MICROSECONDS;
    channelConfig.period = 1000U;  /* 1ms = 1000us */
    channelConfig.isInterruptEnabled = true;
    channelConfig.callback = BSP_Timer_Isr;
    
    /* Initialize channel */
    (void)TIMER_DRV_InitChannel(BSP_TIMER_INSTANCE, BSP_TIMER_CHANNEL, &channelConfig);
    
    /* Start channel */
    TIMER_DRV_StartChannels(BSP_TIMER_INSTANCE, (1U << BSP_TIMER_CHANNEL));
}

/*!
 * @brief Deinitialize timer module
 */
void TIMER_HAL_Deinit(void)
{
    /* Stop channel */
    TIMER_DRV_StopChannels(BSP_TIMER_INSTANCE, (1U << BSP_TIMER_CHANNEL));
    
    /* Deinitialize */
    TIMER_DRV_Deinit(BSP_TIMER_INSTANCE);
}

/*!
 * @brief 1ms period callback - called every 1ms by timer ISR
 *        Increments gs_1msCnt and gs_100msCnt
 */
void TIMER_HAL_1msPeriod(void)
{
    uint16_t cntTmp;
    
    /* Increment 1ms counter with overflow check */
    cntTmp = gs_1msCnt + 1U;
    if (cntTmp != 0U)
    {
        gs_1msCnt++;
    }
    
    /* Increment 100ms counter with overflow check */
    cntTmp = gs_100msCnt + 1U;
    if (cntTmp != 0U)
    {
        gs_100msCnt++;
    }
}

/*!
 * @brief Check if 1ms tick has elapsed
 *        Returns TRUE if gs_1msCnt > 0 and decrements it
 *
 * @return TRUE if 1ms elapsed, FALSE otherwise
 */
boolean TIMER_HAL_Is1msTickTimeout(void)
{
    boolean result = FALSE;
    
    if (gs_1msCnt != 0U)
    {
        result = TRUE;
        gs_1msCnt--;
    }
    
    return result;
}

/*!
 * @brief Check if 100ms tick has elapsed
 *        Returns TRUE if gs_100msCnt >= 100 and decrements it by 100
 *
 * @return TRUE if 100ms elapsed, FALSE otherwise
 */
boolean TIMER_HAL_Is100msTickTimeout(void)
{
    boolean result = FALSE;
    
    if (gs_100msCnt >= 100U)
    {
        result = TRUE;
        gs_100msCnt -= 100U;
    }
    
    return result;
}

/*!
 * @brief Get hardware timer tick count for random seed
 *
 * @return timer tick count
 */
uint32_t TIMER_HAL_GetTimerTickCnt(void)
{
    uint32_t timerTickCnt;
    
    /* For AC7840, use system tick as timer count */
    timerTickCnt = s_systemTick;
    
    return timerTickCnt;
}

/* ==========================================  Extended API  ========================================== */
uint32_t BSP_Timer_GetTick(void)
{
    uint32_t tick;
    __disable_irq();
    tick = s_systemTick;
    __enable_irq();
    return tick;
}

boolean BSP_Timer_IsElapsed(uint32_t startTime, uint32_t ms)
{
    uint32_t currentTime = BSP_Timer_GetTick();
    uint32_t elapsed = currentTime - startTime;
    return (elapsed >= ms);
}

void BSP_Timer_DelayMs(uint32_t ms)
{
    uint32_t startTime = BSP_Timer_GetTick();
    while (!BSP_Timer_IsElapsed(startTime, ms))
    {
        /* Could add WFI here for power saving */
    }
}

/* =============================================  EOF  ============================================== */
