document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const artistName = document.getElementById('artistName').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const decade = document.getElementById('decade').value.trim();
    
    getMusic(artistName, genre, decade);
});

function getMusic(artistName, genre, decade) {
    let searchUrl = 'https://api.deezer.com/search?q=';

    if (artistName) {
        searchUrl += `artist:"${artistName}" `;
    }
    if (genre) {
        searchUrl += `genre:"${genre}" `;
    }
    if (decade) {
        const startYear = parseInt(decade.substring(0, 4));
        const endYear = startYear + 9;
        searchUrl += `year:${startYear}-${endYear} `;
    }

    searchUrl = searchUrl.trim().replace(/ /g, '%20'); // Encode the URL

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.data.length > 0) {
                const artistId = data.data[0].artist.id; // Assuming the first result is relevant

                // Fetch top tracks for the artist
                const tracksUrl = `https://api.deezer.com/artist/${artistId}/top?limit=10`;

                return fetch(tracksUrl);
            } else {
                throw new Error(`No results found for your search criteria.`);
            }
        })
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<h2>Top 10 Tracks:</h2><ul>';

            data.data.forEach(track => {
                resultsDiv.innerHTML += `<li>${track.title}</li>`;
            });

            resultsDiv.innerHTML += '</ul>';
        })
        .catch(error => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `<p>${error.message}</p>`;
        });
}
