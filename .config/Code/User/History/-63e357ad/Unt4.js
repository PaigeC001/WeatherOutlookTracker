document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".user-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const artist = document.getElementById("artist-search").value.trim();
        const genre = document.getElementById("genre-search").value.trim();
        
        if (artist || genre) {
            fetchMusicData(artist, genre);
        } else {
            alert("Please enter an artist or select a genre.");
        }
    });
});

async function fetchMusicData(artist, genre) {
    const apiKey = '1b4d9e26585afee61aea001c3df2919b';
    try {
        let apiUrl = 'https://ws.audioscrobbler.com/2.0/?';
        
        if (artist) {
            apiUrl += `method=artist.gettopalbums&artist=${encodeURIComponent(artist)}&`;
        } else if (genre) {
            apiUrl += `method=tag.gettopalbums&tag=${encodeURIComponent(genre)}&`;
        }
        
        apiUrl += `api_key=${apiKey}&format=json`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Unknown error from Last.fm API');
        }

        if (data.topalbums && data.topalbums.album.length > 0) {
            const album = data.topalbums.album[0];
            const artistName = album.artist.name;
            const albumName = album.name;
            const albumCover = album.image.find(img => img.size === 'large')['#text'];

            const trackResponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${encodeURIComponent(artistName)}&album=${encodeURIComponent(albumName)}&api_key=${apiKey}&format=json`);
            const trackData = await trackResponse.json();
            
            if (trackData.error) {
                throw new Error(trackData.message || 'Unknown error from Last.fm API');
            }

            const trackName = trackData.album.tracks.track[0].name;
            const releaseDate = trackData.album.wiki ? trackData.album.wiki.published : 'Unknown';

            document.getElementById("artist-name").textContent = artistName;
            document.getElementById("track-name").textContent = trackName;
            document.getElementById("artist-art").src = albumCover;
            document.getElementById("genre").textContent = genre || 'Genre'; // Set default or empty, as genre is not provided
            document.getElementById("album-name").textContent = albumName;
            document.getElementById("release-date").textContent = releaseDate;
        } else {
            alert("No data found for the given artist or genre.");
        }
    } catch (error) {
        console.error('Error fetching data from Last.fm API:', error);
        alert("An error occurred while fetching data. Please try again.");
    }
}
