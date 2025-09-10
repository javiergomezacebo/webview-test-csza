// The API endpoint
const apiUrl = 'https://table-mountain-proxy.javier-04d.workers.dev/';

// Helper function to format HH:MM:SS into HH:MM
const formatTime = (timeString) => {
    return timeString.substring(0, 5);
};

// Helper function to convert HH:MM:SS into total minutes
const getMinutes = (timeString) => {
    const parts = timeString.split(':');
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

        const statusElement = document.getElementById('status');

        // 1. Update the status text and color
        statusElement.textContent = data.status;
        statusElement.classList.remove('status-open', 'status-closed');
        if (data.status.toLowerCase() === 'open') {
            statusElement.classList.add('status-open');
        } else if (data.status.toLowerCase() === 'closed') {
            statusElement.classList.add('status-closed');
        }

        // 2. Update all other data points
        document.getElementById('temperature').textContent = data.temperature;
        document.getElementById('visibility').textContent = data.visibility;
        document.getElementById('wind').textContent = data.wind;


        document.getElementById('firstUp').textContent = formatTime(data.firstUp);
        // The line for 'lastUp' has been removed
        document.getElementById('lastDown').textContent = formatTime(data.lastDown);

        document.getElementById('waitingBottom').textContent = getMinutes(data.waitingTimeBottom);
        document.getElementById('waitingTop').textContent = getMinutes(data.waitingTimeTop);

    } catch (error) {
        console.error("Failed to fetch data:", error);
        const statusElement = document.getElementById('status');
        statusElement.textContent = "Error";
        statusElement.classList.remove('status-open', 'status-closed');
        statusElement.style.backgroundColor = '#6c757d';
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateStatus();
    setInterval(updateStatus, 300000);
});
