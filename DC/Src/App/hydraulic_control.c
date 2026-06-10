/*!
 * @file hydraulic_control.c
 *
 * @brief 液压系统控制逻辑模块实现 - 嵌入式控制架构
 *
 * 功能说明：
 * - 在嵌入式端执行控制算法逻辑（温度控制、压力控制、换向阀逻辑等）
 * - 根据传感器数据和接收的PC端参数配置执行控制决策
 * - 自动控制阀门硬件（不再被动接收PC端命令）
 */

#include "hydraulic_control.h"
#include "valve_control.h"
#include "sensor.h"
#include "debug_log.h"
#include "osif.h"
#include <string.h>

/* ===========================================  Private Variables  =========================================== */

static hydraulic_control_state_t g_control_state;

typedef struct
{
    float median_buf[COOLER_TEMP_MEDIAN_SIZE];
    float avg_buf[COOLER_TEMP_AVG_SIZE];
    uint8_t median_index;
    uint8_t avg_index;
    bool initialized;
} cooler_temp_filter_t;

static cooler_temp_filter_t g_cooler_temp_filter;

/* ===========================================  Private Functions  =========================================== */

/*!
 * @brief 获取当前时间（毫秒）
 */
static uint32_t GetCurrentTimeMs(void)
{
    return OSIF_GetMilliseconds();
}

static void SortFloatArray(float *arr, uint8_t len)
{
    uint8_t i;
    uint8_t j;

    if (arr == NULL || len < 2U) {
        return;
    }

    for (i = 0U; i < (uint8_t)(len - 1U); i++) {
        for (j = 0U; j < (uint8_t)(len - 1U - i); j++) {
            if (arr[j] > arr[j + 1U]) {
                float temp = arr[j];
                arr[j] = arr[j + 1U];
                arr[j + 1U] = temp;
            }
        }
    }
}


static float FilterOilTemperature(float input_temp)
{
    float temp_array[COOLER_TEMP_MEDIAN_SIZE];
    float median_value;
    float sum = 0.0f;
    uint8_t i;

    if (!g_cooler_temp_filter.initialized) {
        for (i = 0U; i < COOLER_TEMP_MEDIAN_SIZE; i++) {
            g_cooler_temp_filter.median_buf[i] = input_temp;
        }

        for (i = 0U; i < COOLER_TEMP_AVG_SIZE; i++) {
            g_cooler_temp_filter.avg_buf[i] = input_temp;
        }

        g_cooler_temp_filter.median_index = 0U;
        g_cooler_temp_filter.avg_index = 0U;
        g_cooler_temp_filter.initialized = true;

        return input_temp;
    }

    /* 1. 更新中值滤波窗口 */
    g_cooler_temp_filter.median_buf[g_cooler_temp_filter.median_index] = input_temp;
    g_cooler_temp_filter.median_index++;
    if (g_cooler_temp_filter.median_index >= COOLER_TEMP_MEDIAN_SIZE) {
        g_cooler_temp_filter.median_index = 0U;
    }

    /* 2. 拷贝窗口并排序，取中值 */
    for (i = 0U; i < COOLER_TEMP_MEDIAN_SIZE; i++) {
        temp_array[i] = g_cooler_temp_filter.median_buf[i];
    }

    SortFloatArray(temp_array, COOLER_TEMP_MEDIAN_SIZE);
    median_value = temp_array[COOLER_TEMP_MEDIAN_SIZE / 2U];

    /* 3. 中值结果再进入平均滤波窗口 */
    g_cooler_temp_filter.avg_buf[g_cooler_temp_filter.avg_index] = median_value;
    g_cooler_temp_filter.avg_index++;
    if (g_cooler_temp_filter.avg_index >= COOLER_TEMP_AVG_SIZE) {
        g_cooler_temp_filter.avg_index = 0U;
    }

    /* 4. 求平均 */
    for (i = 0U; i < COOLER_TEMP_AVG_SIZE; i++) {
        sum += g_cooler_temp_filter.avg_buf[i];
    }

    return (sum / (float)COOLER_TEMP_AVG_SIZE);
}

