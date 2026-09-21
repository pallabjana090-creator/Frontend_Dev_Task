import React from 'react';
import '../styles/WeatherCard.css';

/**
 * WeatherCard Component
 * Displays all required weather attributes:
 * - Temperature (°C, feels like, min/max)
 * - Humidity (%)
 * - Wind Speed (m/s & km/h)
 * - Weather Icon (official OpenWeatherMap condition icon)
 * - Sunrise & Sunset Time (formatted from Unix epoch)
 */
const WeatherCard = ({ data }) => {
  if (!data) return null;

  const {
    cityName,
    country,
    temperature,
    feelsLike,
    tempMin,
    tempMax,
    humidity,
    windSpeed,
    windSpeedKmh,
    weatherDescription,
    weatherIcon,
    sunrise,
    sunset,
    isDemo,
    timestamp
  } = data;

  return (
    <div className="weather-card">
      {/* City, Conditions, & Temperature Hero */}
      <div className="weather-hero-row">
        <div className="city-info-group">
          <h2 className="city-name">
            {cityName}
            {country && <span className="country-flag-badge">{country}</span>}
            {isDemo && <span className="demo-indicator">Simulation Mode</span>}
          </h2>
          <div className="weather-desc-text">
            <span>⛅</span> {weatherDescription}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            Updated at {timestamp}
          </span>
        </div>

        {/* Temperature & Official Weather Icon */}
        <div className="temp-visual-group">
          <div className="weather-icon-frame">
            <img
              src={weatherIcon}
              alt={weatherDescription}
              className="weather-icon-img"
            />
          </div>

          <div className="temp-numeric-block">
            <div className="main-temp">
              {temperature}<span className="temp-unit">°C</span>
            </div>
            <div className="temp-sub-metrics">
              <span>Feels: {feelsLike}°C</span>
              <span>•</span>
              <span>L: {tempMin}° / H: {tempMax}°</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-divider"></div>

      {/* Required Metrics Grid: Humidity, Wind Speed, Sunrise, Sunset */}
      <div className="weather-metrics-grid">
        {/* Metric 1: Humidity */}
        <div className="metric-card">
          <div className="metric-icon-box humidity">💧</div>
          <div className="metric-content">
            <span className="metric-label">Humidity</span>
            <span className="metric-value">{humidity}%</span>
            <span className="metric-sub">Relative moisture</span>
          </div>
        </div>

        {/* Metric 2: Wind Speed */}
        <div className="metric-card">
          <div className="metric-icon-box wind">💨</div>
          <div className="metric-content">
            <span className="metric-label">Wind Speed</span>
            <span className="metric-value">{windSpeed} <span style={{ fontSize: '0.85rem' }}>m/s</span></span>
            <span className="metric-sub">~{windSpeedKmh} km/h</span>
          </div>
        </div>

        {/* Metric 3: Sunrise Time */}
        <div className="metric-card">
          <div className="metric-icon-box sunrise">🌅</div>
          <div className="metric-content">
            <span className="metric-label">Sunrise Time</span>
            <span className="metric-value">{sunrise}</span>
            <span className="metric-sub">Dawn schedule</span>
          </div>
        </div>

        {/* Metric 4: Sunset Time */}
        <div className="metric-card">
          <div className="metric-icon-box sunset">🌇</div>
          <div className="metric-content">
            <span className="metric-label">Sunset Time</span>
            <span className="metric-value">{sunset}</span>
            <span className="metric-sub">Dusk schedule</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

