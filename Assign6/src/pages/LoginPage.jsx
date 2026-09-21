import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Forms.css';

/**
 * LoginPage Component
 * Demonstrates:
 * 1. Protected Route authentication barrier
 * 2. Redirecting back to previous location using useLocation().state.from
 * 3. 1-click demo login experience
 */
const LoginPage = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve previous target URL from location state or default to /dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleDemoLogin = () => {
    login({
      name: 'Alex Morgan',
      email: 'alex.morgan@taskflow.dev',
      avatar: '👨‍💻'
    });
    // Programmatic navigation back to original requested protected route
    navigate(from, { replace: true });
  };

  return (
    <div className="form-page-card" style={{ maxWidth: '500px', margin: '40px auto', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔒</div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#ffffff', marginBottom: '8px' }}>
        Protected Route Access
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>
        You must be signed in to access <code style={{ color: 'var(--primary)' }}>{from}</code>.
      </p>

      <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--border-hover)', borderRadius: '8px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
        <p style={{ fontSize: '0.85rem', color: '#c4b5fd', margin: 0 }}>
          💡 <strong>Protected Route Demo</strong>: Click below to sign in instantly with demo credentials. You will be redirected directly back to your destination.
        </p>
      </div>

      <button
        type="button"
        className="btn-form-submit"
        style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
        onClick={handleDemoLogin}
      >
        Sign In as Demo User 🚀
      </button>
    </div>
  );
};

export default LoginPage;