/*!
 * @brief 检查是否应该启动换向阀（对应需求3）
 *
 * 对应需求描述：
 *  3. 在旁通阀从50%下降到0%的过程中，当检测到旁通比例小于25%的时候检测油压值，
 *     当油压值大于set_rev_start_oilP_max或者小于set_rev_start_oilP_min时，启动换向阀。
 *
 * 实现逻辑：
 *  - 旁通阀必须正在下降（bypass_decline_active == true）
 *  - 旁通阀开度必须小于25%
 *  - 油压必须满足：oil_pressure > set_rev_start_oilP_max 或 oil_pressure < set_rev_start_oilP_min
 */
static bool ShouldStartReversalValve(float oil_pressure)
{
    if (!g_control_state.bypass_decline_active) {
        return false;
    }
    
    // 检查旁通阀是否小于25%（在下降过程中）
    if (g_control_state.current_bypass_duty >= 25.0f) {
        return false;
    }
    
    // 检查油压是否超出范围（大于上限或小于下限）
    float max_p = g_control_state.params.set_rev_start_oilP_max;  // 上限
    float min_p = g_control_state.params.set_rev_start_oilP_min;  // 下限
    
    // 当油压大于上限或小于下限时，启动换向阀
    return (oil_pressure > max_p || oil_pressure < min_p);
}

/*!
 * @brief 更新换向频率统计（对应需求8）
 *
 * 需求8：换向阀开关一次作为一次换向，换向频率的计算为1分钟的换向次数。
 * 实现方式：
 *  - 每次换向事件调用 RecordReversalEvent() 递增计数；
 *  - 每隔 REV_FREQ_CALC_WINDOW_MS（60s）将窗口内计数写入 rev_freq_per_min，
 *    然后清零重新统计。
 *  - 如果窗口未满60秒，按比例计算当前频率（实时显示）
 */
static void UpdateReversalFrequency(void)
{
    uint32_t current_time = GetCurrentTimeMs();
    uint32_t window_elapsed = current_time - g_control_state.rev_count_window_start;
    
    // 检查是否需要重置统计窗口
    if (window_elapsed >= REV_FREQ_CALC_WINDOW_MS) {
        // 计算频率（次/分钟）
        g_control_state.rev_freq_per_min = g_control_state.rev_count_in_window;
        
        // 重置窗口
        g_control_state.rev_count_window_start = current_time;
        g_control_state.rev_count_in_window = 0;
    } else if (window_elapsed > 0) {
        // 窗口未满60秒，按比例计算当前频率（实时显示）
        // 频率 = (当前计数 / 已过时间(秒)) * 60
        float elapsed_seconds = (float)window_elapsed / 1000.0f;
        if (elapsed_seconds > 0.0f) {
            float current_freq = ((float)g_control_state.rev_count_in_window / elapsed_seconds) * 60.0f;
            g_control_state.rev_freq_per_min = (uint16_t)current_freq;
        }
    }
}

/*!
 * @brief 记录换向事件（两次状态翻转算一次换向）
 *
 * 换向定义：
 *  - 换向阀状态每发生一次翻转（ON->OFF 或 OFF->ON）记为一次“翻转”；
 *  - 两次翻转累计算 1 次换向（例如：ON->OFF->ON）。
 *
 * 实现方式：
 *  - rev_last_state 记录上一次阀门状态；
 *  - rev_toggle_count 记录翻转次数；
 *  - 每检测到一次状态变化，rev_toggle_count++；
 *  - 当 rev_toggle_count >= 2 时：
 *        rev_count_in_window++；
 *        rev_toggle_count = 0；
 */

