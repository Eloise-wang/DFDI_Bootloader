################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/driver/flash/flash.c \
../src/driver/flash/flash_cfg.c 

OBJS += \
./src/driver/flash/flash.o \
./src/driver/flash/flash_cfg.o 

C_DEPS += \
./src/driver/flash/flash.d \
./src/driver/flash/flash_cfg.d 


# Each subdirectory must supply rules for building sources it contributes
src/driver/flash/%.o: ../src/driver/flash/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/driver/flash/flash.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


