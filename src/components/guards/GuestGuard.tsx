import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const GuestGuard = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    // If user has a profile, redirect to dashboard, otherwise to profile creation
    return <Navigate to={user?.hasProfile ? '/dashboard' : '/profile-creation'} replace />;
  }

  return <Outlet />;
};

export default GuestGuard;