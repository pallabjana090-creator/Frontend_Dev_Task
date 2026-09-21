import React from 'react';
import '../styles/LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * Displays animated spinner and status message during async API requests.
 */
const LoadingSpinner = ({ city }) => {
  return (
    <div className="loading-wrapper" role="status" aria-live="polite">
      <div className="spinner-outer">
        <div className="spinner-ring"></div>
        <div className="spinner-core">⛅</div>
      </div>
      <p className="loading-text">
        Fetching live weather data for {city ? `"${city}"` : 'selected city'}...
      </p>
      <span className="loading-subtext">Connecting to OpenWeatherMap API</span>
    </div>
  );
};

export default LoadingSpinner;

