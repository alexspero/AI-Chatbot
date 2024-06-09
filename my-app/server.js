const OpenAI = require('openai');
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const openaiApiUrl = 'https://api.openai.com/v1/chat/completions';
const openaiApiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI();
const app = express();
const port = 3001; // Choose any available port
app.use(cors()); // Add this line to enable CORS for all routes

app.use(express.json());

app.post('/openai-api-2', async (req, res) => {
    try {
        console.log('Received request:', req.body);

        const stream = openai.beta.chat.completions.stream({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [{ role: 'user', content: req.body }],
        });

        res.header('Content-Type', 'text/plain');
        for await (const chunk of stream.toReadableStream()) {
            res.write(chunk);
        }

        res.end();
    } catch (e) {
        console.error(e);
    }
});

app.post('/openai-api-1', async (req, res) => {
    try {
        const response = await fetch(openaiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`,
            },
            body: JSON.stringify(req.body),
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
