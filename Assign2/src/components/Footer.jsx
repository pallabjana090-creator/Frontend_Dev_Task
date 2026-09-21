import React from 'react';
import '../styles/Footer.css';

/**
 * Footer Component
 * Receives all footer metadata via Props:
 * @param {string} portalName - Name of the application
 * @param {string} institution - Sponsoring institution
 * @param {string} academicYear - Current session/year
 * @param {string} courseCode - Relevant course / assignment tag
 */
const Footer = ({ portalName, institution, academicYear, courseCode }) => {
  return (
    <footer className="portal-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-brand">
            <span>🎓</span> {portalName}
          </div>
          <p className="footer-copy">
            © {academicYear} {institution}. All rights reserved. Data rendered dynamically via React Props.
          </p>
        </div>

        <div className="footer-badges">
          <span className="footer-badge">📌 {courseCode}</span>
          <span className="footer-badge">⚛️ React 18 &amp; JSX</span>
          <span className="footer-badge">🔄 Props Architecture</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

