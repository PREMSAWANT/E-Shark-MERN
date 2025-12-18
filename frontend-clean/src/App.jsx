import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ComingSoon from './components/ComingSoon';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

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
                <Route path="/explore" element={<ComingSoon title="Explore Ideas" />} />
                <Route path="/about" element={<ComingSoon title="About E-Shark" />} />
                <Route path="/faqs" element={<ComingSoon title="FAQs" />} />
                <Route path="/contact" element={<ComingSoon title="Contact Us" />} />

                {/* Innovator Routes */}
                <Route
                  path="/innovator/dashboard"
                  element={
                    <ProtectedRoute requiredRole="innovator">
                      <ComingSoon title="Innovator Dashboard" />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/innovator/create-pitch"
                  element={
                    <ProtectedRoute requiredRole="innovator">
                      <ComingSoon title="Create Pitch" />
                    </ProtectedRoute>
                  }
                />

                {/* Investor Routes */}
                <Route
                  path="/investor/dashboard"
                  element={
                    <ProtectedRoute requiredRole="investor">
                      <ComingSoon title="Investor Dashboard" />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <ComingSoon title="Admin Dashboard" />
                    </ProtectedRoute>
                  }
                />

                {/* Chat Route */}
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute>
                      <ComingSoon title="Messages" />
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
                        <p className="text-xl text-gray-600">Page Not Found</p>
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
