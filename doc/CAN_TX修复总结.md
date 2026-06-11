# CAN_TX修复总结

## 现象
- `TEST_CAN` 初始化正常，首帧可以发送成功。
- 后续周期发送无报文，CAN盒只能收到首帧。

## 根因
- `CAN` 本身初始化和时钟配置正常。
- 问题出在测试发送依赖的 `TIMER_HAL_Init()` 没有可用的 `TIMER_CLK` 时钟源，导致 `100ms` 周期任务未触发。

## 修复内容
- 保持 `SPLL -> CORE_CLK -> CAN0_CLK/2` 配置，确保 `CAN0_CLK = 60MHz`。
- 在 `BSP_CAN_ClockInit()` 中补充 `TIMER_CLK = HSEDIV2_CLK` 配置。
- 修正 `bsp_can` 中 `500Kbps` 位时序参数。
- 保持 `PE10` 作为 GPIO 控制收发器 `STB` 引脚。

## 修复结果
- CAN盒已可稳定收到周期发送帧。
- 说明 `CAN_TX` 发送链路已恢复正常。
