################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/S32K142_CAN/Debug/bootloader_debug.c \
../src/S32K142_CAN/Debug/debug_IO.c \
../src/S32K142_CAN/Debug/debug_time.c 

OBJS += \
./src/S32K142_CAN/Debug/bootloader_debug.o \
./src/S32K142_CAN/Debug/debug_IO.o \
./src/S32K142_CAN/Debug/debug_time.o 

C_DEPS += \
./src/S32K142_CAN/Debug/bootloader_debug.d \
./src/S32K142_CAN/Debug/debug_IO.d \
./src/S32K142_CAN/Debug/debug_time.d 


# Each subdirectory must supply rules for building sources it contributes
src/S32K142_CAN/Debug/%.o: ../src/S32K142_CAN/Debug/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/S32K142_CAN/Debug/bootloader_debug.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


