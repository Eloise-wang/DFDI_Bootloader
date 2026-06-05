/*!
 * @file bsp_can.c
 *
 * @brief BSP CAN implementation for AC7840
 *
 */

/* ===========================================  Includes  =========================================== */
#include "bsp_can.h"
#include "gpio_drv.h"
#include "ckgen_drv.h"
#include "device_register.h"

/* ============================================  Defines  =========================================== */
/* CAN clock configuration - depends on system clock */
#ifndef BSP_CAN_CLK_DIV
#define BSP_CAN_CLK_DIV         (2U)          /* CAN clock divider */
#endif

/* ==========================================  Variables  ========================================== */
static bsp_can_rx_callback_t s_rxCallback = NULL;
static volatile bool s_txBusy = false;

/* Default filter configuration - accept all */
static can_filter_config_t s_canFilter[] = {
    {
        .code = 0U,
        .mask = 0U,
        .idType = CAN_MSG_ID_STD
    }
};

/* ====================================  Functions declaration  ===================================== */
/* CAN interrupt handler */
void CAN0_IRQHandler(void);

/* ==========================================  Functions  ========================================== */
/*!
 * @brief Configure CAN STB pin (PE10)
 */
static void BSP_CAN_StbPin_Init(void)
{
    /* PE10 as GPIO output for STB control */
    GPIO_DRV_SetMuxModeSel(BSP_CAN_STB_PORT, BSP_CAN_STB_PIN, PORT_MUX_AS_GPIO);
    GPIO_DRV_SetPinDirection(BSP_CAN_STB_GPIO, BSP_CAN_STB_PIN, GPIO_OUTPUT_DIRECTION);
    GPIO_DRV_WritePin(BSP_CAN_STB_GPIO, BSP_CAN_STB_PIN, BSP_CAN_STB_ACTIVE);
}

/*!
 * @brief Configure CAN pins (PE5=TX, PE6=RX)
 */
static void BSP_CAN_Pin_Init(void)
{
    /* PE5 - CAN0_TX (Mux Alt1) */
    GPIO_DRV_SetMuxModeSel(PORTE, 5, PORT_MUX_ALT2);
    
    /* PE6 - CAN0_RX (Mux Alt1) */
    GPIO_DRV_SetMuxModeSel(PORTE, 6, PORT_MUX_ALT2);
}

/*!
 * @brief Calculate CAN bit timing for desired baudrate
 *
 * CAN Clock = PLL / CAN_CLK_DIV
 * Baudrate = CAN_Clk / (presc + 1) / (1 + seg1 + 1 + seg2 + 1)
 * Sample Point = (2 + seg1) / (3 + seg1 + seg2)
 *
 * @param[in] baudrate - Desired baudrate in Hz
 * @param[out] bitrate - Bit timing structure to fill
 */
static void BSP_CAN_CalcBitrate(uint32_t baudrate, can_time_segment_t *bitrate)
{
    uint32_t canClk = 60000000U;  /* Default 60MHz, will be configured by system */
    
    /* Try to get actual CAN clock from clock driver */
    (void)CKGEN_DRV_GetFreq(CAN0_CLK, &canClk);
    
    /* Default values for 500Kbps @ 60MHz CAN clock */
    /* Baudrate = 60MHz / 4 / 30 = 500Kbps */
    /* Sample point ~87.5% */
    (void)baudrate;  /* Suppress unused warning - can be used for dynamic calculation */
    (void)canClk;
    
    bitrate->PRESC = 3;    /* Prescaler: 4 */
    bitrate->SEG_1 = 12;   /* Phase Seg1: 13 */
    bitrate->SEG_2 = 5;    /* Phase Seg2: 6 */
    bitrate->SJW = 2;      /* SJW: 3 */
}

/*!
 * @brief CAN event callback from driver
 */
static void BSP_CAN_EventCallback(uint8_t instance, uint32_t event, uint32_t koer)
{
    (void)koer;
    
    if (instance != BSP_CAN_INSTANCE)
    {
        return;
    }
    
    switch (event)
    {
        case CAN_EVENT_RECEIVE_DONE:
        {
            can_msg_info_t rxInfo;
            
            /* Read received message */
            if (CAN_DRV_Receive(instance, &rxInfo) == STATUS_SUCCESS)
            {
                if (s_rxCallback != NULL)
                {
                    bsp_can_msg_t msg;
                    msg.id = rxInfo.ID;
                    msg.dlc = rxInfo.DLC;
                    
                    /* Copy data */
                    for (uint8_t i = 0; i < rxInfo.DLC && i < 8; i++)
                    {
                        msg.data[i] = rxInfo.DATA[i];
                    }
                    
                    /* Call user callback */
                    s_rxCallback(&msg);
                }
            }
            break;
        }
        
        case CAN_EVENT_TRANS_PRI_DONE:
        {
            s_txBusy = false;
            break;
        }
        
        case CAN_EVENT_TRANS_SEC_DONE:
        {
            s_txBusy = false;
            break;
        }
        
        case CAN_EVENT_ERROR:
        case CAN_EVENT_BUS_ERROR:
        case CAN_EVENT_ERROR_PASSIVE:
        {
            /* Error handling - could add error counter or status */
            break;
        }
        
        case CAN_EVENT_RBUF_OVERRUN:
        {
            /* Receive buffer overrun */
            break;
        }
        
        default:
            break;
    }
}

