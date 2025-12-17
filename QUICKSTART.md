# 🚀 E-Shark Quick Start Guide

## Prerequisites Checklist

- [ ] Node.js (v14+) installed
- [ ] MongoDB running locally OR MongoDB Atlas account
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

---

## ⚡ 5-Minute Setup

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

**Expected output:** ~1300 packages installed

### Step 2: Configure Backend Environment

The `.env` file is already created. If using local MongoDB, no changes needed.

For MongoDB Atlas:
1. Create account at https://mongodb.com/atlas
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

**Expected output:** ~1300 packages installed

### Step 4: Start Backend Server

```bash
cd backend
npm run dev
```

**Expected output:**
```
╔═══════════════════════════════════════════════╗
║       🦈  E-SHARK API SERVER RUNNING 🦈       ║
║   Server: http://localhost:5000              ║
╚═══════════════════════════════════════════════╝
✅ MongoDB Connected: localhost:27017
```

### Step 5: Start Frontend (New Terminal)

```bash
cd frontend
npm start
```

**Expected output:**
```
Compiled successfully!
Local: http://localhost:3000
```

### Step 6: Open Application

Visit: **http://localhost:3000**

---

## 🧪 Quick Test

### Test 1: Register Account

1. Click "Get Started" or "Register"
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Role: Innovator
3. Click "Sign Up"

**Expected:** Redirect to Innovator Dashboard (coming soon page)

### Test 2: Login

1. Logout (if logged in)
2. Click "Login"
3. Enter credentials from Test 1
4. Click "Sign In"

**Expected:** Redirect to dashboard based on role

### Test 3: API Health Check

Visit: **http://localhost:5000/api/health**

**Expected JSON:**
```json
{
  "success": true,
  "message": "E-Shark API is running",
  "timestamp": "2024-..."
}
```

### Test 4: Protected Route

1. Logout
2. Try to access: http://localhost:3000/innovator/dashboard

**Expected:** Redirect to /login

---

## 🐛 Common Issues & Fixes

### Issue 1: "MongoDB connection failed"

**Solution:**
- Ensure MongoDB is running: `mongod` (if local)
- OR update `.env` with MongoDB Atlas URI
- Check port 27017 is not in use

### Issue 2: "Port 5000 already in use"

**Solution:**
- Change PORT in backend `.env` to 5001
- Update REACT_APP_API_URL in frontend `.env` to 5001

### Issue 3: "npm install fails"

**Solution:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: "Tailwind styles not working"

**Solution:**
- Ensure `tailwind.config.js` and `postcss.config.js` exist
- Restart React server: Ctrl+C then `npm start`

### Issue 5: "CORS error"

**Solution:**
- Check FRONTEND_URL in backend `.env` matches React URL
- Default should be `http://localhost:3000`

---

## 📁 Project Structure Verification

Run this to verify your setup:

```bash
# Windows PowerShell
tree /F /A > structure.txt

# Mac/Linux
tree > structure.txt
```

**Expected folders:**
```
E-Shark-MERN/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── node_modules/
│   ├── .env
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── utils/
    │   └── App.js
    ├── node_modules/
    └── package.json
```

---

## 🎯 What to Do Next

1. **Test the APIs** using Postman or Thunder Client
2. **Create demo accounts** (innovator, investor)
3. **Explore the code** - start with models, then controllers
4. **Build remaining pages:**
   - Innovator Dashboard
   - Create Pitch Form
   - Investor Dashboard
   - Chat Interface

---

## 📞 Need Help?

Check these resources:

1. **[README.md](file:///c:/Users/prems/Documents/GitHub/E-Shark-MERN/README.md)** - Full documentation
2. **[walkthrough.md](file:///C:/Users/prems/.gemini/antigravity/brain/728a5121-6d57-4c93-a6f7-e63651c10dd8/walkthrough.md)** - Detailed walkthrough
3. **[implementation_plan.md](file:///C:/Users/prems/.gemini/antigravity/brain/728a5121-6d57-4c93-a6f7-e63651c10dd8/implementation_plan.md)** - Technical plan
4. **Backend logs** - Check terminal for errors

---

## ✅ Success Checklist

- [ ] Backend starts without errors
- [ ] MongoDB connects successfully
- [ ] Frontend starts on localhost:3000
- [ ] Can access homepage
- [ ] Can register new account
- [ ] Can login
- [ ] Can logout
- [ ] Protected routes redirect to login

---

**Happy Coding! 🦈**
