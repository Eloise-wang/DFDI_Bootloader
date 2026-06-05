################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/S32K142_CAN/boot/boot.c \
../src/S32K142_CAN/boot/boot_Cfg.c 

OBJS += \
./src/S32K142_CAN/boot/boot.o \
./src/S32K142_CAN/boot/boot_Cfg.o 

C_DEPS += \
./src/S32K142_CAN/boot/boot.d \
./src/S32K142_CAN/boot/boot_Cfg.d 


# Each subdirectory must supply rules for building sources it contributes
src/S32K142_CAN/boot/%.o: ../src/S32K142_CAN/boot/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/S32K142_CAN/boot/boot.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


