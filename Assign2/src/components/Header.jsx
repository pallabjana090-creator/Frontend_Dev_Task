import React from 'react';
import '../styles/Header.css';

/**
 * Header Component
 * Receives portal metadata and statistics via Props:
 * @param {string} title - Portal Title
 * @param {string} subtitle - Explanatory subtitle
 * @param {string} institution - Name of University or Academic Institute
 * @param {number} totalStudents - Count of students
 * @param {number} topCgpa - Highest CGPA among students
 * @param {number} avgCgpa - Average CGPA across cohort
 */
const Header = ({ title, subtitle, institution, totalStudents, topCgpa, avgCgpa }) => {
  return (
    <header className="portal-header">
      <div className="header-inner">
        <div className="header-branding">
          <span className="institution-tag">
            <span>🏛️</span> {institution}
          </span>
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>

        <div className="header-stats">
          <div className="stat-chip">
            <span className="stat-value cyan">{totalStudents}</span>
            <span className="stat-label">Total Records</span>
          </div>

          <div className="stat-chip">
            <span className="stat-value gold">{topCgpa.toFixed(2)}</span>
            <span className="stat-label">Highest CGPA</span>
          </div>

          <div className="stat-chip">
            <span className="stat-value">{avgCgpa.toFixed(2)}</span>
            <span className="stat-label">Average CGPA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

