import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '5rem', fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>404</h1>
      <h2 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '12px' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '28px' }}>
        The route you requested does not exist in this task application.
      </p>
      <Link to="/dashboard" className="btn-primary-action" style={{ display: 'inline-block' }}>
        ← Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;

