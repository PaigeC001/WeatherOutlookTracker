document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.querySelector('#saveButton');
    const songTitleInput = document.querySelector('#song-title');

    saveButton.addEventListener('click', () => {
        const songTitle = songTitleInput.value;
        if (songTitle) {
            const saveDate = new Date().toISOString().split('T')[0];
            console.log(`Song: ${songTitle} was saved on ${saveDate}`);
            // You can add more logic here to store this information for further use
        } else {
            console.log('Please enter a song title before saving.');
        }
    });
});