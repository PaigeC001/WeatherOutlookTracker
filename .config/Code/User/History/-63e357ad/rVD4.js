document.getElementById('artistForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const artistName = document.getElementById('artist-search').value; // Get the artist name from the input field
    if (artistName) { // If there is an artist name, call the lookupArtist function
        lookupArtist(artistName);
    }
});

function lookupArtist(artistName) {
    const apiUrl = `https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.length > 0) {
                const artist = data.data[0];
                displayArtistInfo(artist);
            } else {
                displayArtistInfo(null);
            }
        })
        .catch(error => {
            console.error('Error fetching artist data:', error);
            displayArtistInfo(null);
        });
}

function displayArtistInfo(artist) {
    const artistInfoDiv = document.getElementById('artistInfo');
    artistInfoDiv.innerHTML = '';

    if (artist) {
        artistInfoDiv.innerHTML = `
            <h2>${artist.name}</h2>
            <img src="${artist.picture_medium}" alt="${artist.name}">
            <p>Fans: ${artist.nb_fan}</p>
        `;
    } else {
        artistInfoDiv.innerHTML = '<p>Artist not found.</p>';
    }
}
