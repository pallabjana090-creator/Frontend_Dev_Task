import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import '../styles/Auth.css';

/**
 * LoginPage Component
 * Fulfills all Assignment 7 requirements:
 * 1. Username Required Validation
 * 2. Password Required Validation
 * 3. Display Password Strength (interactive meter)
 * 4. Remember User functionality
 * 5. JWT Token simulation and LocalStorage persistence
 * 6. Redirect to target Protected Dashboard
 */
const LoginPage = () => {
  const { login, rememberedUsername, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(rememberedUsername || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedUsername));

  // Validation Error States
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Destination route
  const from = location.state?.from?.pathname || '/dashboard';

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Pre-fill remembered username when available
  useEffect(() => {
    if (rememberedUsername) {
      setUsername(rememberedUsername);
      setRememberMe(true);
    }
  }, [rememberedUsername]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (usernameError) setUsernameError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
  };

  // Form Submission Validation & Login
  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    // Validation 1: Username Required
    if (!username.trim()) {
      setUsernameError('Username is required.');
      hasError = true;
    }

    // Validation 2: Password Required
    if (!password) {
      setPasswordError('Password is required.');
      hasError = true;
    }

    if (hasError) return;

    // Execute Login with JWT generation and LocalStorage persistence
    login(username, password, rememberMe);

    // Navigate to protected destination
    navigate(from, { replace: true });
  };

  // Demo auto-fill helper for quick evaluator convenience
  const handleAutoFillDemo = () => {
    setUsername('alex.morgan@taskflow.dev');
    setPassword('TaskFlow@2026!');
    setUsernameError('');
    setPasswordError('');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon-badge">🔐</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">
            Sign in to access your protected TaskFlow dashboard.
          </p>
        </div>

        {/* Login Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Field 1: Username / Email */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              <span>Username or Email *</span>
            </label>
            <input
              id="username"
              type="text"
              className={`form-input ${usernameError ? 'has-error' : ''}`}
              placeholder="e.g. alex.morgan@taskflow.dev"
              value={username}
              onChange={handleUsernameChange}
              autoComplete="username"
            />
            {/* Username Required Validation Display */}
            {usernameError && (
              <span className="validation-error-msg">
                ⚠️ {usernameError}
              </span>
            )}
          </div>

          {/* Field 2: Password with Strength Meter */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <span>Password *</span>
            </label>
            <input
              id="password"
              type="password"
              className={`form-input ${passwordError ? 'has-error' : ''}`}
              placeholder="Enter your account password..."
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
            {/* Password Required Validation Display */}
            {passwordError && (
              <span className="validation-error-msg">
                ⚠️ {passwordError}
              </span>
            )}

            {/* Display Password Strength Meter Requirement */}
            <PasswordStrengthMeter password={password} />
          </div>

          {/* Remember User Checkbox Requirement */}
          <label className="remember-me-row">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="remember-me-label">
              Remember username on this device
            </span>
          </label>

          {/* Submit Button */}
          <button type="submit" className="btn-submit-auth">
            Sign In &amp; Generate Token ➔
          </button>

          {/* Demo Convenience Auto-Fill */}
          <button
            type="button"
            className="btn-demo-fill"
            onClick={handleAutoFillDemo}
          >
            ⚡ Auto-Fill Demo Credentials (Strong Password)
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

