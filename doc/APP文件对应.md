DFDI_APP  ------>   S32K142_CAN_APP

APP_Demo.c/.h ------>src/APP_bootloader_exchange_Info/APP_Demo.c/.h 
boot_cfg.c/.h ------>src/APP_bootloader_exchange_Info/boot/boot_cfg.c/.h
boot.c/.h ------>src/APP_bootloader_exchange_Info/boot/boot.c/.h
bsp_can.c/.h ------>S32K142_CAN_APP这个项目没有专门can的文件，它采用的是can_pal，因此只要保证上层接口移植一致即可
bsp_crc.c/.h ------>src/APP_bootloader_exchange_Info/HAL/crc_hal/CRC.c/.h
bsp_timer.c/.h ------>src/APP_bootloader_exchange_Info/HAL/timer_hal.c/.h
bsp_uart.c/.h ------>该项目没有这个文件，但是打印的应该是在src/APP_bootloader_exchange_Info/Debug，具体参考注释1
bsp_watchdog.c/.h ------>src/APP_bootloader_exchange_Info/HAL/watchdog_hal.c/.h
commom_types.h ------>src/APP_bootloader_exchange_Info/public_inc/commom_types.h
includes.h ------>src/APP_bootloader_exchange_Info/public_inc/includes.h 
toolchain.h ------>src/APP_bootloader_exchange_Info/public_inc/toolchain.h
unifiedStack_autolibc.c/.h ------>src/APP_bootloader_exchange_Info/auto_lib/autolibc.c/.h
unifiedStack_can_tp_cfg.c/.h ------>src/APP_bootloader_exchange_Info/UDS_stack/TP/CAN_TP/can_tp_cfg.c/.h
unifiedStack_can_tp.c/.h ------>src/APP_bootloader_exchange_Info/UDS_stack/TP/CAN_TP/can_tp.c/.h
unifiedStack_mult_cyc_fifo.c/.h ------>src/APP_bootloader_exchange_Info/multi_cyc_fifo.c/.h
unifiedStack_TP_cfg.c/.h ------>src/APP_bootloader_exchange_Info/UDS_stack/TP/TP_cfg.c/.h
unifiedStack_TP.c/.h ------>src/APP_bootloader_exchange_Info//UDS_stack/TP/TP.c/.h
unifiedStack_uds_app_cfg.c/.h ------>src/APP_bootloader_exchange_Info/UDS_stack/UDS/uds_app_cfg.c/.h
unifiedStack_uds_app.c/.h ------>src/APP_bootloader_exchange_Info/UDS_stack/UDS/uds_app.c/.h
main.c ------>src/main.c

！！！注1：S32K142_CAN_APP/src/APP_bootloader_exchange_Info/Debug文件我没有写到DFDI_APP中，因为Debug文件里面其实要么是LED调试（这个LED灯我们本身就没有，不需要），一个就是debug_timer本身在S32K142_CAN_APP在这个项目中被注释掉了也没用，而bootloader_debug本质上其实就是打印，而这个我们DFDI_APP项目中写到了bsp_uart.c/.h上了，因此该项目中就没有移植这个Debug文件夹（你可以验证一下）
注2：S32K142_CAN_APP这个项目有user_config.h,但是DFDI_APP中目前没有，不知道是否需要移植？
注3：由于目前DFDI_APP中不使用LIN，因此和LIN相关的都未移植









