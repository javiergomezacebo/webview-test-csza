// The API endpoint
const apiUrl = 'https://api.tablemountain.net/v1/realtime-status?AttractionId=00000000-e169-4224-bb3c-1b88af3b1140';

// Helper function to format HH:MM:SS into HH:MM
const formatTime = (timeString) => {
    return timeString.substring(0, 5);
};

// Helper function to convert HH:MM:SS into total minutes
const getMinutes = (timeString) => {
    const parts = timeString.split(':'); // -> ["HH", "MM", "SS"]
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    return (hours * 60) + minutes;
};

// Main function to fetch, process, and display data
async function updateStatus() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Update the HTML elements with the new data
        document.getElementById('status').textContent = data.status;
        document.getElementById('temperature').textContent = data.temperature;
        document.getElementById('visibility').textContent = data.visibility;
        document.getElementById('wind').textContent = data.wind;

        document.getElementById('firstUp').textContent = formatTime(data.firstUp);
        document.getElementById('lastUp').textContent = formatTime(data.lastUp);
        document.getElementById('lastDown').textContent = formatTime(data.lastDown);

        document.getElementById('waitingBottom').textContent = getMinutes(data.waitingTimeBottom);
        document.getElementById('waitingTop').textContent = getMinutes(data.waitingTimeTop);

    } catch (error) {
        console.error("Failed to fetch data:", error);
        document.getElementById('status').textContent = "Error";
        // You could add more detailed error handling here
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateStatus();
    // Refresh the data every 5 minutes (300,000 milliseconds)
    setInterval(updateStatus, 300000);
});
