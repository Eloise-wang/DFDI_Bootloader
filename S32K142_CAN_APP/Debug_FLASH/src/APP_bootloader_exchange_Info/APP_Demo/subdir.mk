################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/APP_bootloader_exchange_Info/APP_Demo/APP_Demo.c 

OBJS += \
./src/APP_bootloader_exchange_Info/APP_Demo/APP_Demo.o 

C_DEPS += \
./src/APP_bootloader_exchange_Info/APP_Demo/APP_Demo.d 


# Each subdirectory must supply rules for building sources it contributes
src/APP_bootloader_exchange_Info/APP_Demo/%.o: ../src/APP_bootloader_exchange_Info/APP_Demo/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/APP_bootloader_exchange_Info/APP_Demo/APP_Demo.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


