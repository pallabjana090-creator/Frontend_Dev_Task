import React, { createContext, useContext, useState } from 'react';

/**
 * AuthContext
 * Manages basic authentication state for demonstrating Protected Routes:
 * - isAuthenticated flag
 * - login / logout methods
 * - user profile details
 */
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Default to true for convenient instant evaluation, with 1-click logout in header
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@taskflow.dev',
    avatar: '👨‍💻'
  });

  const login = (userData = null) => {
    setIsAuthenticated(true);
    if (userData) setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const toggleAuth = () => {
    setIsAuthenticated((prev) => !prev);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

