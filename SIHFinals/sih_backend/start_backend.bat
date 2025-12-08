# ADDED: Script to start backend server on port 5000
# This will call the ML API on port 5001

@echo off
echo Starting SIH Backend Server on port 5000...
echo.

REM Navigate to backend directory
cd /d "%~dp0"

REM Install dependencies if needed (comment out after first run)
REM npm install

REM Start the server
npm start

pause
