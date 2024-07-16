const apiKey = 'YOUR_LASTFM_API_KEY'; // Replace with your Last.fm API key

// Function to search for albums based on artist name, genre, and decade
async function searchAlbums(artistName, genre, decade) {
    if (!artistName) {
        console.error('Artist name is required for searching albums.');
        return [];
    }

    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Albums data:', data); // Log the entire response
        return data.results.albummatches.album; // Array of album objects
    } catch (error) {
        console.error('Error searching albums:', error);
        return []; // Return an empty array or handle the error as needed
    }
}

// Function to fetch album cover art from the album object
function fetchAlbumCover(album) {
    try {
        const coverUrl = album.image.find(img => img.size === 'large')['#text'];
        console.log('Cover URL:', coverUrl); // Log the cover URL
        return coverUrl;
    } catch (error) {
        console.error('Error fetching album cover:', error);
        return null; // Handle the error gracefully
    }
}

// Handle form submission
document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    const artistName = document.getElementById('artist-search').value.trim();
    const genre = document.getElementById('genre-search').value.trim();
    const decade = document.getElementById('decade-search').value.trim();

    // Clear previous results
    document.getElementById('coverArt').innerHTML = 'CoverArt/Img';

    try {
        const albums = await searchAlbums(artistName, genre, decade);

        if (albums.length > 0) {
            const firstAlbum = albums[0];
            console.log('First album:', firstAlbum); // Log the first album
            const coverUrl = fetchAlbumCover(firstAlbum);

            if (coverUrl) {
                // Display the album cover
                const imgElement = document.createElement('img');
                imgElement.src = coverUrl;
                imgElement.alt = firstAlbum.name; // Optional: Use album title as alt text
                document.getElementById('coverArt').innerHTML = '';
                document.getElementById('coverArt').appendChild(imgElement);
            } else {
                console.log('Album cover not found or error occurred.');
                document.getElementById('coverArt').innerText = 'Album cover not found.';
            }
        } else {
            console.log('No albums found for the criteria.');
            document.getElementById('coverArt').innerText = 'No albums found for the criteria.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('coverArt').innerText = 'Error occurred while fetching album data.';
    }
});
