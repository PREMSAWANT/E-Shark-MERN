require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const initializeSocket = require('./socket/socket');

// Import routes
const authRoutes = require('./routes/authRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const chatRoutes = require('./routes/chatRoutes');
const shortlistRoutes = require('./routes/shortlistRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Initialize Socket.IO handlers
initializeSocket(io);

// Make io accessible to routes
app.set('io', io);

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many authentication attempts, please try again later',
});

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/shortlist', shortlistRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'E-Shark API is running',
    timestamp: new Date().toISOString(),
  });
});

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '🦈 Welcome to E-Shark API',
    tagline: 'Pitch Smart, Invest Smarter',
    version: '1.0.0',
    docs: '/api/health',
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║       🦈  E-SHARK API SERVER RUNNING 🦈       ║
║                                               ║
║   Server: http://localhost:${PORT}              ║
║   Environment: ${process.env.NODE_ENV || 'development'}                  ║
║                                               ║
║   Pitch Smart, Invest Smarter 💡              ║
║                                               ║
╚═══════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('❌ Unhandled Rejection! Shutting down...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
