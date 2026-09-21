import React from 'react';
import { NavLink, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Layout.css';

/**
 * Layout Component (Nested Route Shell)
 * Serves as the persistent layout template with:
 * 1. Top Navbar featuring NavLink active states
 * 2. Auth State toggle (Protected Route tester)
 * 3. Breadcrumb navigation using useLocation()
 * 4. <Outlet /> for nested route views
 */
const Layout = () => {
  const { isAuthenticated, user, logout, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Compute breadcrumbs from current pathname
  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    return pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      const formattedName = name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' ');

      return isLast ? (
        <span key={routeTo} style={{ color: 'var(--text-main)', fontWeight: 600 }}>
          {formattedName}
        </span>
      ) : (
        <span key={routeTo} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Link to={routeTo} className="breadcrumb-link">
            {formattedName}
          </Link>
          <span>/</span>
        </span>
      );
    });
  };

  const handleAuthToggle = () => {
    if (isAuthenticated) {
      logout();
      navigate('/login');
    } else {
      login();
      navigate('/dashboard');
    }
  };

  return (
    <div className="app-wrapper">
      {/* Top Application Header */}
      <header className="app-header">
        <div className="header-inner">
          <Link to="/dashboard" className="brand-wrap">
            <div className="brand-icon">📋</div>
            <span>
              Task<span className="brand-gradient">Flow</span>
            </span>
          </Link>

          {/* Navigation with NavLink for active link highlighting */}
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

          {/* User Auth Profile & Protected Route Switch */}
          <div className="header-auth">
            <span className={`auth-badge ${isAuthenticated ? 'logged-in' : 'logged-out'}`}>
              {isAuthenticated ? `● ${user.name}` : '○ Logged Out'}
            </span>

            <button
              type="button"
              className="btn-auth-toggle"
              onClick={handleAuthToggle}
              title="Toggle authentication to test Protected Routes"
            >
              {isAuthenticated ? 'Sign Out' : 'Sign In'}
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation Bar */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-inner">
          <Link to="/dashboard" className="breadcrumb-link">
            Home
          </Link>
          {location.pathname !== '/' && location.pathname !== '/dashboard' && (
            <span>/</span>
          )}
          {getBreadcrumbs()}
        </div>
      </div>

      {/* Main Content Area hosting Nested Routes */}
      <main className="page-container">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div>
            <strong>TaskFlow</strong> • Assignment 6: Task Manager with React Router v6
          </div>
          <div>
            Dynamic Routes (`/tasks/:taskId`) • Nested Routes • Protected Routes
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