static void RecordReversalEvent(void)
{
    bool current_state = ValveControl_GetDirectionalValveState() == VALVE_STATE_ON;

    if (current_state != g_control_state.rev_last_state)
    {
        g_control_state.rev_toggle_count++;   // 记录一次翻转
        g_control_state.rev_last_state = current_state;

        if (g_control_state.rev_toggle_count >= 2)
        {
            g_control_state.rev_count_in_window++;  // 记录一次换向
            g_control_state.rev_toggle_count = 0;   // 清零重新累计
        }
    }
}

/*!
 * @brief 处理旁通阀线性下降（对应需求2）
 *
 * 需求2：设备运作之后，会接收到 CAN 传过来的旁通阀 50%（set_bypass_ratio）的信号，
 *        然后旁通阀从 50% 在 T 秒（set_bypass_initial_decline_time）内线性下降到 0。
 *
 * 实现方式：
 *  - 当系统进入 SYSTEM_STATE_INITIALIZING 状态时，
 *    current_bypass_duty 初始化为 set_bypass_ratio（默认 50%）；
 *  - 在 0~T 秒之间按线性比例从 start_duty 下降到 0；
 *  - 超过 T 秒或 T=0 时，直接置为 0 并结束下降流程。
 */
static void ProcessBypassValveDecline(void)
{
    if (!g_control_state.bypass_decline_active) {
        return;
    }
    
    uint32_t current_time = GetCurrentTimeMs();
    uint32_t elapsed_time = current_time - g_control_state.bypass_decline_start_time;
    float decline_time_ms = g_control_state.params.set_bypass_initial_decline_time * 1000.0f;
    
    if (decline_time_ms <= 0.0f) {
        // 如果下降时间为0，直接设置为0
        g_control_state.current_bypass_duty = 0.0f;
        g_control_state.bypass_decline_active = false;
    } else if (elapsed_time >= (uint32_t)decline_time_ms) {
        // 下降完成
        g_control_state.current_bypass_duty = 0.0f;
        g_control_state.bypass_decline_active = false;
    } else {
        // 线性下降计算：从50%线性下降到0%
        // 注意：初始值固定为50%，不受set_bypass_ratio参数影响
        float start_duty = 50.0f;  // 固定从50%开始下降
        float progress = (float)elapsed_time / decline_time_ms;
        g_control_state.current_bypass_duty = start_duty * (1.0f - progress);
        
        if (g_control_state.current_bypass_duty < 0.0f) {
            g_control_state.current_bypass_duty = 0.0f;
        }
    }
    
    // 设置旁通阀开度
    ValveControl_SetBypassValve(g_control_state.current_bypass_duty);
}

/*!
 * @brief 处理换向阀第一阶段（对应需求4）
 *
 * 需求4：换向阀一旦开始启动，就进入第一阶段（不可逆），之后换向阀以固定频率运行：
 *        固定开 T1（set_first_fix_freq_time_on）秒，固定关 T2（set_first_fix_freq_time_off）秒。
 *
 * 实现方式：
 *  - system_state == SYSTEM_STATE_REV_PHASE1 时启用该逻辑；
 *  - 当前阀门为“开”状态时，到达 T1 秒后切换为“关”；
 *  - 当前阀门为“关”状态时，到达 T2 秒后切换为“开”；
 *  - 每次从开→关或关→开时调用 RecordReversalEvent() 记录一次换向。
 */
static void ProcessReversalValvePhase1(void)
{
    if (g_control_state.system_state != SYSTEM_STATE_REV_PHASE1) {
        return;
    }
    
    uint32_t current_time = GetCurrentTimeMs();
    uint32_t state_duration = current_time - g_control_state.rev_state_change_time;
    
    bool current_state = ValveControl_GetDirectionalValveState() == VALVE_STATE_ON;
    
    if (current_state) {
        // 当前是开启状态
        float time_on_ms = g_control_state.params.set_first_fix_freq_time_on * 1000.0f;
        if (state_duration >= (uint32_t)time_on_ms) {
            // 切换到关闭状态
            ValveControl_SetDirectionalValve(false);
            g_control_state.rev_state_change_time = current_time;
            RecordReversalEvent();
        }
    } else {
        // 当前是关闭状态
        float time_off_ms = g_control_state.params.set_first_fix_freq_time_off * 1000.0f;
        if (state_duration >= (uint32_t)time_off_ms) {
            // 切换到开启状态
            ValveControl_SetDirectionalValve(true);
            g_control_state.rev_state_change_time = current_time;
            RecordReversalEvent();
        }
    }
}

