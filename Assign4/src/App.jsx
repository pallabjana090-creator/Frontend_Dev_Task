import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import { fetchWeatherData } from './services/weatherService';
import './styles/index.css';

/**
 * Main Application Component for Assignment 4: Weather Dashboard
 * Demonstrates:
 * 1. API Integration via OpenWeatherMap API
 * 2. Fetch with Async / Await
 * 3. useEffect() Hook for lifecycle loading on initial mount
 * 4. Comprehensive Error Handling (invalid city, network error, retry mechanism)
 * 5. Conditional Rendering for Loading Spinner, Error Card, and Weather Card
 */
function App() {
  const [currentCity, setCurrentCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');

  // Async function to fetch weather data with proper error handling
  const loadWeather = useCallback(async (cityToFetch) => {
    if (!cityToFetch || !cityToFetch.trim()) {
      setError('Please enter a city name to search.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Async/Await with fetch abstraction
      const data = await fetchWeatherData(cityToFetch, apiKey);
      setWeatherData(data);
      setCurrentCity(data.cityName);
    } catch (err) {
      setWeatherData(null);
      setError(err.message || 'Failed to retrieve weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  // useEffect(): Lifecycle hook to fetch initial weather on mount
  useEffect(() => {
    loadWeather('London');
  }, [loadWeather]);

  // Handler for user searches
  const handleSearch = (newCity) => {
    setCurrentCity(newCity);
    loadWeather(newCity);
  };

  // Handler to retry the current search
  const handleRetry = () => {
    loadWeather(currentCity);
  };

  return (
    <div className="app-container">
      {/* Header with Title & API Key Settings */}
      <Header apiKey={apiKey} onSaveApiKey={setApiKey} />

      <main className="main-content">
        {/* City Search Bar & Quick Picks */}
        <SearchBar
          onSearch={handleSearch}
          activeCity={currentCity}
          isLoading={isLoading}
        />

        {/* Conditional Rendering: Loading State */}
        {isLoading && <LoadingSpinner city={currentCity} />}

        {/* Conditional Rendering: Error State */}
        {!isLoading && error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Conditional Rendering: Weather Data Card */}
        {!isLoading && !error && weatherData && (
          <WeatherCard data={weatherData} />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

