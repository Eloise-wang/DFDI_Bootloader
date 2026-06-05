################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/unified_stack/UDS_stack/TP/LIN_TP/LIN_tp.c \
../src/unified_stack/UDS_stack/TP/LIN_TP/LIN_tp_cfg.c 

OBJS += \
./src/unified_stack/UDS_stack/TP/LIN_TP/LIN_tp.o \
./src/unified_stack/UDS_stack/TP/LIN_TP/LIN_tp_cfg.o 

C_DEPS += \
./src/unified_stack/UDS_stack/TP/LIN_TP/LIN_tp.d \
./src/unified_stack/UDS_stack/TP/LIN_TP/LIN_tp_cfg.d 


# Each subdirectory must supply rules for building sources it contributes
src/unified_stack/UDS_stack/TP/LIN_TP/%.o: ../src/unified_stack/UDS_stack/TP/LIN_TP/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/unified_stack/UDS_stack/TP/LIN_TP/LIN_tp.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


