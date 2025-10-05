# Quick Start Guide - LUCT Reporting System

## 🚀 Get Started in 5 Minutes

This guide will help you get the application running quickly.

---

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v14+)
- ✅ MySQL installed and running
- ✅ Git installed
- ✅ Code editor (VS Code recommended)

---

## Step-by-Step Setup

### 1️⃣ Clone or Download Project

```bash
# If using Git
git clone https://github.com/yourusername/luct-reporting-system.git
cd luct-reporting-system

# Or download ZIP and extract
```

### 2️⃣ Install All Dependencies

**Option A: Automatic (Recommended)**
```bash
# Windows
start.bat

# Mac/Linux
chmod +x start.sh
./start.sh
```

**Option B: Manual**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3️⃣ Setup Database

**Open MySQL and run:**
```sql
CREATE DATABASE luct_reporting;
exit;
```

**Import schema:**
```bash
mysql -u root -p luct_reporting < backend/database/schema.sql
```

### 4️⃣ Configure Backend

**Edit `backend/.env`:**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=luct_reporting
JWT_SECRET=luct_secret_key_2024
CLIENT_URL=http://localhost:3000
```

### 5️⃣ Start Backend Server

```bash
cd backend
npm start
```

**You should see:**
```
✅ Database connected successfully
🚀 Server running on: http://localhost:5000
```

### 6️⃣ Start Frontend (New Terminal)

```bash
cd frontend
npm start
```

**Browser opens automatically to:** `http://localhost:3000`

### 7️⃣ Login and Test

**Use these credentials:**
- **Lecturer:** lecturer@luct.ac.ls / admin123
- **Student:** student@luct.ac.ls / admin123

---

## 🎯 Quick Feature Test

### As Lecturer:
1. Login with lecturer credentials
2. Go to "Reports" → "Create Report"
3. Fill the form and submit
4. View your report in the list
5. Try searching for your report
6. Export reports to Excel

### As Student:
1. Login with student credentials
2. View dashboard
3. Go to "Monitoring" to see reports
4. Go to "Rating" to rate a lecturer

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check if MySQL is running
mysql -u root -p

# Check if port 5000 is free
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### Frontend won't start?
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Database connection failed?
- Check MySQL is running
- Verify credentials in `backend/.env`
- Ensure database `luct_reporting` exists

### Can't login?
- Check backend is running
- Check browser console for errors
- Verify database has test users

---

## 📱 Access URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## 🔑 Default Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@luct.ac.ls | admin123 |
| Program Leader | pl@luct.ac.ls | admin123 |
| Principal Lecturer | prl@luct.ac.ls | admin123 |
| Lecturer | lecturer@luct.ac.ls | admin123 |
| Student | student@luct.ac.ls | admin123 |

---

## 📚 Next Steps

1. **Explore Features:**
   - Create reports as Lecturer
   - View reports as Student
   - Add feedback as PRL
   - Manage courses as PL

2. **Read Documentation:**
   - README.md - Project overview
   - SETUP_GUIDE.md - Detailed setup
   - TESTING_GUIDE.md - Testing checklist

3. **Deploy Application:**
   - See DEPLOYMENT.md for instructions
   - Deploy backend to Railway
   - Deploy frontend to Vercel

4. **Submit Assignment:**
   - See SUBMISSION_CHECKLIST.md
   - Push to GitHub
   - Submit links to classroom

---

## 💡 Tips

- Keep both terminals open (backend + frontend)
- Check console for errors
- Use Chrome DevTools for debugging
- Test with different user roles
- Read error messages carefully

---

## 🆘 Need Help?

1. Check documentation files
2. Search error messages online
3. Review code comments
4. Contact instructor: tsekiso.thokoana@limkokwing.ac.ls

---

## ✅ Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can access login page
- [ ] Can login successfully
- [ ] Can see dashboard
- [ ] Can create report (as Lecturer)
- [ ] Can view reports (as Student)
- [ ] No console errors

---

**You're all set! Start exploring the application.** 🎉

For detailed information, see the other documentation files:
- **README.md** - Complete project information
- **SETUP_GUIDE.md** - Detailed setup instructions
- **TESTING_GUIDE.md** - Comprehensive testing
- **DEPLOYMENT.md** - Production deployment
- **SUBMISSION_CHECKLIST.md** - Before submitting

---

*Happy coding!* 💻