import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaLightbulb, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🦈</span>
            <span className="text-2xl font-bold gradient-text">E-Shark</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {!user ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary-600 font-semibold transition-colors">
                  Home
                </Link>
                <Link to="/explore" className="text-gray-700 hover:text-primary-600 font-semibold transition-colors">
                  Explore
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-semibold transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link to={`/${user.role}/dashboard`} className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-semibold transition-colors">
                  <FaHome /> Dashboard
                </Link>
                {user.role === 'innovator' && (
                  <Link to="/innovator/create-pitch" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-semibold transition-colors">
                    <FaLightbulb /> Create Pitch
                  </Link>
                )}
                {user.role === 'investor' && (
                  <Link to="/explore" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-semibold transition-colors">
                    <FaLightbulb /> Explore
                  </Link>
                )}
                <Link to="/chat" className="text-gray-700 hover:text-primary-600 font-semibold transition-colors">
                  Chat
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-700">{user.name}</span>
                  </div>
                  <button onClick={logout} className="text-red-600 hover:text-red-700 transition-colors">
                    <FaSignOutAlt className="text-xl" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
