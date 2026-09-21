# Assignment 4: Weather Dashboard using OpenWeatherMap API

A responsive React weather application demonstrating **API Integration**, **`fetch`**, **`async/await`**, **`useEffect`**, loading indicators, and comprehensive error handling.

---

## ⛅ Problem Statement & Requirements Met

The application displays all required meteorological data:
1. **Temperature**: Current temperature in °C, "Feels like" metric, and Min/Max daily range.
2. **Humidity**: Relative humidity percentage (`%`).
3. **Wind Speed**: Velocity in `m/s` and approximate `km/h`.
4. **Weather Icon**: Official OpenWeatherMap weather condition icon (`https://openweathermap.org/img/wn/{icon}@2x.png`).
5. **Sunrise & Sunset Time**: Converted from Unix epoch timestamps to localized 12-hour format (`hh:mm AM/PM`).

### ✨ Key Features Implemented:
- **🔍 Search by City**: Controlled search input with Enter key support and quick-pick buttons for popular cities (London, Tokyo, New York, Paris, Mumbai, Sydney).
- **⏳ Loading Spinner**: Animated CSS/SVG spinner with pulse effects displayed while asynchronous network requests are pending.
- **⚠️ Proper Error Handling**:
  - **404 Not Found**: Catches non-existent city names and prompts spelling verification.
  - **Network Failures**: Catches offline errors and displays connection guidance.
  - **Empty Input**: Prevents blank searches.
  - **Retry Button**: Instantly re-attempts the previous search query.
- **🔑 OpenWeatherMap API Support**:
  - Standard endpoint: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  - Includes an in-app API Key drawer for optional custom keys.
  - Built-in simulation fallback mode for instant evaluation without requiring a personal API key immediately.

---

## ⚛️ React Concepts Demonstrated

### 1. `useEffect()` Hook
- Automatically fetches weather for a default city ("London") when the component mounts.
- Memoized with `useCallback` to manage dependencies cleanly.

### 2. `fetch` with `async / await`
- Implemented inside `weatherService.js`:
  ```javascript
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) throw new Error("City not found");
    ...
  }
  const data = await response.json();
  ```
- Uses `try ... catch ... finally` blocks to ensure loading states cleanly resolve on both success and error paths.

### 3. Conditional Rendering
- `{isLoading && <LoadingSpinner city={currentCity} />}`
- `{!isLoading && error && <ErrorMessage message={error} onRetry={handleRetry} />}`
- `{!isLoading && !error && weatherData && <WeatherCard data={weatherData} />}`

---

## 📁 Directory Structure

```
D:\Frontend_Dev_Task\Assign4\
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── ErrorMessage.jsx    # Error banner with retry action
│   │   ├── Footer.jsx          # Attribution and meta tags
│   │   ├── Header.jsx          # Header with API key drawer
│   │   ├── LoadingSpinner.jsx  # Animated weather loader
│   │   ├── SearchBar.jsx       # City search & quick pick buttons
│   │   └── WeatherCard.jsx     # Card displaying all 5 required metrics
│   ├── services/
│   │   └── weatherService.js   # OpenWeatherMap API async fetch service
│   ├── styles/
│   │   ├── ErrorMessage.css    # Error alert styling
│   │   ├── Footer.css          # Footer styling
│   │   ├── index.css           # Global theme & atmospheric styling
│   │   ├── LoadingSpinner.css  # Spinner animation
│   │   ├── SearchBar.css       # Search bar & city pills styling
│   │   ├── WeatherCard.css     # Metric cards & icon frames
│   │   └── WeatherDashboard.css# Header & drawer styling
│   ├── App.jsx                 # Central coordinator with useEffect & async state
│   └── main.jsx                # React root mounting entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 How to Run the Project

1. Navigate to the `Assign4` folder:
   ```powershell
   cd D:\Frontend_Dev_Task\Assign4
   ```
2. Install dependencies (if needed):
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
4. Open the displayed URL (e.g. `http://localhost:3003`) in your browser.

