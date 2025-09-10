// The API endpoint
const apiUrl = 'https://table-mountain-proxy.javier-04d.workers.dev/'; // <<< Ensure this is your proxy URL!

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

        const statusElement = document.getElementById('status');

        // 1. Update the status text
        statusElement.textContent = data.status;

        // 2. Dynamically apply the button color
        // Remove previous status classes first
        statusElement.classList.remove('status-open', 'status-closed');
        if (data.status.toLowerCase() === 'open') {
            statusElement.classList.add('status-open');
        } else if (data.status.toLowerCase() === 'closed') {
            statusElement.classList.add('status-closed');
        }
        // Add a default if there are other status types not explicitly handled

        // Update the HTML elements with the new data
        document.getElementById('temperature').textContent = data.temperature;
        document.getElementById('visibility').textContent = data.visibility;
        document.getElementById('wind').textContent = data.wind;

        // These lines will execute, but the elements they target are hidden by CSS.
        // If you later change your mind and make them visible, they'll be populated.
        document.getElementById('firstUp').textContent = formatTime(data.firstUp);
        document.getElementById('lastUp').textContent = formatTime(data.lastUp);
        document.getElementById('lastDown').textContent = formatTime(data.lastDown);

        document.getElementById('waitingBottom').textContent = getMinutes(data.waitingTimeBottom);
        document.getElementById('waitingTop').textContent = getMinutes(data.waitingTimeTop);

    } catch (error) {
        console.error("Failed to fetch data:", error);
        const statusElement = document.getElementById('status');
        statusElement.textContent = "Error";
        statusElement.classList.remove('status-open', 'status-closed'); // Clear colors on error
        statusElement.style.backgroundColor = '#6c757d'; // Grey for error state
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateStatus();
    // Refresh the data every 5 minutes (300,000 milliseconds)
    setInterval(updateStatus, 300000);
});