/*!
 * @brief 处理换向阀第二阶段（对应需求5和需求6）
 *
 * 需求5（压力区间控制）：
 *  - 当检测到油压 >= N3（set_second_rev_oilP_max）时，换向阀置 off
 *  - 当检测到油压 <= N4（set_second_rev_oilP_min）时，换向阀置 on
 *  - 当油压位于 N3 与 N4 之间时，保持之前的运行状态。
 *
 * 实现方式概述：
 *  - rev_state 用 REV_STATE_IDLE/ON/OFF 描述当前控制状态；
 *  - 正常控制时根据 oil_pressure 与 N3/N4 判定是否需要开启换向阀；
 */
static void ProcessReversalValvePhase2(float oil_pressure)
{
    if (g_control_state.system_state != SYSTEM_STATE_REV_PHASE2) {
        return;
    }
    
    uint32_t now_ms = GetCurrentTimeMs();
    bool valve_on = (ValveControl_GetDirectionalValveState() == VALVE_STATE_ON);
    
    float max_p = g_control_state.params.set_second_rev_oilP_max;
    float min_p = g_control_state.params.set_second_rev_oilP_min;

    if (g_control_state.rev_state != REV_STATE_ON && g_control_state.rev_state != REV_STATE_OFF) {
        g_control_state.rev_state = valve_on ? REV_STATE_ON : REV_STATE_OFF;
    }
    
    bool has_target = true;
    bool target_on = valve_on;
    if (oil_pressure >= max_p) {
        target_on = false;
    } else if (oil_pressure <= min_p) {
        target_on = true;
    } else {
        has_target = false;
    }

    if (!has_target || target_on == valve_on) {
        return;
    }

    ValveControl_SetDirectionalValve(target_on);
    g_control_state.rev_state = target_on ? REV_STATE_ON : REV_STATE_OFF;
    g_control_state.rev_state_change_time = now_ms;
    RecordReversalEvent();

    if (target_on) {
        Debug_Log("[PHASE2] Pressure control: OilP=%.2fMPa <= Min=%.2fMPa, Directional Valve -> ON\r\n", oil_pressure, min_p);
    } else {
        Debug_Log("[PHASE2] Pressure control: OilP=%.2fMPa >= Max=%.2fMPa, Directional Valve -> OFF\r\n", oil_pressure, max_p);
    }
}

/*!
 * @brief 处理风冷器控制（对应需求7，以及扩展的运行保护逻辑）
 *
 * 需求7：当检测到油温 > W1（set_cooler_temperature_on）时开启风冷器；
 *        当油温 < W2（set_cooler_temperature_off）时关闭风冷器。
 *
 * 扩展逻辑：
 *  - 油温先经过中值 + 平均滤波，减少抖动引起的频繁开关；
 *  - 增加最小运行时间与最小停机时间保护：
 *    - 开启后至少运行 COOLER_MIN_ON_TIME_MS；
 *    - 关闭后至少等待 COOLER_MIN_OFF_TIME_MS 才允许再次开启；
 *  - 保留风冷器最大运行时间和强制关闭时间：
 *    - 连续运行超过 COOLER_MAX_RUN_TIME_MS → 强制关闭；
 *    - 强制关闭持续 COOLER_FORCE_OFF_DURATION_MS 后恢复正常控制。
 */
