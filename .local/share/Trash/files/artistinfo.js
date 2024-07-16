// Example Last.fm API request for artist info and image
const lastfmEndpoint = 'http://ws.audioscrobbler.com/2.0/';
const lastfmAPIKey = 'your_lastfm_api_key'; // Replace with your Last.fm API key

function fetchArtistInfo(artist) {
    const url = `${lastfmEndpoint}?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${lastfmAPIKey}&format=json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extract album image URL from the response
            const image = data.artist.image[3]['#text']; // Use a specific image size
            document.getElementById('artist-art').src = image;
        })
        .catch(error => console.error('Error fetching data:', error));
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pure-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const artist = document.getElementById('artist-search').value;
        fetchArtistInfo(artist);
    });
});
