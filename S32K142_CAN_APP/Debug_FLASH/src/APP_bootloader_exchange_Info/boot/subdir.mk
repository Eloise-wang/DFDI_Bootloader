################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/APP_bootloader_exchange_Info/boot/boot.c \
../src/APP_bootloader_exchange_Info/boot/boot_Cfg.c 

OBJS += \
./src/APP_bootloader_exchange_Info/boot/boot.o \
./src/APP_bootloader_exchange_Info/boot/boot_Cfg.o 

C_DEPS += \
./src/APP_bootloader_exchange_Info/boot/boot.d \
./src/APP_bootloader_exchange_Info/boot/boot_Cfg.d 


# Each subdirectory must supply rules for building sources it contributes
src/APP_bootloader_exchange_Info/boot/%.o: ../src/APP_bootloader_exchange_Info/boot/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/APP_bootloader_exchange_Info/boot/boot.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