static void ProcessCoolerControl(float oil_temperature)
{
    uint32_t current_time = GetCurrentTimeMs();
    float temp_on;
    float temp_off;

    /* 先做中值 + 平均滤波 */
    oil_temperature = FilterOilTemperature(oil_temperature);

    /* 检查强制关闭状态 */
    if (g_control_state.cooler_force_off_active) {
        uint32_t force_off_duration = current_time - g_control_state.cooler_force_off_start_time;

        if (force_off_duration >= COOLER_FORCE_OFF_DURATION_MS) {
            /* 强制关闭时间结束，恢复正常检测 */
            g_control_state.cooler_force_off_active = false;
            g_control_state.cooler_stop_time = current_time;
        } else {
            /* 强制关闭期间，保持关闭状态 */
            ValveControl_SetCooler(false);
            g_control_state.cooler_enabled = false;
            return;
        }
    }

    /* 检查是否达到最大运行时间 */
    if (g_control_state.cooler_enabled && (g_control_state.cooler_start_time > 0U)) {
        uint32_t run_duration = current_time - g_control_state.cooler_start_time;

        if (run_duration >= COOLER_MAX_RUN_TIME_MS) {
            /* 达到最大连续运行时间，强制关闭 */
            ValveControl_SetCooler(false);
            g_control_state.cooler_enabled = false;
            g_control_state.cooler_force_off_active = true;
            g_control_state.cooler_force_off_start_time = current_time;
            g_control_state.cooler_start_time = 0U;
            g_control_state.cooler_stop_time = current_time;
            return;
        }
    }

    /* 正常温度控制 */
    temp_on = g_control_state.params.set_cooler_temperature_on;
    temp_off = g_control_state.params.set_cooler_temperature_off;

    if (oil_temperature > temp_on) {
        /* 温度高于开启阈值，开启风冷器，但需满足最小停机时间 */
        if (!g_control_state.cooler_enabled) {
            uint32_t off_duration = current_time - g_control_state.cooler_stop_time;

            if ((g_control_state.cooler_stop_time == 0U) ||
                (off_duration >= COOLER_MIN_OFF_TIME_MS)) {
                ValveControl_SetCooler(true);
                g_control_state.cooler_enabled = true;
                g_control_state.cooler_start_time = current_time;
            }
        }
    } else if (oil_temperature < temp_off) {
        /* 温度低于关闭阈值，关闭风冷器，但需满足最小运行时间 */
        if (g_control_state.cooler_enabled) {
            uint32_t run_duration = current_time - g_control_state.cooler_start_time;

            if ((g_control_state.cooler_start_time == 0U) ||
                (run_duration >= COOLER_MIN_ON_TIME_MS)) {
                ValveControl_SetCooler(false);
                g_control_state.cooler_enabled = false;
                g_control_state.cooler_start_time = 0U;
                g_control_state.cooler_stop_time = current_time;
            }
        }
    } else {
        /* 位于滞回区间内，不动作，保持当前状态 */
    }
}

/* ===========================================  Public Functions  =========================================== */

void HydraulicControl_Init(void)
{
    memset(&g_control_state, 0, sizeof(g_control_state));
		memset(&g_cooler_temp_filter, 0, sizeof(g_cooler_temp_filter));
    
    g_control_state.system_state = SYSTEM_STATE_DISABLED;
    g_control_state.rev_state = REV_STATE_IDLE;
    g_control_state.current_bypass_duty = 0.0f;
    g_control_state.rev_count_window_start = GetCurrentTimeMs();
    g_control_state.rev_last_state = false;  // 初始化上一个状态为关闭
    
    // 设置默认参数（防止未初始化）
    g_control_state.params.set_bypass_ratio = 50.0f;
    g_control_state.params.set_bypass_initial_decline_time = 10.0f;
    g_control_state.params.set_rev_start_oilP_max = 1.2f;
    g_control_state.params.set_rev_start_oilP_min = 0.9f;
    g_control_state.params.set_first_fix_freq_time_on = 1.0f;
    g_control_state.params.set_first_fix_freq_time_off = 1.0f;
    g_control_state.params.set_second_rev_oilP_max = 11.5f;
    g_control_state.params.set_second_rev_oilP_min = 4.5f;
    g_control_state.params.set_cooler_temperature_on = 55.0f;
    g_control_state.params.set_cooler_temperature_off = 50.0f;
}

