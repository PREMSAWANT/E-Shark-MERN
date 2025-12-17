import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { GiSharkFin } from 'react-icons/gi';

const Navbar = () => {
  const { user, logout, isAuthenticated, isInnovator, isInvestor, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (isInnovator()) return '/innovator/dashboard';
    if (isInvestor()) return '/investor/dashboard';
    if (isAdmin()) return '/admin/dashboard';
    return '/';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <GiSharkFin className="text-4xl text-primary-500 group-hover:text-primary-600 transition-colors" />
            <span className="text-2xl font-bold gradient-text">E-Shark</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              About
            </Link>
            {isAuthenticated && (
              <Link to="/explore" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
                Explore Ideas
              </Link>
            )}
            <Link to="/faqs" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              FAQs
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/chat"
                  className="text-gray-700 hover:text-primary-500 font-medium transition-colors"
                >
                  Messages
                </Link>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100">
                  <FaUserCircle className="text-2xl text-primary-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-primary-500 text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link
              to="/"
              className="block text-gray-700 hover:text-primary-500 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-primary-500 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {isAuthenticated && (
              <Link
                to="/explore"
                className="block text-gray-700 hover:text-primary-500 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore Ideas
              </Link>
            )}
            <Link
              to="/faqs"
              className="block text-gray-700 hover:text-primary-500 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </Link>
            <Link
              to="/contact"
              className="block text-gray-700 hover:text-primary-500 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="block text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/chat"
                  className="block text-gray-700 hover:text-primary-500 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Messages
                </Link>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100">
                  <FaUserCircle className="text-2xl text-primary-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block btn-primary text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
