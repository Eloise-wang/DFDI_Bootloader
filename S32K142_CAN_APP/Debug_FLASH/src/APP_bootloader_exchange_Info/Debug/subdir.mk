################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/APP_bootloader_exchange_Info/Debug/bootloader_debug.c \
../src/APP_bootloader_exchange_Info/Debug/debug_IO.c \
../src/APP_bootloader_exchange_Info/Debug/debug_timer.c 

OBJS += \
./src/APP_bootloader_exchange_Info/Debug/bootloader_debug.o \
./src/APP_bootloader_exchange_Info/Debug/debug_IO.o \
./src/APP_bootloader_exchange_Info/Debug/debug_timer.o 

C_DEPS += \
./src/APP_bootloader_exchange_Info/Debug/bootloader_debug.d \
./src/APP_bootloader_exchange_Info/Debug/debug_IO.d \
./src/APP_bootloader_exchange_Info/Debug/debug_timer.d 


# Each subdirectory must supply rules for building sources it contributes
src/APP_bootloader_exchange_Info/Debug/%.o: ../src/APP_bootloader_exchange_Info/Debug/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/APP_bootloader_exchange_Info/Debug/bootloader_debug.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


