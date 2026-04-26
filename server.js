const appInsights = require('applicationinsights');
appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start();

const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend files from the "public" folder
app.use(express.static('public'));

// Weather API endpoint
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'Please provide a city name' });
    }

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            return res.status(404).json({ error: 'City not found' });
        }

        res.json({
            city: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            wind_speed: data.wind.speed
        });

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});