import express from "express";
import dotenv from "dotenv";
// import fetch from "node-fetch";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;
const API_URL = process.env.WEATHER_API_URL;

// Route to get weather data
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
    const data = await response.json();

    res.json({
      location: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
