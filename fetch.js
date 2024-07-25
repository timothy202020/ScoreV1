import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

const API_KEY = 'b25a8426c2e645cd8de0f97888e22ed7';  // Your actual API key
const API_URL = 'https://api.football-data.org/v4/matches';  // Your actual API URL

app.get('/scores', async (req, res) => {
    try {
        const response = await fetch(API_URL, {
            headers: { 'X-Auth-Token': API_KEY }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const matches = data.matches.map(match => ({
            homeTeam: match.homeTeam.name,
            awayTeam: match.awayTeam.name,
            homeScore: match.score.fullTime.homeTeam,
            awayScore: match.score.fullTime.awayTeam,
            time: match.utcDate
        }));

        res.json(matches);
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Error fetching scores' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
