@echo off
setlocal
cd /d "%~dp0"

echo ========================================
echo DFDI APP package builder
echo ========================================

if not exist "pack_app_package.ps1" goto missing_ps1

if not exist "bin\DFDI_APP_A.bin" goto missing_a
if not exist "bin\DFDI_APP_B.bin" goto missing_b

powershell -NoProfile -ExecutionPolicy Bypass -File ".\pack_app_package.ps1"
if errorlevel 1 goto pack_failed

if not exist "bin\DFDI_APP.bin" goto missing_output

echo.
echo Package created:
echo %cd%\bin\DFDI_APP.bin
pause
exit /b 0

:missing_ps1
echo ERROR: pack_app_package.ps1 not found.
pause
exit /b 1

:missing_a
echo ERROR: bin\DFDI_APP_A.bin not found.
pause
exit /b 1

:missing_b
echo ERROR: bin\DFDI_APP_B.bin not found.
pause
exit /b 1

:pack_failed
echo.
echo ERROR: package build failed.
pause
exit /b 1

:missing_output
echo ERROR: output file bin\DFDI_APP.bin was not created.
pause
exit /b 1
