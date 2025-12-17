# 🦈 E-Shark - Online Idea Pitching & Investment Platform

**Pitch Smart, Invest Smarter**

A production-ready MERN stack application that connects innovators with investors through structured pitch submissions, real-time communication, and role-based dashboards.

![Tech Stack](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [User Roles](#-user-roles)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### For Innovators
- ✅ Create and manage pitch submissions
- ✅ Track pitch analytics (views, likes, investor interest)
- ✅ Real-time chat with interested investors
- ✅ Profile management with skills and team details
- ✅ Pitch status tracking (Submitted → Reviewed → Funded)

### For Investors
- ✅ Browse and filter quality ideas by category, stage, funding
- ✅ Shortlist promising pitches
- ✅ Initiate conversations with innovators
- ✅ Investment portfolio management
- ✅ Advanced search and filters

### For Admins
- ✅ User management and verification
- ✅ Idea moderation and approval system
- ✅ Platform analytics and statistics
- ✅ Content monitoring and reporting

### Core Platform Features
- ✅ JWT-based authentication with role-based access control
- ✅ Real-time chat using Socket.IO
- ✅ Responsive design with Tailwind CSS
- ✅ Modern glassmorphism UI
- ✅ File upload support (Cloudinary integration ready)
- ✅ Input validation and error handling
- ✅ RESTful API architecture

---

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Socket.IO** - Real-time communication
- **Cloudinary** - File storage (optional)
- **express-validator** - Input validation

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time chat
- **Tailwind CSS** - Styling
- **React Icons** - Icon library

### Development Tools
- **Nodemon** - Auto-restart server
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📁 Project Structure

```
E-Shark-MERN/
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── cloudinary.js         # Cloudinary config
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── ideaController.js     # Idea/pitch management
│   │   ├── chatController.js     # Chat functionality
│   │   ├── shortlistController.js # Shortlist operations
│   │   ├── userController.js     # User profiles
│   │   └── adminController.js    # Admin operations
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   ├── validationMiddleware.js # Input validation
│   │   └── errorHandler.js       # Error handling
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Idea.js               # Idea schema
│   │   ├── Chat.js               # Chat schema
│   │   └── Shortlist.js          # Shortlist schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── ideaRoutes.js         # Idea endpoints
│   │   ├── chatRoutes.js         # Chat endpoints
│   │   ├── shortlistRoutes.js    # Shortlist endpoints
│   │   ├── userRoutes.js         # User endpoints
│   │   └── adminRoutes.js        # Admin endpoints
│   ├── socket/
│   │   └── socket.js             # Socket.IO setup
│   ├── .env                      # Environment variables
│   ├── .env.example              # Env template
│   ├── package.json
│   └── server.js                 # Entry point
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js         # Navigation bar
    │   │   ├── Footer.js         # Footer
    │   │   ├── ProtectedRoute.js # Route protection
    │   │   └── LoadingSpinner.js # Loading component
    │   ├── context/
    │   │   ├── AuthContext.js    # Auth state
    │   │   └── SocketContext.js  # Socket state
    │   ├── pages/
    │   │   ├── Home.js           # Landing page
    │   │   ├── Login.js          # Login page
    │   │   ├── Register.js       # Registration page
    │   │   └── (more pages...)   # To be implemented
    │   ├── utils/
    │   │   └── api.js            # Axios instance
    │   ├── App.js                # Main component
    │   └── index.css             # Global styles
    ├── .env
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## 📦 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/E-Shark-MERN.git
cd E-Shark-MERN
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory (copy from `.env.example`):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/e-shark
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000

# Optional: For file uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file in `frontend/` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Option 2: Using Concurrently (Future Enhancement)

Install concurrently in root:
```bash
npm install -g concurrently
```

Then create a script to run both servers.

---

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Idea Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/ideas` | Get all ideas (with filters) | Public |
| GET | `/api/ideas/:id` | Get idea by ID | Public |
| POST | `/api/ideas` | Create new idea | Innovator |
| PUT | `/api/ideas/:id` | Update idea | Innovator (own) |
| DELETE | `/api/ideas/:id` | Delete idea | Innovator (own) |
| PATCH | `/api/ideas/:id/status` | Update idea status | Admin |
| PATCH | `/api/ideas/:id/like` | Toggle like | Private |

### Chat Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/chats` | Get user's chats | Private |
| GET | `/api/chats/:id` | Get chat by ID | Private |
| POST | `/api/chats` | Create new chat | Investor |
| POST | `/api/chats/:id/messages` | Send message | Private |

### Shortlist Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/shortlist` | Get investor's shortlist | Investor |
| POST | `/api/shortlist` | Add to shortlist | Investor |
| PUT | `/api/shortlist/:ideaId` | Update shortlist entry | Investor |
| DELETE | `/api/shortlist/:ideaId` | Remove from shortlist | Investor |

### Admin Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/admin/users` | Get all users | Admin |
| GET | `/api/admin/ideas` | Get all ideas | Admin |
| GET | `/api/admin/stats` | Get platform stats | Admin |
| PATCH | `/api/admin/users/:id` | Update user status | Admin |
| DELETE | `/api/admin/users/:id` | Delete user | Admin |

---

## 🔐 User Roles

### Innovator
- Can create, edit, and delete their own pitches
- View pitch analytics
- Chat with investors
- Manage profile with skills and team

### Investor
- Browse and filter ideas
- Shortlist interesting pitches
- Initiate chats with innovators
- Manage investment portfolio

### Admin
- Approve/reject pitched ideas
- Manage all users
- View platform analytics
- Moderate content

---

## 🌍 Deployment

### Backend Deployment (Vercel/Render)

**For Vercel:**
1. Create `vercel.json` in backend folder
2. Deploy using Vercel CLI or GitHub integration

**For Render:**
1. Connect GitHub repository
2. Set environment variables
3. Deploy as web service

### Frontend Deployment (Vercel)

```bash
cd frontend
vercel
```

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in production environment

---

## 🔮 Future Enhancements

- [ ] AI-powered pitch quality scoring
- [ ] Recommendation engine for investors
- [ ] Live pitch event scheduling
- [ ] Email notifications
- [ ] Investor rating system
- [ ] Advanced analytics dashboard
- [ ] Payment gateway integration
- [ ] Mobile app (React Native)

---

## 👨‍💻 Development Setup

### Creating an Admin User

Since there's no admin registration in the UI, create one via MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.insertOne({
  name: "Admin User",
  email: "admin@e-shark.com",
  password: "$2a$10$hashedPasswordHere", // Use bcrypt to hash
  role: "admin",
  verified: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or update an existing user:
```javascript
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin", verified: true } }
)
```

### Demo Accounts

You can create demo accounts for testing:

**Innovator:**
- Email: innovator@demo.com
- Password: password123

**Investor:**
- Email: investor@demo.com
- Password: password123

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 🙏 Acknowledgments

- Inspired by Shark Tank India
- Built with ❤️ by **Prem Sawant**

---

## 📞 Contact & Support

For questions or support:
- **Developer**: Prem Sawant
- **Email**: [your-email@example.com]
- **GitHub**: [https://github.com/yourusername]

---

## 📸 Screenshots

_Screenshots will be added after implementing remaining pages_

---

**Happy Pitching! 🦈🚀**
