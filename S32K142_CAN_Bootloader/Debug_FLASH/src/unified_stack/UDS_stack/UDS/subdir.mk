################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/unified_stack/UDS_stack/UDS/uds_app.c \
../src/unified_stack/UDS_stack/UDS/uds_app_cfg.c 

OBJS += \
./src/unified_stack/UDS_stack/UDS/uds_app.o \
./src/unified_stack/UDS_stack/UDS/uds_app_cfg.o 

C_DEPS += \
./src/unified_stack/UDS_stack/UDS/uds_app.d \
./src/unified_stack/UDS_stack/UDS/uds_app_cfg.d 


# Each subdirectory must supply rules for building sources it contributes
src/unified_stack/UDS_stack/UDS/%.o: ../src/unified_stack/UDS_stack/UDS/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: Standard S32DS C Compiler'
	arm-none-eabi-gcc "@src/unified_stack/UDS_stack/UDS/uds_app.args" -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


