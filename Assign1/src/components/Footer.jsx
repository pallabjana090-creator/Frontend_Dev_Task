import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="navbar-logo" onClick={scrollToTop}>
              <span className="navbar-logo-highlight">&lt;Dev</span>Portfolio<span className="dot">/&gt;</span>
            </a>
            <p className="footer-tagline">
              Building modern, accessible, and fast web experiences with React.
            </p>
          </div>

          <ul className="footer-links">
            <li><a href="#about" className="footer-link">About</a></li>
            <li><a href="#education" className="footer-link">Education</a></li>
            <li><a href="#skills" className="footer-link">Skills</a></li>
            <li><a href="#contact" className="footer-link">Contact</a></li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Alex Morgan. All rights reserved. Built with React &amp; JSX.</p>
          
          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            Back to Top <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

