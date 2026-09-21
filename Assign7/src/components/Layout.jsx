import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import JwtInspectorModal from './JwtInspectorModal';
import '../styles/Layout.css';

/**
 * Layout Component
 * Shell for authenticated pages:
 * - NavLink navigation
 * - JWT Token Inspector trigger
 * - User Profile & Logout button
 * - <Outlet /> for protected routes
 */
const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isJwtModalOpen, setIsJwtModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-wrapper">
      {/* Top Application Header */}
      <header className="app-header">
        <div className="header-inner">
          <Link to="/dashboard" className="brand-wrap">
            <div className="brand-icon">🔐</div>
            <span>
              Task<span className="brand-gradient">Flow</span>
            </span>
          </Link>

          {/* Navigation with NavLink */}
          <nav className="header-nav">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              📊 Dashboard
            </NavLink>

            <NavLink
              to="/tasks"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              📑 All Tasks
            </NavLink>

            <NavLink
              to="/add-task"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              ➕ Add Task
            </NavLink>

            <NavLink
              to="/completed"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              ✅ Completed
            </NavLink>
          </nav>

          {/* Auth Actions: JWT Inspector & Logout */}
          <div className="header-auth-actions">
            {/* JWT Token Inspector Button */}
            <button
              type="button"
              className="btn-jwt-inspector"
              onClick={() => setIsJwtModalOpen(true)}
              title="Inspect simulated JWT token in LocalStorage"
            >
              🔑 JWT Token
            </button>

            {/* User Profile Badge */}
            {user && (
              <div className="user-profile-badge">
                <span>{user.avatar || '👤'}</span>
                <span>{user.name}</span>
              </div>
            )}

            {/* Logout Button */}
            <button
              type="button"
              className="btn-logout"
              onClick={handleLogout}
              title="Sign out and clear session"
            >
              Logout ➔
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area hosting Protected Views */}
      <main className="page-container">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div>
            <strong>TaskFlow Auth</strong> • Assignment 7: Authentication System
          </div>
          <div>
            LocalStorage Token Persistence • JWT Simulation • Route Protection
          </div>
        </div>
      </footer>

      {/* JWT Diagnostics Inspector Modal */}
      <JwtInspectorModal
        isOpen={isJwtModalOpen}
        onClose={() => setIsJwtModalOpen(false)}
      />
    </div>
  );
};

export default Layout;

