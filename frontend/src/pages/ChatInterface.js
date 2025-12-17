import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaPaperPlane, FaComments } from 'react-icons/fa';

const ChatInterface = () => {
  const { user } = useAuth();
  const { socket, connected, joinChat, sendMessage: socketSendMessage } = useSocket();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChat && socket && connected) {
      joinChat(selectedChat._id);
      fetchChatMessages(selectedChat._id);

      // Listen for new messages
      socket.on('new-message', (data) => {
        if (data.chatId === selectedChat._id) {
          setMessages((prev) => [...prev, data.message]);
          scrollToBottom();
        }
      });

      return () => {
        socket.off('new-message');
      };
    }
  }, [selectedChat, socket, connected]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/chats');
      setChats(response.data.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChatMessages = async (chatId) => {
    try {
      const response = await api.get(`/chats/${chatId}`);
      setMessages(response.data.data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const messageText = newMessage.trim();
    setNewMessage('');
    setSending(true);

    try {
      // Send via API
      const response = await api.post(`/chats/${selectedChat._id}/messages`, {
        content: messageText,
      });

      // Also send via Socket.IO for real-time update
      if (socket && connected) {
        socketSendMessage(selectedChat._id, messageText);
      }

      // Add to local messages
      const newMsg = response.data.data.newMessage;
      setMessages((prev) => [...prev, newMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
      setNewMessage(messageText); // Restore message
    } finally {
      setSending(false);
    }
  };

  const getOtherParticipant = (chat) => {
    return chat.participants.find((p) => p._id !== user._id);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <LoadingSpinner message="Loading conversations..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container-custom max-w-6xl">
        <h1 className="text-4xl font-bold gradient-text mb-8">Messages</h1>

        <div className="card p-0 overflow-hidden" style={{ height: '600px' }}>
          <div className="grid grid-cols-12 h-full">
            {/* Chat List */}
            <div className="col-span-4 border-r border-gray-200 overflow-y-auto">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Conversations</h2>
              </div>

              {chats.length === 0 ? (
                <div className="p-8 text-center">
                  <FaComments className="text-5xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No conversations yet</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {user?.role === 'investor'
                      ? 'Start a chat with any innovator from their pitch page'
                      : 'Investors will reach out to you'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {chats.map((chat) => {
                    const otherUser = getOtherParticipant(chat);
                    const isSelected = selectedChat?._id === chat._id;

                    return (
                      <div
                        key={chat._id}
                        onClick={() => setSelectedChat(chat)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          isSelected ? 'bg-primary-50 border-l-4 border-primary-500' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                            {otherUser?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {otherUser?.name}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {chat.relatedIdea?.title}
                            </p>
                            {chat.messages?.length > 0 && (
                              <p className="text-xs text-gray-500 truncate">
                                {chat.messages[chat.messages.length - 1].content}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Chat Window */}
            <div className="col-span-8 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                        {getOtherParticipant(selectedChat)?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {getOtherParticipant(selectedChat)?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedChat.relatedIdea?.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => {
                      const isOwn = msg.sender._id === user._id || msg.sender === user._id;

                      return (
                        <div
                          key={index}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              isOwn
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            <p className="break-words">{msg.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                isOwn ? 'text-primary-100' : 'text-gray-500'
                              }`}
                            >
                              {formatTime(msg.createdAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim() || sending}
                        className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <FaPaperPlane /> Send
                      </button>
                    </form>
                    {!connected && (
                      <p className="text-xs text-yellow-600 mt-2">
                        ⚠️ Connecting to chat server...
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <FaComments className="text-6xl mb-4 mx-auto text-gray-300" />
                    <p className="text-lg">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
