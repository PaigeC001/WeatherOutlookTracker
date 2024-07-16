// currentDate.js

// Function to get the current date
function getCurrentDate() {
    let currentDate = new Date();
    
    // Formatting the date
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = currentDate.toLocaleDateString('en-US', options);
    
    return formattedDate;
}

// Function to update the HTML element with id="current-date"
function updateCurrentDate() {
    let currentDate = getCurrentDate();
    document.getElementById('current-date').textContent = currentDate;
}

// Call updateCurrentDate function when the page loads
window.onload = function() {
    updateCurrentDate();
};
