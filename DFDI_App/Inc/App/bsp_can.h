/*!
 * @file bsp_can.h
 *
 * @brief BSP CAN interface for AC7840 - CAN0 with FIFO support
 *        Compatible with S32K142 CAN TP layer
 *
 */

#ifndef BSP_CAN_H
#define BSP_CAN_H

#ifdef __cplusplus
extern "C" {
#endif

/* ===========================================  Includes  =========================================== */
#include "can_drv.h"
#include "stdint.h"
#include "stdbool.h"

/* ============================================  Defines  ============================================ */
#define BSP_CAN_INSTANCE        (0U)          /*!< CAN0 instance */
#define BSP_CAN_BAUDRATE        (500000U)     /*!< 500Kbps */

/* CAN STB pin - PE10 */
#define BSP_CAN_STB_PORT        (PORTE)
#define BSP_CAN_STB_PIN         (10U)
#define BSP_CAN_STB_GPIO        (GPIOE)
#define BSP_CAN_STB_ACTIVE      (0U)          /* 0 = Normal mode, 1 = Standby */

/* CAN pins - PE4=RX, PE5=TX (ALT5) */
#define BSP_CAN_RX_PORT         (PORTE)
#define BSP_CAN_RX_PIN          (4U)
#define BSP_CAN_TX_PORT         (PORTE)
#define BSP_CAN_TX_PIN          (5U)

/* FIFO depths */
#define BSP_CAN_RX_FIFO_SIZE    (16U)         /*!< RX FIFO size */
#define BSP_CAN_TX_FIFO_SIZE    (16U)         /*!< TX FIFO size */

/* ===========================================  Typedef  ============================================ */
/* CAN message structure */
typedef struct
{
    uint32_t id;        /*!< CAN ID */
    uint8_t  dlc;       /*!< Data length (0-8) */
    uint8_t  data[8];   /*!< Data */
} bsp_can_msg_t;

/* CAN TX message header for FIFO */
typedef struct
{
    uint32_t txMsgID;           /*!< TX CAN ID */
    uint32_t txMsgLength;       /*!< TX data length */
    uint32_t txMsgCallBack;    /*!< TX callback function pointer */
} bsp_can_tx_header_t;

/* CAN RX message info for FIFO */
typedef struct
{
    uint32_t rxDataId;         /*!< RX CAN ID */
    uint8_t  rxDataLen;        /*!< RX data length */
    uint8_t  aucDataBuf[8];    /*!< RX data buffer */
} bsp_can_rx_info_t;

/* CAN TX/RX buffer for application layer */
typedef bsp_can_msg_t bsp_can_buf_t;

/* CAN callback type */
typedef void (*bsp_can_rx_callback_t)(const bsp_can_msg_t *msg);

/* ===========================================  FIFO API  =========================================== */
/*!
 * @brief Initialize the clock tree required by CAN (and timer tick used by TP/UDS tasking)
 *
 * @return STATUS_SUCCESS if the clock tree is configured correctly
 */
status_t BSP_CAN_ClockInit(void);

/*!
 * @brief Initialize BSP CAN peripheral with FIFO support
 *
 * @return status_t - STATUS_SUCCESS if initialized successfully
 */
status_t BSP_CAN_Init(void);

/*!
 * @brief Deinitialize BSP CAN peripheral
 *
 * @return status_t - STATUS_SUCCESS if deinitialized successfully
 */
status_t BSP_CAN_Deinit(void);

/*!
 * @brief CAN transmit task - call periodically to send messages from TX FIFO
 *        This function should be called in main loop
 *
 * @return none
 */
void BSP_CAN_TxTask(void);

/*!
 * @brief CAN receive task - call periodically to dispatch messages from RX FIFO
 *        to the installed RX callback in task context
 *
 * @return none
 */
void BSP_CAN_RxTask(void);

/*!
 * @brief Check if CAN TX is busy (transmitting)
 *
 * @return true if busy, false otherwise
 */
bool BSP_CAN_IsTxBusy(void);

/*!
 * @brief Abort current CAN TX transmission
 *
 * @return none
 */
void BSP_CAN_AbortTx(void);

/*!
 * @brief Read a message from RX FIFO
 *
 * @param[out] msg - Pointer to message structure to fill
 * @return true if message was read, false if FIFO is empty
 */
bool BSP_CAN_ReadRxFifo(bsp_can_rx_info_t *msg);

/*!
 * @brief Get number of messages available in RX FIFO
 *
 * @return number of messages in RX FIFO
 */
uint16_t BSP_CAN_GetRxFifoCount(void);

/*!
 * @brief CAN STB pin control
 *
 * @param[in] active - 0 = Normal mode, 1 = Standby mode
 * @return none
 */
void BSP_CAN_SetStbPin(uint8_t active);

/* ===========================================  Legacy API (for compatibility)  =========================================== */
/*!
 * @brief Send CAN message (non-blocking)
 *
 * @param[in] id - CAN ID (standard 11-bit)
 * @param[in] dlc - Data length (0-8)
 * @param[in] data - Pointer to data buffer
 * @return status_t - STATUS_SUCCESS/STATUS_BUSY/STATUS_ERROR
 */
status_t BSP_CAN_Transmit(uint32_t id, uint8_t dlc, const uint8_t *data);

/*!
 * @brief Send CAN message (blocking with timeout)
 *
 * @param[in] id - CAN ID (standard 11-bit)
 * @param[in] dlc - Data length (0-8)
 * @param[in] data - Pointer to data buffer
 * @param[in] timeout_ms - Timeout in milliseconds
 * @return status_t - STATUS_SUCCESS/STATUS_TIMEOUT/STATUS_ERROR
 */
status_t BSP_CAN_TransmitBlocking(uint32_t id, uint8_t dlc, const uint8_t *data, uint32_t timeout_ms);

/*!
 * @brief Install CAN receive callback (for legacy compatibility)
 *
 * @param[in] callback - Callback function pointer
 * @return none
 */
void BSP_CAN_InstallRxCallback(bsp_can_rx_callback_t callback);

#ifdef __cplusplus
}
#endif

#endif /* BSP_CAN_H */

/* =============================================  EOF  ============================================== */
