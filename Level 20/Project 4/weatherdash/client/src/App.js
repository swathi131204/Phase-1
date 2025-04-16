import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("Chennai");
  const [unit, setUnit] = useState("metric"); 
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/weather?city=${city}&unit=${unit}`);
      setWeather(res.data.current);
      setForecast(res.data.forecast);
    } catch (err) {
      console.error("❌ Error fetching weather:", err.message);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [unit, city]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🌦️ WeatherDash</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Search</button>
      <button onClick={toggleUnit}>
        Toggle °{unit === "metric" ? "F" : "C"}
      </button>

      {weather && (
        <div style={{ marginTop: "1rem" }}>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <h3>{weather.main.temp} °{unit === "metric" ? "C" : "F"}</h3>
        </div>
      )}

      {forecast.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>5-Day Forecast</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            {forecast.map((f, index) => (
              <div key={index} style={{ padding: "1rem", border: "1px solid #ccc" }}>
                <p><strong>{f.date}</strong></p>
                <p>{f.temp}°</p>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
