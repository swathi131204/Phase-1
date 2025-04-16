const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "a860b4743729a8d7a5fcc7bf6836e5bb"; 

app.get("/weather", async (req, res) => {
  const { city, unit } = req.query;

  try {
    const currentRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
    );

    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
    );

    const groupedForecast = forecastRes.data.list.reduce((acc, item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!acc[date]) {
        acc[date] = {
          date,
          temp: Math.round(item.main.temp),
          desc: item.weather[0].description,
        };
      }
      return acc;
    }, {});

    const forecast = Object.values(groupedForecast).slice(0, 5);

    res.json({
      current: currentRes.data,
      forecast,
    });
  } catch (err) {
    console.error("❌ Error fetching weather:", err.message);
    res.status(404).send("Weather data not found");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🌦️ Weather API server running at http://localhost:${PORT}`);
});
