import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExploreIdeas from './pages/ExploreIdeas';
import IdeaDetail from './pages/IdeaDetail';
import About from './pages/About';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';

// Innovator Pages
import InnovatorDashboard from './pages/innovator/InnovatorDashboard';
import CreatePitch from './pages/innovator/CreatePitch';

// Investor Pages
import InvestorDashboard from './pages/investor/InvestorDashboard';
import Shortlist from './pages/investor/Shortlist';

// Chat
import ChatInterface from './pages/ChatInterface';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';

import './index.css';

// Placeholder component for pages under development
const ComingSoon = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold gradient-text mb-4">{title}</h1>
      <p className="text-gray-600 text-lg">🚧 Under Development 🚧</p>
      <p className="text-gray-500 mt-2">This page is being built. Check back soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/explore" element={<ExploreIdeas />} />
                <Route path="/idea/:id" element={<IdeaDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contact" element={<Contact />} />

                {/* Innovator Routes */}
                <Route
                  path="/innovator/dashboard"
                  element={
                    <ProtectedRoute requiredRole="innovator">
                      <InnovatorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/innovator/create-pitch"
                  element={
                    <ProtectedRoute requiredRole="innovator">
                      <CreatePitch />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/innovator/edit-pitch/:id"
                  element={
                    <ProtectedRoute requiredRole="innovator">
                      <ComingSoon title="Edit Pitch" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/innovator/profile"
                  element={
                    <ProtectedRoute requiredRole="innovator">
                      <ComingSoon title="Innovator Profile" />
                    </ProtectedRoute>
                  }
                />

                {/* Investor Routes */}
                <Route
                  path="/investor/dashboard"
                  element={
                    <ProtectedRoute requiredRole="investor">
                      <InvestorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/investor/shortlist"
                  element={
                    <ProtectedRoute requiredRole="investor">
                      <Shortlist />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/investor/profile"
                  element={
                    <ProtectedRoute requiredRole="investor">
                      <ComingSoon title="Investor Profile" />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Chat (All authenticated users) */}
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute>
                      <ChatInterface />
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route
                  path="*"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
                        <p className="text-xl text-gray-600 mb-4">Page Not Found</p>
                        <a href="/" className="btn-primary">
                          Go Home
                        </a>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
