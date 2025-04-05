
require("dotenv").config();

const express = require("express");  
const mongoose = require("mongoose"); 
const axios = require("axios"); 
const cron = require("node-cron"); 
const MONGO_URI = "mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/?retryWrites=true&w=majority&appName=admin";

mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


const WeatherDataSchema = new mongoose.Schema({
    location: String,         
    temperature: Number,         
    humidity: Number,            
    weather_condition: String,   
    timestamp: { type: Date, default: Date.now } 
});

const WeatherData = mongoose.model("WeatherData", WeatherDataSchema);

const fetchWeatherData = async () => {
    try {
    
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${process.env.LOCATION}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

        const response = await axios.get(API_URL);
        const data = response.data;

        const weatherEntry = new WeatherData({
            location: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            weather_condition: data.weather[0].description,
        });

        await weatherEntry.save();
        console.log("✅ Weather data saved:", weatherEntry);
    } catch (error) {
        console.error("❌ Error fetching weather data:", error.message);
    }
};

cron.schedule("0 * * * *", () => {
    console.log("⏳ Fetching weather data...");
    fetchWeatherData();
});

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/weather/history", async (req, res) => {
    try {
        const { start, end } = req.query; 
        let filter = {};

        if (start && end) {
            filter.timestamp = {
                $gte: new Date(start),
                $lte: new Date(end),
            };
        }

        const history = await WeatherData.find(filter);
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "❌ Error retrieving data", error });
    }
});

app.get("/weather/average", async (req, res) => {
    try {
        const { start, end } = req.query; 
        const data = await WeatherData.find({
            timestamp: { $gte: new Date(start), $lte: new Date(end) },
        });

        if (data.length === 0) return res.json({ message: "⚠️ No data available" });

        const avgTemp = data.reduce((acc, cur) => acc + cur.temperature, 0) / data.length;
        res.json({ average_temperature: avgTemp.toFixed(2) });
    } catch (error) {
        res.status(500).json({ message: "❌ Error calculating average", error });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/weather/fetch-now", async (req, res) => {
    await fetchWeatherData();
    res.json({ message: "✅ Weather data fetched and saved." });
});