void HydraulicControl_UpdateParams(const control_params_t *params)
{
    if (params != NULL) {
        memcpy(&g_control_state.params, params, sizeof(control_params_t));
        
        // 如果系统已使能且下降已完成，根据set_bypass_ratio参数控制旁通阀
        // 注意：下降流程只在系统启动时执行一次，不会因为参数改变而重新启动
        // 只有在下降完成后（bypass_decline_active == false）且不在初始化阶段时，才根据set_bypass_ratio控制
        if (g_control_state.params.system_enable && 
            !g_control_state.bypass_decline_active &&
            g_control_state.system_state != SYSTEM_STATE_DISABLED &&
            g_control_state.system_state != SYSTEM_STATE_INITIALIZING) {
            // 下降已完成，根据CAN传来的set_bypass_ratio控制旁通阀
            g_control_state.current_bypass_duty = (float)g_control_state.params.set_bypass_ratio;
            if (g_control_state.current_bypass_duty < 0.0f) g_control_state.current_bypass_duty = 0.0f;
            if (g_control_state.current_bypass_duty > 50.0f) g_control_state.current_bypass_duty = 50.0f;
            ValveControl_SetBypassValve(g_control_state.current_bypass_duty);
        }
    }
}

void HydraulicControl_SetSystemEnable(bool enable)
{
    g_control_state.params.system_enable = enable;
    
    if (!enable) {
        // 系统禁用，关闭所有执行器
        g_control_state.system_state = SYSTEM_STATE_DISABLED;
        ValveControl_SetBypassValve(0.0f);
        ValveControl_SetDirectionalValve(false);
        ValveControl_SetCooler(false);
        g_control_state.bypass_decline_active = false;
        g_control_state.reversal_valve_enabled = false;
        g_control_state.cooler_enabled = false;
    } else {
        // 系统使能，开始初始化阶段
        // 注意：只有在从禁用状态变为使能状态时，才重新初始化
        // 如果系统已经在运行（REV_PHASE1/REV_PHASE2），不应该重新初始化，避免打断正在进行的流程
        if (g_control_state.system_state == SYSTEM_STATE_DISABLED) {
            // 从禁用状态变为使能状态，开始初始化
            g_control_state.system_state = SYSTEM_STATE_INITIALIZING;
            // 旁通阀初始值固定为50%，不受TSMaster参数影响（按需求：旁通阀初始值为50%）
            g_control_state.current_bypass_duty = 50.0f;
            g_control_state.bypass_decline_start_time = GetCurrentTimeMs();
            g_control_state.bypass_decline_active = true;
            // 重置换向阀状态
            g_control_state.reversal_valve_enabled = false;
            ValveControl_SetBypassValve(g_control_state.current_bypass_duty);
        }
        // 如果系统已经在运行（不是DISABLED状态），不做任何操作，保持当前状态
    }
}

