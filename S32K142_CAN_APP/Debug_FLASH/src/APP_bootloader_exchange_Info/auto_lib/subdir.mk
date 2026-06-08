################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/APP_bootloader_exchange_Info/auto_lib/autolibc.c 

OBJS += \
./src/APP_bootloader_exchange_Info/auto_lib/autolibc.o 

C_DEPS += \
./src/APP_bootloader_exchange_Info/auto_lib/autolibc.d 


# Each subdirectory must supply rules for building sources it contributes
src/APP_bootloader_exchange_Info/auto_lib/%.o: ../src/APP_bootloader_exchange_Info/auto_lib/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/APP_bootloader_exchange_Info/auto_lib/autolibc.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


