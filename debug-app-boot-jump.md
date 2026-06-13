# [OPEN] Debug Session: app-boot-jump

## Bug Summary

- Symptom: After manual reboot, the device enters APP. Sending `0x1002` from APP causes a reset, but the device still does not stay in Bootloader.
- Latest runtime observation:
  - `APP BSP Init completed.`
  - `RCM_SRS=0x00260000`
  - `Welcome enter AC7840 CAN(500K) APP demo!`

## Hypotheses

1. APP writes `requestEnterBootloader`, but Bootloader-side CRC validation fails after reset.
2. Bootloader starts after reset, but immediately jumps back to APP because `request/stay` conditions are not met.
3. Reset-source combination `0x00260000` takes a path different from the assumed simple WDG reset path.
4. Shared RAM bytes outside the explicit APP-owned fields differ before and after reset, causing protocol inconsistency.
5. The root issue remains the shared RAM contract mismatch between APP and Bootloader.

## Constraints

- No business logic changes before runtime evidence collection.
- First code changes in existing source files must be instrumentation only.

## Plan

1. Add minimal instrumentation around APP flag write and Bootloader early startup checks.
2. Reproduce the issue and compare pre-reset vs post-reset shared RAM snapshots.
3. Confirm or reject each hypothesis based on logs.
4. Apply minimal fix only after evidence is clear.
