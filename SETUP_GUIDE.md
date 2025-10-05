# LUCT Reporting System - Complete Setup Guide

## 🚀 Quick Start Guide

Follow these steps to get the application running on your local machine.

### Step 1: Install Prerequisites

1. **Install Node.js**
   - Download from: https://nodejs.org/
   - Recommended version: 18.x or higher
   - Verify installation: `node --version` and `npm --version`

2. **Install MySQL**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or install XAMPP: https://www.apachefriends.org/
   - Start MySQL service

### Step 2: Setup Database

1. **Create Database**
   ```bash
   # Open MySQL command line or phpMyAdmin
   mysql -u root -p
   
   # Create database
   CREATE DATABASE luct_reporting;
   
   # Exit MySQL
   exit;
   ```

2. **Import Schema**
   ```bash
   # Navigate to project directory
   cd /path/to/project
   
   # Import schema
   mysql -u root -p luct_reporting < backend/database/schema.sql
   ```

### Step 3: Setup Backend

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   # Copy example env file
   cp .env.example .env
   
   # Edit .env file with your settings
   # Update DB_PASSWORD if you have a MySQL password
   ```

4. **Start backend server**
   ```bash
   npm start
   ```
   
   You should see:
   ```
   ✅ Database connected successfully
   🚀 Server running on: http://localhost:5000
   ```

### Step 4: Setup Frontend

1. **Open new terminal and navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file
   echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
   ```

4. **Start frontend server**
   ```bash
   npm start
   ```
   
   Browser should automatically open to `http://localhost:3000`

### Step 5: Login and Test

1. **Open browser to** `http://localhost:3000`

2. **Login with test credentials:**
   - **Lecturer:** lecturer@luct.ac.ls / admin123
   - **Student:** student@luct.ac.ls / admin123
   - **PRL:** prl@luct.ac.ls / admin123
   - **PL:** pl@luct.ac.ls / admin123

3. **Test the features:**
   - Create a report as Lecturer
   - View reports as Student
   - Add feedback as PRL
   - Manage courses as PL

## 🔧 Troubleshooting

### Database Connection Issues

**Problem:** "Database connection failed"

**Solutions:**
1. Verify MySQL is running
2. Check database credentials in `backend/.env`
3. Ensure database `luct_reporting` exists
4. Test connection: `mysql -u root -p luct_reporting`

### Port Already in Use

**Problem:** "Port 5000 is already in use"

**Solutions:**
1. Change port in `backend/.env`: `PORT=5001`
2. Update frontend `.env`: `REACT_APP_API_URL=http://localhost:5001/api`
3. Or kill process using port: 
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
   - Mac/Linux: `lsof -ti:5000 | xargs kill`

### CORS Errors

**Problem:** "CORS policy blocked"

**Solution:**
1. Ensure backend is running
2. Check `CLIENT_URL` in `backend/.env` matches frontend URL
3. Restart both servers

### Module Not Found

**Problem:** "Cannot find module..."

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📦 Deployment Guide

### Deploy to GitHub

1. **Initialize Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub repository**
   - Go to https://github.com/new
   - Create new repository
   - Don't initialize with README

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/luct-reporting.git
   git branch -M main
   git push -u origin main
   ```

### Deploy Backend (Railway)

1. **Sign up at** https://railway.app/
2. **Create new project** → Deploy from GitHub
3. **Select your repository**
4. **Add MySQL database** → New → Database → MySQL
5. **Set environment variables:**
   - Copy database credentials from Railway
   - Add all variables from `.env`
6. **Deploy** - Railway will auto-deploy

### Deploy Frontend (Vercel)

1. **Sign up at** https://vercel.com/
2. **Import project** from GitHub
3. **Configure:**
   - Framework: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Add environment variable:**
   - `REACT_APP_API_URL` = Your Railway backend URL + `/api`
5. **Deploy**

## 📝 Submission Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] All features working
- [ ] Test with all user roles
- [ ] README.md completed
- [ ] Submit GitHub link to classroom
- [ ] Submit deployed app link to classroom

## 🎓 Grading Criteria

- **Frontend (40 points)**
  - User interface design
  - Responsive layout
  - All modules implemented
  - User experience

- **Backend (40 points)**
  - API endpoints working
  - Database operations
  - Authentication/Authorization
  - Error handling

- **Code Quality (20 points)**
  - Code organization
  - Comments and documentation
  - Best practices
  - Git commits

- **Extra Credit (10 points)**
  - Search functionality
  - Excel export feature

## 💡 Tips for Success

1. **Test thoroughly** - Try all features with different user roles
2. **Handle errors** - Add proper error messages
3. **Document code** - Add comments explaining complex logic
4. **Use Git properly** - Make meaningful commits
5. **Deploy early** - Don't wait until last minute
6. **Ask for help** - Contact instructor if stuck

## 📞 Getting Help

If you encounter issues:

1. Check this guide first
2. Search error messages online
3. Check GitHub Issues
4. Contact instructor: tsekiso.thokoana@limkokwing.ac.ls
5. Ask classmates in study group

## ✅ Final Checklist Before Submission

- [ ] All user roles can login
- [ ] Lecturer can create/edit/delete reports
- [ ] PRL can add feedback to reports
- [ ] PL can create courses and assign lecturers
- [ ] Students can view reports and rate
- [ ] Search works in all modules
- [ ] Excel export generates correct file
- [ ] Application is deployed and accessible
- [ ] GitHub repository is public
- [ ] README.md is complete
- [ ] All links submitted to classroom

Good luck with your assignment! 🎉