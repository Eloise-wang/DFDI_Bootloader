/*!
 * @file bsp_can.c
 *
 * @brief BSP CAN implementation for AC7840 with FIFO support
 *        Compatible with S32K142 CAN TP layer
 *
 */

/* ===========================================  Includes  =========================================== */
#include "bsp_can.h"
#include "gpio_drv.h"
#include "ckgen_drv.h"
#include "device_register.h"

/* ============================================  Defines  ============================================ */
/* CAN 500Kbps @ 60MHz CAN clock: Baudrate = 60M / 10 / 22 = 272727 ~= 500K (sample point ~75%) */
#define BSP_CAN_STB_ACTIVE_VALUE   (1U)    /* 1 = Normal mode, 0 = Standby */

/* ==========================================  Variables  ========================================== */
/* TX busy flag */
static volatile bool s_txBusy = false;

/* TX FIFO buffer */
static bsp_can_tx_header_t s_txHeaderFifo[BSP_CAN_TX_FIFO_SIZE];
static uint8_t s_txDataFifo[BSP_CAN_TX_FIFO_SIZE][8];
static uint16_t s_txWriteIdx = 0;
static uint16_t s_txReadIdx = 0;
static uint16_t s_txCount = 0;

/* RX FIFO buffer */
static bsp_can_rx_info_t s_rxFifo[BSP_CAN_RX_FIFO_SIZE];
static uint16_t s_rxWriteIdx = 0;
static uint16_t s_rxReadIdx = 0;
static uint16_t s_rxCount = 0;

/* TX callback for TX FIFO */
static void (*s_txCallback)(void) = NULL;

/* ==========================================  Internal Functions  ========================================== */
/*!
 * @brief Check if TX FIFO is empty
 */
static inline bool BSP_CAN_IsTxFifoEmpty(void)
{
    return (s_txCount == 0);
}

/*!
 * @brief Check if TX FIFO is full
 */
static inline bool BSP_CAN_IsTxFifoFull(void)
{
    return (s_txCount >= BSP_CAN_TX_FIFO_SIZE);
}

/*!
 * @brief Write to TX FIFO
 */
static bool BSP_CAN_WriteTxFifo(bsp_can_tx_header_t *header, const uint8_t *data)
{
    if (BSP_CAN_IsTxFifoFull())
    {
        return false;
    }
    
    /* Write header */
    s_txHeaderFifo[s_txWriteIdx] = *header;
    
    /* Write data */
    for (uint8_t i = 0; i < 8 && i < header->txMsgLength; i++)
    {
        s_txDataFifo[s_txWriteIdx][i] = data[i];
    }
    
    /* Update write index */
    s_txWriteIdx = (s_txWriteIdx + 1) % BSP_CAN_TX_FIFO_SIZE;
    s_txCount++;
    
    return true;
}

/*!
 * @brief Read from TX FIFO
 */
static bool BSP_CAN_ReadTxFifo(bsp_can_tx_header_t *header, uint8_t *data)
{
    if (BSP_CAN_IsTxFifoEmpty())
    {
        return false;
    }
    
    /* Read header */
    *header = s_txHeaderFifo[s_txReadIdx];
    
    /* Read data */
    for (uint8_t i = 0; i < 8 && i < header->txMsgLength; i++)
    {
        data[i] = s_txDataFifo[s_txReadIdx][i];
    }
    
    /* Update read index */
    s_txReadIdx = (s_txReadIdx + 1) % BSP_CAN_TX_FIFO_SIZE;
    s_txCount--;
    
    return true;
}

/*!
 * @brief Check if RX FIFO is empty
 */
static inline bool BSP_CAN_IsRxFifoEmpty(void)
{
    return (s_rxCount == 0);
}

/*!
 * @brief Get RX FIFO count
 */
uint16_t BSP_CAN_GetRxFifoCount(void)
{
    return s_rxCount;
}

/*!
 * @brief Check if RX FIFO is full
 */
static inline bool BSP_CAN_IsRxFifoFull(void)
{
    return (s_rxCount >= BSP_CAN_RX_FIFO_SIZE);
}

/*!
 * @brief Write to RX FIFO (called from ISR)
 */
