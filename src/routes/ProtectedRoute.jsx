import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

function ProtectedRoute({ children, requiredRole }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
