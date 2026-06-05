################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/S32K142_CAN/HAL/UDS_algorithm_hal/AES.c \
../src/S32K142_CAN/HAL/UDS_algorithm_hal/UDS_alg_hal.c 

OBJS += \
./src/S32K142_CAN/HAL/UDS_algorithm_hal/AES.o \
./src/S32K142_CAN/HAL/UDS_algorithm_hal/UDS_alg_hal.o 

C_DEPS += \
./src/S32K142_CAN/HAL/UDS_algorithm_hal/AES.d \
./src/S32K142_CAN/HAL/UDS_algorithm_hal/UDS_alg_hal.d 


# Each subdirectory must supply rules for building sources it contributes
src/S32K142_CAN/HAL/UDS_algorithm_hal/%.o: ../src/S32K142_CAN/HAL/UDS_algorithm_hal/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/S32K142_CAN/HAL/UDS_algorithm_hal/AES.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


