import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "a860b4743729a8d7a5fcc7bf6836e5bb"; 
const GEO_API_KEY = "YOUR_RAPIDAPI_KEY";

const App = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch city suggestions
  const fetchCities = async (input) => {
    if (input.length < 3) return;
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}`,
        {
          headers: {
            "X-RapidAPI-Key": GEO_API_KEY,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      setSuggestions(response.data.data.map((city) => city.name));
    } catch (err) {
      console.error("Error fetching city suggestions:", err);
    }
  };

  // Fetch weather data
  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const geoResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (geoResponse.data.length === 0) throw new Error("City not found");

      const { lat, lon } = geoResponse.data[0];
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      setWeather(weatherResponse.data);
    } catch (err) {
      setError("Failed to fetch weather. Try another city.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            fetchCities(e.target.value);
          }}
        />
        <button onClick={() => fetchWeather(query)}>Search</button>
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((city, index) => (
              <li key={index} onClick={() => fetchWeather(city)}>
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
