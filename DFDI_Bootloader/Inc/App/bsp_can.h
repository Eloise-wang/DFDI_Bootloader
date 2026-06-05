/*!
 * @file bsp_can.h
 *
 * @brief BSP CAN interface for AC7840 - CAN0 (PE5/TX, PE6/RX, PE10/STB)
 *
 */

#ifndef BSP_CAN_H
#define BSP_CAN_H

#ifdef __cplusplus
extern "C" {
#endif

/* ===========================================  Includes  =========================================== */
#include "can_drv.h"

/* ============================================  Defines  ============================================ */
#define BSP_CAN_INSTANCE        (0U)          /*!< CAN0 instance */
#define BSP_CAN_BAUDRATE        (500000U)     /*!< 500Kbps */

/* CAN STB pin - PE10 */
#define BSP_CAN_STB_PORT        (PORTE)
#define BSP_CAN_STB_PIN         (10U)
#define BSP_CAN_STB_GPIO        (GPIOE)
#define BSP_CAN_STB_ACTIVE      (1U)          /* 1 = Normal mode, 0 = Standby */

/* ===========================================  Typedef  ============================================ */
/* CAN TX/RX buffer for application layer */
typedef struct
{
    uint32_t id;        /*!< CAN ID */
    uint8_t  dlc;       /*!< Data length */
    uint8_t  data[8];   /*!< Data */
} bsp_can_msg_t;

/* CAN callback type */
typedef void (*bsp_can_rx_callback_t)(const bsp_can_msg_t *msg);

/* ====================================  Functions declaration  ===================================== */
/*!
 * @brief Initialize BSP CAN peripheral
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
 * @brief Install CAN receive callback
 *
 * @param[in] callback - Callback function pointer
 * @return none
 */
void BSP_CAN_InstallRxCallback(bsp_can_rx_callback_t callback);

/*!
 * @brief CAN STB pin control
 *
 * @param[in] active - 1 = Normal mode, 0 = Standby mode
 * @return none
 */
void BSP_CAN_SetStbPin(uint8_t active);

/*!
 * @brief Get CAN TX busy status
 *
 * @return true if TX is busy, false otherwise
 */
bool BSP_CAN_IsTxBusy(void);

#ifdef __cplusplus
}
#endif

#endif /* BSP_CAN_H */

/* =============================================  EOF  ============================================== */
