import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role if specified
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on actual role
    const roleDashboards = {
      innovator: '/innovator/dashboard',
      investor: '/investor/dashboard',
      admin: '/admin/dashboard',
    };
    return <Navigate to={roleDashboards[user.role] || '/'} replace />;
  }

  return children;
};

export default ProtectedRoute;
