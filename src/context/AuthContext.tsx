import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
export interface User {
  id: string;
  restaurantName?: string;
  email: string;
  phone: string;
  hasProfile: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  login: (phone: string, password: string) => Promise<void>;
  signup: (email: string, phone: string, password: string, restaurantName: string) => Promise<void>;
  logout: () => void;
  verifyOtp: (otp: string) => Promise<void>;
  requestPasswordReset: (phone: string) => Promise<void>;
  resetPassword: (otp: string, newPassword: string) => Promise<void>;
  updateProfile: (profile: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    setIsInitialized(true);
  }, []);

  const login = async (phone: string, password: string): Promise<void> => {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '123456',
        email: 'demo@restaurant.com',
        phone,
        hasProfile: phone === '1234567890', // For demo: if phone is 1234567890, user has profile
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      
      // Redirect based on profile status
      if (userData.hasProfile) {
        navigate('/dashboard');
      } else {
        navigate('/profile-creation');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (
    email: string, 
    phone: string, 
    password: string, 
    restaurantName: string
  ): Promise<void> => {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - newly registered users don't have a profile yet
      const userData: User = {
        id: Date.now().toString(),
        email,
        phone,
        restaurantName,
        hasProfile: false,
      };
      
      // Store temporary user data for OTP verification
      sessionStorage.setItem('pendingUser', JSON.stringify(userData));
      
      // Navigate to verification page
      navigate('/verification');
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Registration failed');
    }
  };

  const verifyOtp = async (otp: string): Promise<void> => {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if there's a pending user
      const pendingUser = sessionStorage.getItem('pendingUser');
      if (!pendingUser) {
        throw new Error('No pending verification');
      }
      
      // Simulate OTP verification (in real app, this would verify against backend)
      if (otp !== '123456') { // Demo OTP code
        throw new Error('Invalid OTP');
      }
      
      // Set user as authenticated
      const userData = JSON.parse(pendingUser);
      localStorage.setItem('user', pendingUser);
      sessionStorage.removeItem('pendingUser');
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Redirect to profile creation
      navigate('/profile-creation');
    } catch (error) {
      console.error('Verification failed:', error);
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const requestPasswordReset = async (phone: string): Promise<void> => {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store phone for the reset process
      sessionStorage.setItem('resetPhone', phone);
      
      // Navigate to reset password page
      navigate('/reset-password');
    } catch (error) {
      console.error('Reset request failed:', error);
      throw new Error('Reset request failed');
    }
  };

  const resetPassword = async (otp: string, newPassword: string): Promise<void> => {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if there's a pending reset
      const resetPhone = sessionStorage.getItem('resetPhone');
      if (!resetPhone) {
        throw new Error('No pending reset');
      }
      
      // Simulate OTP verification
      if (otp !== '123456') { // Demo OTP code
        throw new Error('Invalid OTP');
      }
      
      // Clear reset data
      sessionStorage.removeItem('resetPhone');
      
      // Navigate to login
      navigate('/login');
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  };

  const updateProfile = async (profile: Partial<User>): Promise<void> => {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Update user data
      const updatedUser = { ...user, ...profile, hasProfile: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        user,
        login,
        signup,
        logout,
        verifyOtp,
        requestPasswordReset,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};