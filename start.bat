@echo off
echo ======================================
echo LUCT Reporting System - Quick Start
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo + Node.js found
node --version
echo.

echo ======================================
echo Installing Dependencies...
echo ======================================
echo.

REM Install root dependencies
echo Installing root dependencies...
call npm install

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
cd ..

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo Next steps:
echo 1. Create MySQL database: CREATE DATABASE luct_reporting;
echo 2. Import schema: mysql -u root -p luct_reporting ^< backend/database/schema.sql
echo 3. Configure backend/.env with your database credentials
echo 4. Start backend: cd backend ^&^& npm start
echo 5. Start frontend: cd frontend ^&^& npm start
echo.
echo Or use: npm run dev (to start both servers)
echo.
echo Default login credentials:
echo   Lecturer: lecturer@luct.ac.ls / admin123
echo   Student:  student@luct.ac.ls / admin123
echo.
echo For detailed instructions, see SETUP_GUIDE.md
echo ======================================
pause