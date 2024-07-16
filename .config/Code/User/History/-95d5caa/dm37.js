function constructSearchUrl(artistName, genre, decade) {
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
    return searchUrl;
}

