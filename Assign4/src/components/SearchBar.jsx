import React, { useState } from 'react';
import '../styles/SearchBar.css';

/**
 * SearchBar Component
 * Provides:
 * 1. Search by City input field with onSubmit event handling
 * 2. Quick-pick city pills for one-click weather lookup
 * 3. Loading-disabled controls
 */
const SearchBar = ({ onSearch, activeCity, isLoading }) => {
  const [inputVal, setInputVal] = useState('');

  const quickCities = ['London', 'Tokyo', 'New York', 'Paris', 'Mumbai', 'Sydney'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
      setInputVal('');
    }
  };

  const handleQuickPick = (city) => {
    onSearch(city);
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <span className="search-icon-decor">🔍</span>
          <input
            type="text"
            className="weather-search-input"
            placeholder="Search city (e.g., London, Tokyo, San Francisco)..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="btn-weather-search"
          disabled={isLoading || !inputVal.trim()}
        >
          <span>Search</span>
        </button>
      </form>

      {/* Quick City Navigation Chips */}
      <div className="quick-cities-row">
        <span className="quick-label">Popular:</span>
        {quickCities.map((city) => (
          <button
            key={city}
            type="button"
            className={`city-chip ${
              activeCity && activeCity.toLowerCase() === city.toLowerCase() ? 'active' : ''
            }`}
            onClick={() => handleQuickPick(city)}
            disabled={isLoading}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

