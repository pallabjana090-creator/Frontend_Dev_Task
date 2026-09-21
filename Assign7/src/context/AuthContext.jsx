import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateSimulatedJWT, isTokenValid, decodeSimulatedJWT } from '../utils/jwtUtils';

/**
 * AuthContext
 * Central state and LocalStorage persistence manager for Assignment 7:
 * - Login / Logout
 * - Local Storage storage & retrieval of simulated JWT tokens
 * - "Remember User" persistence
 * - Token validity validation
 */
const AuthContext = createContext(null);

const TOKEN_KEY = 'taskflow_jwt_token';
const USER_KEY = 'taskflow_user';
const REMEMBERED_KEY = 'taskflow_remembered_user';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [rememberedUsername, setRememberedUsername] = useState(() => {
    return localStorage.getItem(REMEMBERED_KEY) || '';
  });

  // Verify token validity on initial mount
  const isAuthenticated = Boolean(token && user && isTokenValid(token));

  // If token is found to be expired on mount, clean up
  useEffect(() => {
    if (token && !isTokenValid(token)) {
      logout();
    }
  }, [token]);

  /**
   * Login Handler
   * @param {string} username - User login email or handle
   * @param {string} password - User password
   * @param {boolean} rememberMe - Whether to persist username in localStorage
   */
  const login = (username, password, rememberMe = false) => {
    const cleanUsername = username.trim();

    // Create user profile object
    const userProfile = {
      username: cleanUsername,
      email: cleanUsername.includes('@') ? cleanUsername : `${cleanUsername}@taskflow.dev`,
      name: cleanUsername.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      role: 'Project Manager',
      avatar: '👨‍💼',
      loginTime: new Date().toLocaleTimeString()
    };

    // 1. Generate Simulated 3-part JWT Token
    const jwtToken = generateSimulatedJWT({
      sub: userProfile.email,
      name: userProfile.name,
      role: userProfile.role
    }, 24);

    // 2. Persist in LocalStorage
    localStorage.setItem(TOKEN_KEY, jwtToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userProfile));

    // 3. Handle "Remember User" feature
    if (rememberMe) {
      localStorage.setItem(REMEMBERED_KEY, cleanUsername);
      setRememberedUsername(cleanUsername);
    } else {
      localStorage.removeItem(REMEMBERED_KEY);
      setRememberedUsername('');
    }

    // 4. Update React State
    setToken(jwtToken);
    setUser(userProfile);

    return true;
  };

  /**
   * Logout Handler
   * Clears token and user session, but preserves remembered username if checked
   */
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  const getDecodedToken = () => {
    return decodeSimulatedJWT(token);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        rememberedUsername,
        login,
        logout,
        getDecodedToken
      }}
    >
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

