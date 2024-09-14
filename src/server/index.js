// Import necessary modules
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Define constants
const BASE_API_URL = 'https://api.meaningcloud.com/sentiment-2.1?';
const API_KEY = process.env.API_KEY;

// Middleware configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve('dist')));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

// Endpoint to handle sentiment analysis requests
app.post('/analyze-sentiment', async (req, res) => {
    const { url } = req.body;
    const requestUrl = `${BASE_API_URL}key=${API_KEY}&url=${encodeURIComponent(url)}&lang=en`;

    try {
        // Import fetch dynamically
        const fetch = (await import('node-fetch')).default;
        
        // Fetch data from the API
        const apiResponse = await fetch(requestUrl);
        if (!apiResponse.ok) {
            throw new Error(`API Error: ${apiResponse.statusText}`);
        }
        
        // Parse and return JSON data
        const result = await apiResponse.json();
        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error retrieving data from MeaningCloud API' });
    }
});

// Start server on specified port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
