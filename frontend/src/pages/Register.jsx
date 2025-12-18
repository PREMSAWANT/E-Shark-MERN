import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'innovator',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await register(formData);
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center py-12">
      <div className="card max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Join E-Shark</h1>
          <p className="text-gray-600">Start your journey today</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="••••••••"
              minLength="6"
              required
            />
          </div>

          <div>
            <label className="label">I am a...</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${formData.role === 'innovator' ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-300'}`}>
                <input
                  type="radio"
                  name="role"
                  value="innovator"
                  checked={formData.role === 'innovator'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-3xl mb-2">💡</div>
                  <div className="font-semibold">Innovator</div>
                  <div className="text-xs text-gray-600">Pitch my idea</div>
                </div>
              </label>

              <label className={`cursor-pointer p-4 border-2 rounded-lg transition-all ${formData.role === 'investor' ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-300'}`}>
                <input
                  type="radio"
                  name="role"
                  value="investor"
                  checked={formData.role === 'investor'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-3xl mb-2">💼</div>
                  <div className="font-semibold">Investor</div>
                  <div className="text-xs text-gray-600">Find opportunities</div>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
