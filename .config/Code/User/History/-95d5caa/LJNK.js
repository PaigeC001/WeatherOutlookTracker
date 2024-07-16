// Listen for form submission
document.getElementById('pure-form pure-form-stacked').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form inputs
    const artist = document.getElementById('artist-search').value.trim();
    const decade = document.getElementById('decade-search').value.trim();
    const genre = document.getElementById('genre-search').value.trim();

    // Construct API query URL based on inputs
    let apiUrl = `https://api.deezer.com/search/track?q=`;

    // Add artist filter
    if (artist) {
        apiUrl += `artist:"${encodeURIComponent(artist)}"`;
    }

    // Add decade filter
    if (decade) {
        apiUrl += ` ${decade}`;
    }

    // Add genre filter
    if (genre && genre !== 'No Selection' && genre !== 'Other') {
        apiUrl += ` genre:"${encodeURIComponent(genre)}"`;
    }

    // Add limit to retrieve only 10 tracks
    apiUrl += `&limit=10`;

    // Fetch tracks from Deezer API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Clear previous results
            const infoBody = document.querySelector('.info-body');
            infoBody.innerHTML = '';

            // Display track information
            data.data.forEach(track => {
                const trackElement = document.createElement('div');
                trackElement.classList.add('info');

                const header = document.createElement('header');
                header.classList.add('info-header');
                header.textContent = track.title;
                trackElement.appendChild(header);

                const body = document.createElement('div');
                body.classList.add('info-body');
                body.innerHTML = `
                    <p>${track.artist.name}</p>
                    <img src="${track.album.cover_big}" alt="Cover Art">
                    <p>${track.genre.name}</p>
                    <p>${track.release_date}</p>
                    <p>${track.album.title}</p>
                `;
                trackElement.appendChild(body);

                infoBody.appendChild(trackElement);
            });
        })
        .catch(error => {
            console.error('Error fetching tracks:', error);
        });
});
