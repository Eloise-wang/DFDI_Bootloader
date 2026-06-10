/*!
 * @file hydraulic_control.h
 *
 * @brief 液压系统控制逻辑模块
 *
 * 实现需求文档中的完整控制逻辑：
 * 1. 系统使能控制
 * 2. 旁通阀线性下降控制
 * 3. 换向阀阶段控制（第一阶段、第二阶段）
 * 4. 换向阀超时保护
 * 5. 风冷器温度控制
 * 6. 换向频率统计
 * 7. 风冷器强制关闭保护
 */

#ifndef HYDRAULIC_CONTROL_H
#define HYDRAULIC_CONTROL_H

#ifdef __cplusplus
extern "C" {
#endif

/* ===========================================  Includes  =========================================== */
#include <stdint.h>
#include <stdbool.h>
#include "common_types.h"

/* ============================================  Define  ============================================ */

/* 时间常量定义 */
#define COOLER_FORCE_OFF_DURATION_MS    (5U * 60U * 1000U)  // 风冷器强制关闭持续时间：5分钟
#define COOLER_MAX_RUN_TIME_MS          (2U * 60U * 60U * 1000U)  // 风冷器最大运行时间：2小时
#define COOLER_MIN_ON_TIME_MS           (20U * 60U * 1000U)               // 风冷器最小运行时间：20min
#define COOLER_MIN_OFF_TIME_MS          (20U * 1000U)                    // 风冷器最小停机时间：20秒
#define REV_FREQ_CALC_WINDOW_MS         (60U * 1000U)  			// 换向频率计算窗口：1分钟
	
/* 风冷器温度滤波参数 */
#define COOLER_TEMP_MEDIAN_SIZE         (5U)                        // 中值滤波窗口
#define COOLER_TEMP_AVG_SIZE            (8U)                        // 平均滤波窗口

/* ===========================================  Typedef  ============================================ */

/**
 * @brief 系统运行状态
 */
typedef enum {
    SYSTEM_STATE_DISABLED = 0,      // 系统禁用
    SYSTEM_STATE_INITIALIZING,       // 初始化中（旁通阀下降阶段）
    SYSTEM_STATE_WAITING_REV,       // 等待换向阀启动
    SYSTEM_STATE_REV_PHASE1,        // 换向阀第一阶段
    SYSTEM_STATE_REV_PHASE2         // 换向阀第二阶段
} system_state_t;

/**
 * @brief 换向阀控制状态
 */
typedef enum {
    REV_STATE_IDLE = 0,             // 空闲
    REV_STATE_ON,                   // 开启状态
    REV_STATE_OFF,                  // 关闭状态
    REV_STATE_FORCE_ON,             // 强制开启
    REV_STATE_FORCE_OFF              // 强制关闭
} reversal_valve_control_state_t;

/**
 * @brief 控制参数结构体
 */
typedef struct {
    // 系统控制
    bool system_enable;                          // 系统使能
    
    // 旁通阀控制参数
    float set_bypass_ratio;                      // 旁通阀初始开度（%）
    float set_bypass_initial_decline_time;       // 旁通阀下降时间（秒）
    
    // 换向阀启动参数
    float set_rev_start_oilP_max;               // 换向阀启动油压上限（MPa）
    float set_rev_start_oilP_min;               // 换向阀启动油压下限（MPa）
    
    // 第一阶段参数
    float set_first_fix_freq_time_on;           // 第一阶段开启时间（秒）
    float set_first_fix_freq_time_off;          // 第一阶段关闭时间（秒）
    
    // 第二阶段参数
    float set_second_rev_oilP_max;              // 第二阶段最大油压（MPa）
    float set_second_rev_oilP_min;              // 第二阶段最小油压（MPa）
    float set_second_on_overtime;                // 第二阶段开启超时（秒）
    float set_second_off_overtime;               // 第二阶段关闭超时（秒）
    float set_rev_compel_time_on;               // 强制开启时间（秒）
    float set_rev_compel_time_off;              // 强制关闭时间（秒）
    
    // 风冷器控制参数
    float set_cooler_temperature_on;            // 风冷器开启温度（°C）
    float set_cooler_temperature_off;           // 风冷器关闭温度（°C）
} control_params_t;

/**
 * @brief 控制状态结构体
 */
typedef struct {
    system_state_t system_state;                 // 系统状态
    reversal_valve_control_state_t rev_state;    // 换向阀控制状态
    
    // 旁通阀控制
    float current_bypass_duty;                   // 当前旁通阀开度（%）
    uint32_t bypass_decline_start_time;          // 旁通阀下降开始时间（ms）
    bool bypass_decline_active;                  // 旁通阀下降激活标志
    
    // 换向阀控制
    bool reversal_valve_enabled;                 // 换向阀使能标志
    uint32_t rev_phase1_start_time;              // 第一阶段开始时间（ms）
    uint32_t rev_phase2_start_time;              // 第二阶段开始时间（ms）
    uint32_t rev_state_change_time;              // 换向阀状态改变时间（ms）
    bool rev_last_state;                         // 换向阀上一个状态
    
    // 换向频率统计
    uint32_t rev_count_window_start;             	// 频率统计窗口开始时间（ms）
    uint16_t rev_count_in_window;                	// 窗口内换向次数
    uint16_t rev_freq_per_min;                   	// 换向频率（次/分钟）
		uint8_t  rev_toggle_count;         						// 状态翻转计数（两次翻转=一次换向）
    
    // 风冷器控制
    bool cooler_enabled;                         // 风冷器使能标志
    uint32_t cooler_start_time;                  // 风冷器启动时间（ms）
		uint32_t cooler_stop_time;                    // 风冷器关闭时间（ms）
    uint32_t cooler_force_off_start_time;        // 风冷器强制关闭开始时间（ms）
    bool cooler_force_off_active;                 // 风冷器强制关闭激活标志
    
    // 控制参数
    control_params_t params;                     // 控制参数
} hydraulic_control_state_t;

/* ==========================================  Functions  =========================================== */

/* ==================== 初始化函数 ==================== */

/*!
 * @brief 初始化液压控制模块
 */
void HydraulicControl_Init(void);

/* ==================== 参数设置函数 ==================== */

/*!
 * @brief 更新控制参数
 * @param params 控制参数结构体指针
 */
void HydraulicControl_UpdateParams(const control_params_t *params);

/*!
 * @brief 设置系统使能状态
 * @param enable 使能状态
 */
void HydraulicControl_SetSystemEnable(bool enable);

/* ==================== 控制逻辑函数 ==================== */

/*!
 * @brief 液压控制主循环（需要周期性调用，建议10ms周期）
 * @param oil_pressure 当前油压（MPa）
 * @param oil_temperature 当前油温（°C）
 */
void HydraulicControl_Process(float oil_pressure, float oil_temperature);

/* ==================== 状态查询函数 ==================== */

/*!
 * @brief 获取系统状态
 * @return 系统状态
 */
system_state_t HydraulicControl_GetSystemState(void);

/*!
 * @brief 获取换向频率（次/分钟）
 * @return 换向频率
 */
uint16_t HydraulicControl_GetReversalFrequency(void);

/*!
 * @brief 获取控制状态数据
 * @return 控制状态数据指针
 */
const hydraulic_control_state_t* HydraulicControl_GetState(void);

#ifdef __cplusplus
}
#endif

#endif /* HYDRAULIC_CONTROL_H */

