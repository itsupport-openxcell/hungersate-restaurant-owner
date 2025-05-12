import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Pages
import SplashScreen from './pages/SplashScreen';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Verification from './pages/auth/Verification';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ProfileCreation from './pages/ProfileCreation';
import Dashboard from './pages/Dashboard';
import OrderRequests from './pages/OrderRequests';
import OngoingOrders from './pages/OngoingOrders';
import OrderHistory from './pages/OrderHistory';
import NotFound from './pages/NotFound';

// Guards
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';
import ProfileGuard from './components/guards/ProfileGuard';

function App() {
  const { isInitialized } = useAuth();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<GuestGuard />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Profile Creation Route */}
      <Route element={<AuthGuard />}>
        <Route path="/profile-creation" element={<ProfileCreation />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProfileGuard />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order-requests" element={<OrderRequests />} />
        <Route path="/ongoing-orders" element={<OngoingOrders />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Route>

      {/* Default Routes */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;