static bool BSP_CAN_WriteRxFifo(uint32_t id, uint8_t len, const uint8_t *data)
{
    if (BSP_CAN_IsRxFifoFull())
    {
        return false;
    }
    
    s_rxFifo[s_rxWriteIdx].rxDataId = id;
    s_rxFifo[s_rxWriteIdx].rxDataLen = (len > 8) ? 8 : len;
    
    for (uint8_t i = 0; i < 8; i++)
    {
        s_rxFifo[s_rxWriteIdx].aucDataBuf[i] = (i < len) ? data[i] : 0;
    }
    
    /* Update write index */
    s_rxWriteIdx = (s_rxWriteIdx + 1) % BSP_CAN_RX_FIFO_SIZE;
    s_rxCount++;
    
    return true;
}

/*!
 * @brief Read from RX FIFO
 */
bool BSP_CAN_ReadRxFifo(bsp_can_rx_info_t *msg)
{
    if (BSP_CAN_IsRxFifoEmpty())
    {
        return false;
    }
    
    *msg = s_rxFifo[s_rxReadIdx];
    
    /* Update read index */
    s_rxReadIdx = (s_rxReadIdx + 1) % BSP_CAN_RX_FIFO_SIZE;
    s_rxCount--;
    
    return true;
}

/* ==========================================  CAN Event Callback  ========================================== */
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
                /* Write to RX FIFO - disable interrupt during write */
                __disable_irq();
                (void)BSP_CAN_WriteRxFifo(rxInfo.ID, rxInfo.DLC, rxInfo.DATA);
                __enable_irq();
            }
            break;
        }
        
        case CAN_EVENT_TRANS_PRI_DONE:
        case CAN_EVENT_TRANS_SEC_DONE:
        {
            s_txBusy = false;
            
            /* Execute TX callback if registered */
            if (s_txCallback != NULL)
            {
                s_txCallback();
                s_txCallback = NULL;
            }
            break;
        }
        
        case CAN_EVENT_ERROR:
        case CAN_EVENT_BUS_ERROR:
        case CAN_EVENT_ERROR_PASSIVE:
        {
            /* Error handling */
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

/* ==========================================  Pin Configuration  ========================================== */
/*!
 * @brief Configure CAN STB pin (PE10)
 */
static void BSP_CAN_StbPin_Init(void)
{
    GPIO_DRV_SetMuxModeSel(BSP_CAN_STB_PORT, BSP_CAN_STB_PIN, PORT_MUX_AS_GPIO);
    GPIO_DRV_SetPinDirection(BSP_CAN_STB_GPIO, BSP_CAN_STB_PIN, GPIO_OUTPUT_DIRECTION);
    GPIO_DRV_WritePin(BSP_CAN_STB_GPIO, BSP_CAN_STB_PIN, BSP_CAN_STB_ACTIVE_VALUE);
}

/*!
 * @brief Configure CAN pins (PE4=RX, PE5=TX) - ALT5 
 */
static void BSP_CAN_Pin_Init(void)
{
    /* PE4 - CAN0_RX (Mux ALT5) */
    GPIO_DRV_SetMuxModeSel(PORTE, BSP_CAN_RX_PIN, PORT_MUX_ALT5);

    /* PE5 - CAN0_TX (Mux ALT5) */
    GPIO_DRV_SetMuxModeSel(PORTE, BSP_CAN_TX_PIN, PORT_MUX_ALT5);

    /* PE10 - CAN STB (Alt5 as backup, but controlled as GPIO) */
    GPIO_DRV_SetMuxModeSel(PORTE, BSP_CAN_STB_PIN, PORT_MUX_ALT5);
}

/* ==========================================  Bitrate Configuration  ========================================== */
/*!
 * @brief Calculate CAN bit timing for 500Kbps @ 60MHz CAN clock
 *
 * @param[out] bitrate - Bit timing structure to fill
 */
static void BSP_CAN_CalcBitrate(can_time_segment_t *bitrate)
{
    /* 500Kbps @ 60MHz: Baudrate = 60M / 10 / 22 = 272727 (sample point ~75%) */
    /* Matches DC-V2.7.2 reference: {0x1C, 0x09, 0x09, 0x02} */
    bitrate->PRESC = 9;     /* Prescaler: 10 */
    bitrate->SEG_1 = 9;     /* Phase Seg1: 10 */
    bitrate->SEG_2 = 9;     /* Phase Seg2: 10 */
    bitrate->SJW = 2;       /* SJW: 3 */
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

    /* Disable CAN memory ECC to avoid ECC init timeout */
    canConfig.memEccEn = false;

    /* Configure CAN mode */
    canConfig.canMode = CAN_NORMAL_MODE;
    
    /* Enable interrupts */
    canConfig.interruptEn = true;
    canConfig.interruptMask = CAN_IRQ_ALL_ENABLE_MSK;
    
    /* Configure bitrate */
    BSP_CAN_CalcBitrate(&canConfig.bitrate);
    
    /* Configure filters - accept all  */
    canConfig.filterNum = 0U;
    canConfig.filterList = NULL;

    /* Register callback */
    canConfig.callback = BSP_CAN_EventCallback;

    /* Disable FD mode for classic CAN 2.0A/B */
    canConfig.fdModeEn = false;
    canConfig.fdIsoEn = false;

    /* Additional config per DC-V2.7.2 reference */
    canConfig.tsMode = CAN_TSMODE_FIFO;
    canConfig.tsAmount = CAN_TRANSMIT_SEC_ALL;
    canConfig.tpss = false;                     /* Enable PTB */
    canConfig.tsss = false;                    /* Enable STB */
    canConfig.selfAckEn = false;
    canConfig.rom = CAN_ROM_OVER_WRITE;
    canConfig.errorWarningLimit = 0x0BU;
    canConfig.busOffRecDisable = false;

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
    
    /* Reset FIFO counters */
    s_txCount = 0;
    s_rxCount = 0;
    s_txWriteIdx = 0;
    s_txReadIdx = 0;
    s_rxWriteIdx = 0;
    s_rxReadIdx = 0;
    
    return STATUS_SUCCESS;
}

/* ==========================================  FIFO API  ========================================== */
void BSP_CAN_TxTask(void)
{
    bsp_can_tx_header_t header;
    uint8_t data[8];
    
    /* Check if TX is busy or FIFO is empty */
    if (s_txBusy || BSP_CAN_IsTxFifoEmpty())
    {
        return;
    }
    
    /* Read from TX FIFO */
    if (!BSP_CAN_ReadTxFifo(&header, data))
    {
        return;
    }
    
    /* Save callback */
    s_txCallback = (void (*)(void))header.txMsgCallBack;
    
    /* Prepare TX message */
    can_msg_info_t txInfo;
    txInfo.ID = header.txMsgID;
    txInfo.DLC = (header.txMsgLength > 8) ? 8 : (uint8_t)header.txMsgLength;
    txInfo.DATA = data;
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
        s_txCallback = NULL;
    }
}

