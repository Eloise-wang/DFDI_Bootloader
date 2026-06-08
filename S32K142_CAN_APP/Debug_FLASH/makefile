################################################################################
# Automatically-generated file. Do not edit!
################################################################################

-include ../makefile.init

RM := rm -rf

# All of the sources participating in the build are defined here
-include sources.mk
-include src/APP_bootloader_exchange_Info/boot/subdir.mk
-include src/APP_bootloader_exchange_Info/auto_lib/subdir.mk
-include src/APP_bootloader_exchange_Info/UDS_stack/UDS/subdir.mk
-include src/APP_bootloader_exchange_Info/UDS_stack/TP/LIN_TP/subdir.mk
-include src/APP_bootloader_exchange_Info/UDS_stack/TP/CAN_TP/subdir.mk
-include src/APP_bootloader_exchange_Info/UDS_stack/TP/subdir.mk
-include src/APP_bootloader_exchange_Info/HAL/watchdog_hal/subdir.mk
-include src/APP_bootloader_exchange_Info/HAL/timer_hal/subdir.mk
-include src/APP_bootloader_exchange_Info/HAL/crc_hal/subdir.mk
-include src/APP_bootloader_exchange_Info/FIFO/subdir.mk
-include src/APP_bootloader_exchange_Info/Debug/subdir.mk
-include src/APP_bootloader_exchange_Info/APP_Demo/subdir.mk
-include src/subdir.mk
-include board/subdir.mk
-include SDK/rtos/osif/subdir.mk
-include SDK/platform/pal/src/can/subdir.mk
-include SDK/platform/drivers/src/wdog/subdir.mk
-include SDK/platform/drivers/src/pins/subdir.mk
-include SDK/platform/drivers/src/lpuart/subdir.mk
-include SDK/platform/drivers/src/lptmr/subdir.mk
-include SDK/platform/drivers/src/interrupt/subdir.mk
-include SDK/platform/drivers/src/flexcan/subdir.mk
-include SDK/platform/drivers/src/edma/subdir.mk
-include SDK/platform/drivers/src/clock/S32K1xx/subdir.mk
-include SDK/platform/devices/S32K142/startup/subdir.mk
-include SDK/platform/devices/subdir.mk
-include Project_Settings/Startup_Code/subdir.mk
-include subdir.mk
-include objects.mk

ifneq ($(MAKECMDGOALS),clean)
ifneq ($(strip $(C_DEPS)),)
-include $(C_DEPS)
endif
endif

-include ../makefile.defs

# Add inputs and outputs from these tool invocations to the build variables 
SECONDARY_FLASH += \
S32K142_CAN_APP.bin \

SECONDARY_SIZE += \
S32K142_CAN_APP.siz \


# All Target
all: S32K142_CAN_APP.elf secondary-outputs

# Tool invocations
S32K142_CAN_APP.elf: $(OBJS) D:/Git_workplace/S32K142_CAN_UDS_BOOTLOADER/S32K142_CAN_APP/Project_Settings/Linker_Files/S32K142_32_flash.ld $(USER_OBJS)
	@echo 'Building target: $@'
	@echo 'Invoking: Standard S32DS C Linker'
	arm-none-eabi-gcc -o "S32K142_CAN_APP.elf" "@S32K142_CAN_APP.args"  $(USER_OBJS) $(LIBS)
	@echo 'Finished building target: $@'
	@echo ' '

S32K142_CAN_APP.bin: S32K142_CAN_APP.elf
	@echo 'Invoking: Standard S32DS Create Flash Image'
	arm-none-eabi-objcopy -O binary S32K142_CAN_APP.elf  "S32K142_CAN_APP.bin"
	@echo 'Finished building: $@'
	@echo ' '

S32K142_CAN_APP.siz: S32K142_CAN_APP.elf
	@echo 'Invoking: Standard S32DS Print Size'
	arm-none-eabi-size --format=berkeley S32K142_CAN_APP.elf
	@echo 'Finished building: $@'
	@echo ' '

# Other Targets
clean:
	-$(RM) ./*
	-@echo ' '

secondary-outputs: $(SECONDARY_FLASH) $(SECONDARY_SIZE)

.PHONY: all clean dependents

-include ../makefile.targets
