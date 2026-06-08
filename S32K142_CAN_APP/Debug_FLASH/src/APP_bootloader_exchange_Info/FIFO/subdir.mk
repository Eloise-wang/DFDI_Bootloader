################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/APP_bootloader_exchange_Info/FIFO/multi_cyc_fifo.c 

OBJS += \
./src/APP_bootloader_exchange_Info/FIFO/multi_cyc_fifo.o 

C_DEPS += \
./src/APP_bootloader_exchange_Info/FIFO/multi_cyc_fifo.d 


# Each subdirectory must supply rules for building sources it contributes
src/APP_bootloader_exchange_Info/FIFO/%.o: ../src/APP_bootloader_exchange_Info/FIFO/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/APP_bootloader_exchange_Info/FIFO/multi_cyc_fifo.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


