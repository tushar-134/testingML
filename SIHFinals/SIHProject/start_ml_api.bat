# REM ADDED: Script to start ML API on port 5001
# REM This avoids conflict with backend server on port 5000

@echo off
echo Starting ML Job Matching API on port 5001...
echo.

REM Set port to 5001
set PORT=5001

REM Navigate to ML project directory
cd /d "%~dp0"

REM Start Python Flask app
python app.py

pause
