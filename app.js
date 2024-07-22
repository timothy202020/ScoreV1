document.addEventListener('DOMContentLoaded', () => {
    const scoreUpdates = document.getElementById('score-updates');

    const fetchScores = async () => {
        try {
            const response = await fetch('/scores'); // Placeholder URL for your API endpoint
            const data = await response.json();

            displayScores(data);
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    };

    const displayScores = (matches) => {
        scoreUpdates.innerHTML = ''; // Clear previous content

        matches.forEach(match => {
            const matchElement = document.createElement('div');
            matchElement.classList.add('match');

            matchElement.innerHTML = `
                <h2>${match.homeTeam} vs ${match.awayTeam}</h2>
                <p>Score: ${match.homeScore} - ${match.awayScore}</p>
                <p>Time: ${match.time}</p>
            `;

            scoreUpdates.appendChild(matchElement);
        });
    };

    fetchScores();
    setInterval(fetchScores, 60000); // Refresh every 60 seconds
});
