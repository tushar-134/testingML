# ADDED: Script to start frontend React app on port 3000

@echo off
echo Starting SIH Frontend on port 3000...
echo.

REM Navigate to frontend directory
cd /d "%~dp0"

REM Install dependencies if needed (comment out after first run)
REM npm install

REM Start React app
npm start

pause