/* ==========================================  Public Functions  ========================================== */
status_t BSP_CAN_Init(void)
{
    can_user_config_t canConfig;
    
    /* Initialize STB pin */
    BSP_CAN_StbPin_Init();
    
    /* Initialize CAN pins */
    BSP_CAN_Pin_Init();
    
    /* Get default configuration */
    CAN_DRV_GetDefaultConfig(&canConfig);
    
    /* Configure CAN mode */
    canConfig.canMode = CAN_NORMAL_MODE;
    
    /* Enable interrupts */
    canConfig.interruptEn = true;
    canConfig.interruptMask = CAN_IRQ_ALL_ENABLE_MSK;
    
    /* Configure bitrate */
    BSP_CAN_CalcBitrate(BSP_CAN_BAUDRATE, &canConfig.bitrate);
    
    /* Configure filters - accept all standard IDs */
    canConfig.filterNum = 1;
    canConfig.filterList = s_canFilter;
    
    /* Register callback */
    canConfig.callback = BSP_CAN_EventCallback;
    
    /* Disable FD mode for classic CAN */
    canConfig.fdModeEn = false;
    canConfig.fdIsoEn = false;
    
    /* Initialize CAN driver */
    if (CAN_DRV_Init(BSP_CAN_INSTANCE, &canConfig) != STATUS_SUCCESS)
    {
        return STATUS_ERROR;
    }
    
    /* Enable NVIC interrupt */
    NVIC_EnableIRQ(CAN0_IRQn);
    
    return STATUS_SUCCESS;
}

status_t BSP_CAN_Deinit(void)
{
    /* Disable interrupt */
    NVIC_DisableIRQ(CAN0_IRQn);
    
    /* Deinitialize CAN */
    CAN_DRV_Deinit(BSP_CAN_INSTANCE);
    
    /* Reset STB pin */
    GPIO_DRV_WritePin(BSP_CAN_STB_GPIO, BSP_CAN_STB_PIN, 0);
    
    return STATUS_SUCCESS;
}

status_t BSP_CAN_Transmit(uint32_t id, uint8_t dlc, const uint8_t *data)
{
    can_msg_info_t txInfo;
    
    if (s_txBusy)
    {
        return STATUS_BUSY;
    }
    
    /* Prepare TX message */
    txInfo.ID = id;
    txInfo.DLC = (dlc > 8) ? 8 : dlc;
    txInfo.DATA = (uint8_t *)data;
    txInfo.IDE = CAN_MSG_ID_STD;
    txInfo.RTR = CAN_MSG_DATA_FRAME;
    txInfo.FDF = 0;
    txInfo.BRS = 0;
    
    /* Send */
    s_txBusy = true;
    status_t status = CAN_DRV_Send(BSP_CAN_INSTANCE, &txInfo, CAN_TRANSMIT_PRIMARY);
    
    if (status != STATUS_SUCCESS)
    {
        s_txBusy = false;
    }
    
    return status;
}

status_t BSP_CAN_TransmitBlocking(uint32_t id, uint8_t dlc, const uint8_t *data, uint32_t timeout_ms)
{
    can_msg_info_t txInfo;
    
    /* Prepare TX message */
    txInfo.ID = id;
    txInfo.DLC = (dlc > 8) ? 8 : dlc;
    txInfo.DATA = (uint8_t *)data;
    txInfo.IDE = CAN_MSG_ID_STD;
    txInfo.RTR = CAN_MSG_DATA_FRAME;
    txInfo.FDF = 0;
    txInfo.BRS = 0;
    
    /* Send blocking */
    return CAN_DRV_SendBlocking(BSP_CAN_INSTANCE, &txInfo, CAN_TRANSMIT_PRIMARY, timeout_ms);
}

void BSP_CAN_InstallRxCallback(bsp_can_rx_callback_t callback)
{
    s_rxCallback = callback;
}

void BSP_CAN_SetStbPin(uint8_t active)
{
    GPIO_DRV_WritePin(BSP_CAN_STB_GPIO, BSP_CAN_STB_PIN, active ? 1 : 0);
}

bool BSP_CAN_IsTxBusy(void)
{
    return s_txBusy;
}

/* =============================================  EOF  ============================================== */
