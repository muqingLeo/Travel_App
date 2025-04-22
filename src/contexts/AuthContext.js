import React, { createContext, useState, useContext, useEffect } from 'react';
import { message } from 'antd';

// Create context
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // In a real app, you would check the user's session with your backend
        const savedUser = localStorage.getItem('user');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Failed to check authentication status:', err);
        setError('Failed to verify authentication status');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      // In a real app, you would make an API call to your authentication endpoint
      // For now, we'll simulate a successful login with mock data
      if (email && password) {
        const mockUser = {
          id: '123456',
          email,
          name: 'Demo User',
          photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
          preferences: {
            language: 'en',
            currency: 'USD',
            notifications: true
          }
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        message.success('Login successful');
        return mockUser;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
      message.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signup = async (email, password, name) => {
    setLoading(true);
    try {
      // In a real app, you would make an API call to your registration endpoint
      if (email && password && name) {
        const mockUser = {
          id: '123456',
          email,
          name,
          photoURL: null,
          preferences: {
            language: 'en',
            currency: 'USD',
            notifications: true
          }
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        message.success('Account created successfully');
        return mockUser;
      } else {
        throw new Error('Please fill in all required fields');
      }
    } catch (err) {
      setError(err.message);
      message.error(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // In a real app, you would make an API call to your logout endpoint
      setUser(null);
      localStorage.removeItem('user');
      message.success('Logged out successfully');
    } catch (err) {
      setError(err.message);
      message.error('Failed to log out');
      throw err;
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      // In a real app, you would make an API call to update the user's profile
      const updatedUser = {
        ...user,
        ...profileData
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      message.success('Profile updated successfully');
      return updatedUser;
    } catch (err) {
      setError(err.message);
      message.error('Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    setLoading(true);
    try {
      // In a real app, you would make an API call to send a password reset email
      message.success('Password reset email sent');
    } catch (err) {
      setError(err.message);
      message.error('Failed to send password reset email');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear any auth errors
  const clearError = () => {
    setError(null);
  };

  const contextValue = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    resetPassword,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};