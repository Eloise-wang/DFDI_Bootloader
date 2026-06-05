################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/unified_stack/Demo/bootloader_main.c 

OBJS += \
./src/unified_stack/Demo/bootloader_main.o 

C_DEPS += \
./src/unified_stack/Demo/bootloader_main.d 


# Each subdirectory must supply rules for building sources it contributes
src/unified_stack/Demo/%.o: ../src/unified_stack/Demo/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/unified_stack/Demo/bootloader_main.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