void HydraulicControl_Process(float oil_pressure, float oil_temperature)
{
    // 更新换向频率统计
    UpdateReversalFrequency();
    
    // 如果系统未使能，不执行控制逻辑
    if (!g_control_state.params.system_enable) {
        return;
    }
    
    // 处理旁通阀线性下降（需求2）
    // 注意：旁通阀下降应该独立于系统状态，只要bypass_decline_active==true就继续下降
    // 即使换向阀已经启动，旁通阀也应该继续下降到0%
    if (g_control_state.bypass_decline_active) {
        ProcessBypassValveDecline();
    }
    
    // 在初始化阶段，检查是否应该启动换向阀（需求3）
    if (g_control_state.system_state == SYSTEM_STATE_INITIALIZING) {
        // 检查是否应该启动换向阀（需求3）
        if (ShouldStartReversalValve(oil_pressure) && !g_control_state.reversal_valve_enabled) {
            g_control_state.reversal_valve_enabled = true;
            g_control_state.system_state = SYSTEM_STATE_WAITING_REV;
            // 立即启动换向阀，进入第一阶段
            g_control_state.system_state = SYSTEM_STATE_REV_PHASE1;
            g_control_state.rev_phase1_start_time = GetCurrentTimeMs();
            g_control_state.rev_state_change_time = GetCurrentTimeMs();
            ValveControl_SetDirectionalValve(false);
            g_control_state.rev_state = REV_STATE_OFF;
            RecordReversalEvent();
        }
        
        // 如果旁通阀下降到0，但换向阀还未启动，进入等待状态
        if (!g_control_state.bypass_decline_active && !g_control_state.reversal_valve_enabled) {
            g_control_state.system_state = SYSTEM_STATE_WAITING_REV;
        }
    }
    
    // 如果下降已完成，根据CAN传来的set_bypass_ratio控制旁通阀
    if (g_control_state.params.system_enable && 
        !g_control_state.bypass_decline_active &&
        g_control_state.system_state != SYSTEM_STATE_DISABLED &&
        g_control_state.system_state != SYSTEM_STATE_INITIALIZING) {
        // 下降已完成，根据set_bypass_ratio参数控制旁通阀
        float target_duty = (float)g_control_state.params.set_bypass_ratio;
        if (target_duty < 0.0f) target_duty = 0.0f;
        if (target_duty > 50.0f) target_duty = 50.0f;
        
        // 只有当目标值与当前值不同时才更新
        if (g_control_state.current_bypass_duty != target_duty) {
            g_control_state.current_bypass_duty = target_duty;
            ValveControl_SetBypassValve(g_control_state.current_bypass_duty);
        }
    }
    
    // 处理换向阀第一阶段（需求4）
    if (g_control_state.system_state == SYSTEM_STATE_REV_PHASE1) {
		Debug_Log("[PHASE1] Checking phase transition: OilP=%.2fMPa, HighThreshold=%.2fMPa\r\n", oil_pressure, g_control_state.params.set_second_rev_oilP_max);
		
        // 先检测是否进入第二阶段（不可逆）
        if (oil_pressure >= g_control_state.params.set_second_rev_oilP_max) {
			Debug_Log("[PHASE1->PHASE2] Transition triggered: OilP=%.2fMPa >= HighThreshold=%.2fMPa\r\n", oil_pressure, g_control_state.params.set_second_rev_oilP_max);
            g_control_state.system_state = SYSTEM_STATE_REV_PHASE2;
            uint32_t now_ms = GetCurrentTimeMs();
            g_control_state.rev_phase2_start_time = now_ms;
            g_control_state.rev_state_change_time = now_ms;
			Debug_Log("[PHASE2] Phase2 started: Pressure control active\r\n");
            // 第二阶段入口仅进行阶段切换与计时重置，不立即改变阀门状态
            // 不可逆：后续不再返回第一阶段，由第二阶段逻辑根据油压阈值自行控制
        } else {
            // 未达到第二阶段条件，继续第一阶段固定频率逻辑
			Debug_Log("[PHASE1] OilP=%.2fMPa < HighThreshold=%.2fMPa, continue fixed frequency control\r\n",oil_pressure, g_control_state.params.set_second_rev_oilP_max);
            ProcessReversalValvePhase1();
        }
    }
    
    // 处理换向阀第二阶段（需求5和需求6）
    if (g_control_state.system_state == SYSTEM_STATE_REV_PHASE2) {
        ProcessReversalValvePhase2(oil_pressure);
    }
    
    // 处理风冷器控制（需求7和需求9）
    ProcessCoolerControl(oil_temperature);
}

system_state_t HydraulicControl_GetSystemState(void)
{
    return g_control_state.system_state;
}

uint16_t HydraulicControl_GetReversalFrequency(void)
{
    return g_control_state.rev_freq_per_min;
}

const hydraulic_control_state_t* HydraulicControl_GetState(void)
{
    return &g_control_state;
}
