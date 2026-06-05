################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/S32K142_CAN/HAL/flash_hal/flash_hal.c \
../src/S32K142_CAN/HAL/flash_hal/flash_hal_Cfg.c 

OBJS += \
./src/S32K142_CAN/HAL/flash_hal/flash_hal.o \
./src/S32K142_CAN/HAL/flash_hal/flash_hal_Cfg.o 

C_DEPS += \
./src/S32K142_CAN/HAL/flash_hal/flash_hal.d \
./src/S32K142_CAN/HAL/flash_hal/flash_hal_Cfg.d 


# Each subdirectory must supply rules for building sources it contributes
src/S32K142_CAN/HAL/flash_hal/%.o: ../src/S32K142_CAN/HAL/flash_hal/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/S32K142_CAN/HAL/flash_hal/flash_hal.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


