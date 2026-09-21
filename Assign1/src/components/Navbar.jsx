import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <a href="#" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo-highlight">&lt;Dev</span>Portfolio<span className="dot">/&gt;</span>
        </a>

        {/* Mobile Hamburger Toggle */}
        <div 
          className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          role="button"
          tabIndex={0}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Menu Links */}
        <ul className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <a href="#about" className="nav-link" onClick={closeMenu}>About Me</a>
          </li>
          <li>
            <a href="#education" className="nav-link" onClick={closeMenu}>Education</a>
          </li>
          <li>
            <a href="#skills" className="nav-link" onClick={closeMenu}>Skills</a>
          </li>
          <li>
            <a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a>
          </li>
          <li>
            <a href="#contact" className="btn btn-primary nav-btn" onClick={closeMenu}>
              Let's Connect
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

