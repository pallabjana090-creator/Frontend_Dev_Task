import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="shop-footer">
      <div className="footer-inner">
        <div className="footer-brand-text">
          <span>⚡</span> TechVault E-Commerce Portal
        </div>
        <p className="footer-sub">
          © {new Date().getFullYear()} TechVault Retail Pvt. Ltd. All rights reserved. Built with React &amp; Context API.
        </p>
        <div className="footer-badges">
          <span className="footer-badge-pill">Assignment 5: Shopping Cart</span>
          <span className="footer-badge-pill">⚡ useReducer</span>
          <span className="footer-badge-pill">🌐 Context API</span>
          <span className="footer-badge-pill">🧾 18% GST Engine</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

