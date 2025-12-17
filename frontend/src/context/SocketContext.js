import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && token) {
      // Connect to Socket.IO server
      const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const newSocket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
      });

      newSocket.on('connect', () => {
        console.log('✅ Socket connected:', newSocket.id);
        setConnected(true);
        
        // Authenticate socket connection
        newSocket.emit('authenticate', token);
      });

      newSocket.on('authenticated', (data) => {
        if (data.success) {
          console.log('🔐 Socket authenticated');
        } else {
          console.error('Socket authentication failed');
        }
      });

      newSocket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
        setConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        newSocket.close();
      };
    } else {
      // Disconnect socket if user logs out
      if (socket) {
        socket.close();
        setSocket(null);
        setConnected(false);
      }
    }
  }, [isAuthenticated, token]);

  // Socket event helpers
  const joinChat = (chatId) => {
    if (socket && connected) {
      socket.emit('join-chat', chatId);
    }
  };

  const leaveChat = (chatId) => {
    if (socket && connected) {
      socket.emit('leave-chat', chatId);
    }
  };

  const sendMessage = (chatId, message) => {
    if (socket && connected) {
      socket.emit('send-message', { chatId, message });
    }
  };

  const startTyping = (chatId, userName) => {
    if (socket && connected) {
      socket.emit('typing-start', { chatId, userName });
    }
  };

  const stopTyping = (chatId) => {
    if (socket && connected) {
      socket.emit('typing-stop', { chatId });
    }
  };

  const value = {
    socket,
    connected,
    joinChat,
    leaveChat,
    sendMessage,
    startTyping,
    stopTyping,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export default SocketContext;
