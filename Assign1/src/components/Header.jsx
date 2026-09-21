import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="hero-section">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>
      
      <div className="container hero-wrapper">
        <div className="hero-content">
          <div className="hero-status">
            <span className="status-indicator"></span>
            Available for Opportunities
          </div>
          
          <h2 className="hero-greeting">Hi there, I'm</h2>
          <h1 className="hero-name">
            Alex <span className="hero-name-gradient">Morgan</span>
          </h1>
          
          <h3 className="hero-title">
            Frontend & Full-Stack React Developer
          </h3>
          
          <p className="hero-description">
            Passionate about building fast, responsive, and delightful user interfaces with modern React, JavaScript, and accessible web standards. Bringing ideas to life one pixel at a time.
          </p>
          
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Get in Touch
            </a>
            <a href="#about" className="btn btn-secondary">
              Discover More
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="avatar-card">
            <div className="floating-badge badge-top-right">
              <span>⚡</span> Fast Learner
            </div>
            
            <div className="avatar-circle">
              <span>👨‍💻</span>
            </div>
            
            <div className="avatar-info">
              <div className="avatar-role">Frontend Engineer</div>
              <div className="avatar-exp">React • JSX • Modern Web</div>
            </div>

            <div className="floating-badge badge-bottom-left">
              <span>🚀</span> Clean Code
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

