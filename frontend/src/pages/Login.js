import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { GiSharkFin } from 'react-icons/gi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);
      
      // Redirect based on role
      if (result.user.role === 'innovator') {
        navigate('/innovator/dashboard');
      } else if (result.user.role === 'investor') {
        navigate('/investor/dashboard');
      } else if (result.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-blue-100">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GiSharkFin className="text-6xl text-primary-500" />
          </div>
          <h2 className="text-3xl font-bold gradient-text">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your E-Shark account</p>
        </div>

        {/* Form Card */}
        <div className="glass-effect rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="label">
                <FaEnvelope className="inline mr-2" />
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="label">
                <FaLock className="inline mr-2" />
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Register Link */}
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                Sign Up
              </Link>
            </div>
          </form>

          {/* Demo Accounts Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-2">Demo Accounts:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Innovator: innovator@demo.com / password123</p>
              <p>Investor: investor@demo.com / password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
