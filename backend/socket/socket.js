const jwt = require('jsonwebtoken');
const Chat = require('../models/Chat');

const initializeSocket = (io) => {
  // Store connected users
  const connectedUsers = new Map(); // userId -> socketId

  io.on('connection', (socket) => {
    console.log(`⚡ New socket connection: ${socket.id}`);

    // Authenticate user with JWT
    socket.on('authenticate', async (token) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        connectedUsers.set(decoded.id, socket.id);
        
        console.log(`✅ User authenticated: ${decoded.id}`);
        socket.emit('authenticated', { success: true });
      } catch (error) {
        console.error('Socket authentication failed:', error);
        socket.emit('authenticated', { success: false, message: 'Invalid token' });
      }
    });

    // Join a specific chat room
    socket.on('join-chat', (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.userId} joined chat: ${chatId}`);
    });

    // Leave a chat room
    socket.on('leave-chat', (chatId) => {
      socket.leave(chatId);
      console.log(`User ${socket.userId} left chat: ${chatId}`);
    });

    // Send message (real-time broadcast)
    socket.on('send-message', async (data) => {
      try {
        const { chatId, message } = data;
        
        // Broadcast to all users in the chat room (including sender for confirmation)
        io.to(chatId).emit('new-message', {
          chatId,
          message,
          timestamp: new Date(),
        });

        console.log(`Message sent in chat ${chatId} by user ${socket.userId}`);
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('message-error', { message: 'Failed to send message' });
      }
    });

    // Typing indicator
    socket.on('typing-start', (data) => {
      const { chatId, userName } = data;
      socket.to(chatId).emit('user-typing', { chatId, userName, isTyping: true });
    });

    socket.on('typing-stop', (data) => {
      const { chatId } = data;
      socket.to(chatId).emit('user-typing', { chatId, isTyping: false });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      if (socket.userId) {
        connectedUsers.delete(socket.userId);
        console.log(`User ${socket.userId} disconnected`);
      }
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = initializeSocket;
