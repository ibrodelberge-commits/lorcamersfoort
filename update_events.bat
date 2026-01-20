@echo off
echo ========================================
echo   Lorcamersfoort Event Updater
echo ========================================
echo.

cd /d "%~dp0"

echo Updating events from Ravensburger Play Hub...
echo.

.venv\Scripts\python.exe scraper.py

echo.
echo ========================================
echo   Done! Press any key to close.
echo ========================================
pause > nul
