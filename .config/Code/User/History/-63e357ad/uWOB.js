document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".user-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const artist = document.getElementById("artist-search").value.trim();
        fetchArtistData(artist);
    });
});

async function fetchArtistData(artist) {
    const apiKey = 'YOUR_LAST_FM_API_KEY';
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${apiKey}&format=json`);
        const data = await response.json();

        if (data.topalbums && data.topalbums.album.length > 0) {
            const album = data.topalbums.album[0];
            const artistName = album.artist.name;
            const albumName = album.name;
            const albumCover = album.image.find(img => img.size === 'large')['#text'];

            const trackResponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${artistName}&album=${albumName}&api_key=${apiKey}&format=json`);
            const trackData = await trackResponse.json();
            const trackName = trackData.album.tracks.track[0].name;
            const releaseDate = trackData.album.wiki ? trackData.album.wiki.published : 'Unknown';

            document.getElementById("artist-name").textContent = artistName;
            document.getElementById("track-name").textContent = trackName;
            document.getElementById("artist-art").src = albumCover;
            document.getElementById("genre").textContent = 'Genre'; // Set default or empty, as genre is not provided
            document.getElementById("album-name").textContent = albumName;
            document.getElementById("release-date").textContent = releaseDate;
        } else {
            alert("No data found for the given artist.");
        }
    } catch (error) {
        console.error('Error fetching data from Last.fm API:', error);
        alert("An error occurred while fetching data. Please try again.");
    }
}
