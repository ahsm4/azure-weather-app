const appInsights = require('applicationinsights');
appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start();

const express = require('express');
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Key Vault setup
const keyVaultUrl = process.env.KEY_VAULT_URL;
let weatherApiKey = null;

async function getApiKey() {
    if (weatherApiKey) return weatherApiKey;
    
    try {
        const credential = new DefaultAzureCredential();
        const client = new SecretClient(keyVaultUrl, credential);
        const secret = await client.getSecret('openweather-api-key');
        weatherApiKey = secret.value;
        console.log('Successfully retrieved API key from Key Vault');
    } catch (error) {
        console.error('Error retrieving from Key Vault:', error.message);
        // Fallback to environment variable for local development
        weatherApiKey = process.env.OPENWEATHER_API_KEY;
        console.log('Falling back to environment variable');
    }
    
    return weatherApiKey;
}

// Serve frontend files from the "public" folder
app.use(express.static('public'));

// Weather API endpoint
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'Please provide a city name' });
    }

    try {
        const apiKey = await getApiKey();
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