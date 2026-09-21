import React, { useState } from 'react';
import '../styles/WeatherDashboard.css';

/**
 * Header Component
 * Displays app branding and includes an optional in-app OpenWeatherMap API Key settings drawer.
 */
const Header = ({ apiKey, onSaveApiKey }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey || '');

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(tempKey);
    setShowDrawer(false);
  };

  return (
    <header className="weather-header">
      <div className="header-inner">
        <div className="brand-section">
          <span className="app-badge">
            <span>⚡</span> OpenWeatherMap Client
          </span>
          <h1 className="app-title">
            SkyCast <span className="glow">Weather</span>
          </h1>
          <p className="app-subtitle">
            Real-time meteorological conditions, atmospheric metrics, and solar tracking.
          </p>
        </div>

        <button
          type="button"
          className={`api-key-btn ${apiKey ? 'configured' : ''}`}
          onClick={() => setShowDrawer(!showDrawer)}
        >
          <span>🔑</span>
          {apiKey ? 'Custom API Key Active' : 'API Key Settings'}
        </button>
      </div>

      {/* API Key Configuration Drawer */}
      {showDrawer && (
        <div className="header-inner" style={{ marginTop: '16px' }}>
          <form className="api-key-drawer" onSubmit={handleSave}>
            <label htmlFor="api-key-input">
              Enter your OpenWeatherMap API Key (Optional)
            </label>
            <div className="api-key-input-row">
              <input
                id="api-key-input"
                type="password"
                className="api-key-input"
                placeholder="Paste OpenWeatherMap 32-character API key..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
              />
              <button type="submit" className="api-key-btn" style={{ background: 'var(--accent-blue)', color: '#000' }}>
                Save Key
              </button>
            </div>
            <p className="api-key-help">
              Leave blank to use the built-in demo mode with simulated responses for instant evaluation.
            </p>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;

