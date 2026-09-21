import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="farm-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-title">
            <span>🌾</span> GreenPastures Agro-Farms Management
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} GreenPastures Organic Farms Ltd. All rights reserved.
          </p>
        </div>

        <div className="footer-tags">
          <span className="footer-tag">Assignment 3: State &amp; Events</span>
          <span className="footer-tag">⚡ useState() Hooks</span>
          <span className="footer-tag">🎯 Conditional Rendering</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