bool BSP_CAN_IsTxBusy(void)
{
    return s_txBusy;
}

void BSP_CAN_AbortTx(void)
{
    if (s_txBusy)
    {
        /* Abort TX */
        CAN_DRV_AbortTransfer(BSP_CAN_INSTANCE, CAN_TRANSMIT_PRIMARY);
        s_txBusy = false;
    }
    
    /* Clear TX FIFO */
    s_txCount = 0;
    s_txWriteIdx = 0;
    s_txReadIdx = 0;
    s_txCallback = NULL;
}

void BSP_CAN_SetStbPin(uint8_t active)
{
    GPIO_DRV_WritePin(BSP_CAN_STB_GPIO, BSP_CAN_STB_PIN, active ? 1 : 0);
}

/* ==========================================  Legacy API  ========================================== */
status_t BSP_CAN_Transmit(uint32_t id, uint8_t dlc, const uint8_t *data)
{
    bsp_can_tx_header_t header;
    
    header.txMsgID = id;
    header.txMsgLength = dlc;
    header.txMsgCallBack = 0;
    
    if (BSP_CAN_WriteTxFifo(&header, data))
    {
        return STATUS_SUCCESS;
    }
    
    return STATUS_ERROR;
}

status_t BSP_CAN_TransmitBlocking(uint32_t id, uint8_t dlc, const uint8_t *data, uint32_t timeout_ms)
{
    can_msg_info_t txInfo;
    
    txInfo.ID = id;
    txInfo.DLC = (dlc > 8) ? 8 : dlc;
    txInfo.DATA = (uint8_t *)data;
    txInfo.IDE = CAN_MSG_ID_STD;
    txInfo.RTR = CAN_MSG_DATA_FRAME;
    txInfo.FDF = 0;
    txInfo.BRS = 0;
    
    return CAN_DRV_SendBlocking(BSP_CAN_INSTANCE, &txInfo, CAN_TRANSMIT_PRIMARY, timeout_ms);
}

void BSP_CAN_InstallRxCallback(bsp_can_rx_callback_t callback)
{
    /* Legacy compatibility - not used with FIFO mode */
    (void)callback;
}

/* =============================================  EOF  ============================================== */
