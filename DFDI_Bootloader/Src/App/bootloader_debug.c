#include "bootloader_debug.h"

#ifdef EN_DEBUG_PRINT
#include <stdio.h>
#include <stdarg.h>
#include <string.h>
#include "bsp_uart.h"
#endif

void BOOTLOADER_DEBUG_Init(void)
{
    Debug_InitDebugIO();
    Debug_InitDebugTimer();
    Debug_InitDebugPrint();
}

#ifdef EN_DEBUG_PRINT
void Bootloader_DebugPrintInit(void)
{
    (void)BSP_UART_Init(NULL_PTR);
}

void Bootloader_DebugPrint(const char *fmt, ...)
{
    static char buffer[DEBUG_LOG_BUF_SIZE];
    va_list ap;
    int len;

    va_start(ap, fmt);
    len = vsnprintf(buffer, DEBUG_LOG_BUF_SIZE, fmt, ap);
    va_end(ap);

    if (len > 0)
    {
        uint32 sendLen = (len >= (int)DEBUG_LOG_BUF_SIZE) ? (DEBUG_LOG_BUF_SIZE - 1u) : (uint32)len;
        (void)BSP_UART_Send((const uint8 *)buffer, sendLen);
    }
}
#endif
