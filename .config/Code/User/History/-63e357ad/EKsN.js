// Function to fetch album cover from Last.fm API
function fetchAlbumCover() {
    // Get user input (artist name or genre)
    let artistName = document.getElementById('artist-search').value.trim();
    let genre = document.getElementById('genre-search').value.trim();

    // Base URL for Last.fm API
    let baseUrl = 'https://ws.audioscrobbler.com/2.0/';

    // API Key (replace 'YOUR_API_KEY' with your actual Last.fm API key)
    let apiKey = 'YOUR_API_KEY';

    // Constructing the API request URL
    let apiUrl = `${baseUrl}?method=artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`;

    // If no artist name is provided, search by genre instead
    if (artistName === '' && genre !== 'No Selection') {
        apiUrl = `${baseUrl}?method=tag.gettopalbums&tag=${genre}&api_key=${apiKey}&format=json`;
    }

    // Making the API request
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Extracting album information from the API response
            let albumCoverUrl = '';

            if (artistName !== '') {
                // Extract album cover URL from artist info response
                albumCoverUrl = data.artist.image[2]['#text']; // Adjust index for desired image size
            } else {
                // Extract album cover URL from top albums response
                albumCoverUrl = data.albums.album[0].image[2]['#text']; // Adjust index for desired image size
            }

            // Display the album cover (replace 'artist-art' with your image element id)
            document.getElementById('artist-art').src = albumCoverUrl;
        })
        .catch(error => {
            console.error('Error fetching album cover:', error);
            // Optionally, display an error message to the user
        });
}
