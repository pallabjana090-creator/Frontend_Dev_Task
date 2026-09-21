import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="weather-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-title">
            <span>🌦️</span> SkyCast Meteorological Portal
          </div>
          <p className="footer-copy">
            Data provided by OpenWeatherMap API. Built with React 18, JSX, and async/await.
          </p>
        </div>

        <div className="footer-tags">
          <span className="footer-tag">Assignment 4: Weather Dashboard</span>
          <span className="footer-tag">⚡ Async / Await &amp; Fetch</span>
          <span className="footer-tag">🔄 useEffect() Hook</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

