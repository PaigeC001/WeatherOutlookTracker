// Function to search for albums based on artist name, genre, and decade
async function searchAlbums(artistName, genre, decade) {
    const queryParams = [];

    if (artistName) queryParams.push(`artist:"${artistName}"`);
    if (genre) queryParams.push(`genre:"${genre}"`);
    if (decade) queryParams.push(`release_date:${decade}0s`);

    const queryString = queryParams.join(' ');

    try {
        const response = await fetch(`https://api.deezer.com/search/album?q=${encodeURIComponent(queryString)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Albums data:', data); // Log the entire response
        return data.data; // Array of album objects
    } catch (error) {
        console.error('Error searching albums:', error);
        return []; // Return an empty array or handle the error as needed
    }
}

// Function to fetch album cover art for a given album ID
async function fetchAlbumCover(albumId) {
    try {
        const response = await fetch(`https://api.deezer.com/album/${albumId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Album data:', data); // Log the album data
        const coverUrl = data.cover_medium || data.cover_big || data.cover_small; // Use available cover size

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
            const coverUrl = await fetchAlbumCover(firstAlbum.id);

            if (coverUrl) {
                // Display the album cover
                const imgElement = document.createElement('img');
                imgElement.src = coverUrl;
                imgElement.alt = firstAlbum.title; // Optional: Use album title as alt text
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
