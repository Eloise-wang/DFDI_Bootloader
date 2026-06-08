################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/APP_bootloader_exchange_Info/HAL/crc_hal/CRC_hal.c 

OBJS += \
./src/APP_bootloader_exchange_Info/HAL/crc_hal/CRC_hal.o 

C_DEPS += \
./src/APP_bootloader_exchange_Info/HAL/crc_hal/CRC_hal.d 


# Each subdirectory must supply rules for building sources it contributes
src/APP_bootloader_exchange_Info/HAL/crc_hal/%.o: ../src/APP_bootloader_exchange_Info/HAL/crc_hal/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/APP_bootloader_exchange_Info/HAL/crc_hal/CRC_hal.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


