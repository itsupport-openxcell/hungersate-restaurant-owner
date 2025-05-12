import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProfileGuard = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.hasProfile) {
    return <Navigate to="/profile-creation" replace />;
  }

  return <Outlet />;
};

export default ProfileGuard;