// Function to load artist image using Last.fm API
function loadArtistImage(artistName) {
    const apiKey = 'YOUR_LASTFM_API_KEY'; // Replace with your Last.fm API key
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error fetching artist info:', data.message);
                return;
            }
            const artist = data.artist;
            if (artist && artist.image && artist.image.length > 0) {
                const imageUrl = artist.image[2]['#text']; // Change index based on desired image size
                document.getElementById('artist-art').src = imageUrl; // Update the image src
            } else {
                console.error('Artist image not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching artist info:', error);
        });
}

// Function to handle form submission
document.getElementById('pure-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const artistName = document.getElementById('artist-search').value.trim();
    const genre = document.getElementById('genre-search').value.trim();

    if (artistName) {
        loadArtistImage(artistName);
    } else if (genre !== 'No Selection') {
        // Handle genre search if needed (optional)
        console.log('Genre selected:', genre);
        // You can add logic to handle genre-specific actions or display a random artist within that genre
        // Example: Display a random artist image for the selected genre
        const randomArtist = getRandomArtistByGenre(genre);
        if (randomArtist) {
            loadArtistImage(randomArtist);
        } else {
            console.error('No artist found for the selected genre.');
        }
    } else {
        console.error('Please enter an artist name or select a genre.');
    }
});

// Function to get a random artist based on selected genre (example function)
function getRandomArtistByGenre(genre) {
    // Implement logic to fetch or select a random artist based on the selected genre
    // This is just a placeholder function, you would need to implement your own logic
    // or fetch from a database or API that provides random artists by genre
    const artistsByGenre = {
        'Alternative': ['Artist1', 'Artist2', 'Artist3'], // Example artists for 'Alternative' genre
        'Pop': ['Artist4', 'Artist5', 'Artist6'], // Example artists for 'Pop' genre
        // Add more genres and corresponding arrays of artists as needed
    };

    const artists = artistsByGenre[genre];
    if (artists && artists.length > 0) {
        const randomIndex = Math.floor(Math.random() * artists.length);
        return artists[randomIndex];
    }
    return null;
}
