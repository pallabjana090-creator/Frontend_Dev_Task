import React from 'react';
import '../styles/Header.css';

/**
 * Header Component
 * Farm title branding and dynamic metric cards.
 */
const Header = ({ totalEmployees, filteredCount, departmentCount }) => {
  return (
    <header className="farm-header">
      <div className="header-container">
        <div className="header-brand">
          <span className="farm-badge">
            <span>🌱</span> Agro-Tech Enterprise Portal
          </span>
          <h1 className="header-title">
            GreenPastures <span className="accent">Farm Directory</span>
          </h1>
          <p className="header-subtitle">
            Centralized workforce management portal tracking field staff, livestock technicians, harvest crews, and logistics personnel.
          </p>
        </div>

        <div className="header-counts">
          <div className="count-card">
            <span className="count-number green">{totalEmployees}</span>
            <span className="count-label">Total Staff</span>
          </div>

          <div className="count-card">
            <span className="count-number gold">{filteredCount}</span>
            <span className="count-label">Active View</span>
          </div>

          <div className="count-card">
            <span className="count-number cyan">{departmentCount}</span>
            <span className="count-label">Departments</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

