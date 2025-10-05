#!/bin/bash

echo "======================================"
echo "LUCT Reporting System - Quick Start"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if MySQL is running
echo "Checking MySQL connection..."
if command -v mysql &> /dev/null
then
    echo "✅ MySQL found"
else
    echo "⚠️  MySQL not found in PATH. Make sure MySQL is installed and running."
fi

echo ""
echo "======================================"
echo "Installing Dependencies..."
echo "======================================"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "======================================"
echo "Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Create MySQL database: CREATE DATABASE luct_reporting;"
echo "2. Import schema: mysql -u root -p luct_reporting < backend/database/schema.sql"
echo "3. Configure backend/.env with your database credentials"
echo "4. Start backend: cd backend && npm start"
echo "5. Start frontend: cd frontend && npm start"
echo ""
echo "Or use: npm run dev (to start both servers)"
echo ""
echo "Default login credentials:"
echo "  Lecturer: lecturer@luct.ac.ls / admin123"
echo "  Student:  student@luct.ac.ls / admin123"
echo ""
echo "For detailed instructions, see SETUP_GUIDE.md"
echo "======================================"