# Deployment Guide - LUCT Reporting System

## 🚀 Deployment Options

This guide covers deploying your application to production environments.

---

## Option 1: Deploy to Railway (Recommended for Backend)

### Backend Deployment

1. **Create Railway Account**
   - Go to https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your repository

3. **Add MySQL Database**
   - Click "New" → "Database" → "Add MySQL"
   - Railway will create a MySQL instance
   - Note the connection details

4. **Configure Environment Variables**
   - Go to your backend service
   - Click "Variables" tab
   - Add the following variables:
     ```
     NODE_ENV=production
     PORT=5000
     DB_HOST=[Railway MySQL Host]
     DB_USER=[Railway MySQL User]
     DB_PASSWORD=[Railway MySQL Password]
     DB_NAME=[Railway MySQL Database]
     JWT_SECRET=[Your Secret Key]
     JWT_EXPIRE=7d
     CLIENT_URL=[Your Frontend URL]
     ```

5. **Deploy**
   - Railway will automatically deploy
   - Get your backend URL from Railway dashboard
   - Example: `https://your-app.railway.app`

6. **Import Database Schema**
   - Use Railway's MySQL client or connect via MySQL Workbench
   - Import the schema.sql file

---

## Option 2: Deploy to Render (Alternative Backend)

### Backend Deployment

1. **Create Render Account**
   - Go to https://render.com/
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: luct-reporting-backend
     - Environment: Node
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`

3. **Add PostgreSQL Database** (or use external MySQL)
   - Click "New +" → "PostgreSQL"
   - Note connection details

4. **Set Environment Variables**
   - Add all variables from `.env`
   - Update database credentials

5. **Deploy**
   - Render will build and deploy
   - Get your backend URL

---

## Option 3: Deploy Frontend to Vercel (Recommended)

### Frontend Deployment

1. **Create Vercel Account**
   - Go to https://vercel.com/
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Build Settings**
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Add Environment Variable**
   - Go to Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.railway.app/api`

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy
   - Get your frontend URL

---

## Option 4: Deploy Frontend to Netlify (Alternative)

### Frontend Deployment

1. **Create Netlify Account**
   - Go to https://netlify.com/
   - Sign up with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Configure Build Settings**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

4. **Add Environment Variable**
   - Go to Site settings → Environment variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.railway.app/api`

5. **Deploy**
   - Click "Deploy site"
   - Get your frontend URL

---

## Database Options

### Option A: Railway MySQL (Recommended)
- Included with Railway backend deployment
- Easy setup and management
- Good for development and small projects

### Option B: PlanetScale (Free MySQL)
1. Sign up at https://planetscale.com/
2. Create new database
3. Get connection string
4. Update backend environment variables

### Option C: AWS RDS MySQL
1. Create AWS account
2. Launch RDS MySQL instance
3. Configure security groups
4. Get connection details
5. Update backend environment variables

---

## Post-Deployment Checklist

### Backend Verification
- [ ] Backend URL is accessible
- [ ] Health check endpoint works: `GET /api/health`
- [ ] Database connection successful
- [ ] Can login with test credentials
- [ ] API endpoints respond correctly

### Frontend Verification
- [ ] Frontend URL is accessible
- [ ] Can access login page
- [ ] Can login successfully
- [ ] All pages load correctly
- [ ] API calls work (check Network tab)
- [ ] No console errors

### Database Verification
- [ ] Schema imported successfully
- [ ] Test data exists
- [ ] Can create new records
- [ ] Can update records
- [ ] Can delete records

---

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=luct_reporting
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-url.vercel.app
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

---

## Troubleshooting Deployment Issues

### Issue: "Application Error" on Railway
**Solution:**
- Check logs in Railway dashboard
- Verify all environment variables are set
- Ensure database is connected
- Check build logs for errors

### Issue: "Failed to compile" on Vercel
**Solution:**
- Check build logs
- Verify all dependencies are in package.json
- Ensure REACT_APP_API_URL is set
- Try building locally first

### Issue: CORS errors after deployment
**Solution:**
- Update CLIENT_URL in backend environment variables
- Ensure it matches your frontend URL exactly
- Restart backend service

### Issue: Database connection failed
**Solution:**
- Verify database credentials
- Check database is running
- Ensure IP whitelist includes Railway/Render IPs
- Test connection string locally

### Issue: 404 on frontend routes
**Solution:**
- Add `_redirects` file in frontend/public:
  ```
  /*    /index.html   200
  ```
- Or configure Vercel/Netlify for SPA routing

---

## Custom Domain Setup (Optional)

### For Vercel Frontend
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate

### For Railway Backend
1. Go to Service Settings → Domains
2. Add custom domain
3. Update DNS records
4. Update CLIENT_URL in environment variables

---

## Monitoring & Maintenance

### Set Up Monitoring
- Use Railway/Render built-in logs
- Set up error tracking (e.g., Sentry)
- Monitor database performance
- Set up uptime monitoring (e.g., UptimeRobot)

### Regular Maintenance
- Check logs regularly
- Monitor database size
- Update dependencies
- Backup database regularly
- Review and optimize queries

---

## Cost Estimates

### Free Tier Options
- **Railway:** $5 free credit/month
- **Render:** Free tier available
- **Vercel:** Free for personal projects
- **Netlify:** Free for personal projects
- **PlanetScale:** Free tier with 5GB storage

### Estimated Monthly Costs (Paid)
- Railway (Hobby): ~$5-10/month
- Render (Starter): ~$7/month
- PlanetScale (Scaler): ~$29/month
- Total: ~$15-50/month depending on usage

---

## Security Best Practices

1. **Environment Variables**
   - Never commit .env files
   - Use strong JWT secrets
   - Rotate secrets regularly

2. **Database**
   - Use strong passwords
   - Enable SSL connections
   - Regular backups
   - Limit access by IP

3. **API**
   - Enable rate limiting
   - Validate all inputs
   - Use HTTPS only
   - Implement CORS properly

4. **Frontend**
   - Don't expose sensitive data
   - Sanitize user inputs
   - Use secure cookies
   - Keep dependencies updated

---

## Submission Links Format

When submitting your assignment, provide:

1. **GitHub Repository:**
   ```
   https://github.com/yourusername/luct-reporting-system
   ```

2. **Live Backend URL:**
   ```
   https://your-backend.railway.app
   ```

3. **Live Frontend URL:**
   ```
   https://your-frontend.vercel.app
   ```

4. **Test Credentials:**
   ```
   Lecturer: lecturer@luct.ac.ls / admin123
   Student: student@luct.ac.ls / admin123
   PRL: prl@luct.ac.ls / admin123
   PL: pl@luct.ac.ls / admin123
   ```

---

## Support

If you encounter deployment issues:
1. Check service status pages
2. Review deployment logs
3. Search error messages
4. Contact platform support
5. Ask instructor for help

Good luck with your deployment! 🚀