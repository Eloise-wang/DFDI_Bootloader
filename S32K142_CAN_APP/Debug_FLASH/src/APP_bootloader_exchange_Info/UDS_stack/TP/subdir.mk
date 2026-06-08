################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/APP_bootloader_exchange_Info/UDS_stack/TP/TP.c \
../src/APP_bootloader_exchange_Info/UDS_stack/TP/TP_cfg.c 

OBJS += \
./src/APP_bootloader_exchange_Info/UDS_stack/TP/TP.o \
./src/APP_bootloader_exchange_Info/UDS_stack/TP/TP_cfg.o 

C_DEPS += \
./src/APP_bootloader_exchange_Info/UDS_stack/TP/TP.d \
./src/APP_bootloader_exchange_Info/UDS_stack/TP/TP_cfg.d 


# Each subdirectory must supply rules for building sources it contributes
src/APP_bootloader_exchange_Info/UDS_stack/TP/%.o: ../src/APP_bootloader_exchange_Info/UDS_stack/TP/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/APP_bootloader_exchange_Info/UDS_stack/TP/TP.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


