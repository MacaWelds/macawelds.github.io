// download_counter.js

// Initialize an object to store download counts
var downloadCounts = {};

// Function to get download count for a file
function getDownloadCount(fileName) {
    return downloadCounts[fileName] || 0;
}

// Function to increment download count for a file
function incrementDownloadCount(fileName) {
    downloadCounts[fileName] = (downloadCounts[fileName] || 0) + 1;
}

// Function to update download counter in HTML
function updateDownloadCounter(fileName, countElementId) {
    var counterElement = document.getElementById(countElementId);

    if (counterElement) {
        counterElement.textContent = '(' + getDownloadCount(fileName) + ' downloads)';
    }
}

// Function to fetch download counts from GitHub Releases
async function fetchDownloadCounts() {
    try {
        const response = await fetch('https://api.github.com/repos/MacaWelds/macawelds/releases');
        const releases = await response.json();

        releases.forEach(release => {
            release.assets.forEach(asset => {
                const fileName = asset.name;
                const countElementId = `downloadCount${fileName.replace(/\s+/g, '')}`;
                const count = asset.download_count || 0;

                incrementDownloadCount(fileName);
                updateDownloadCounter(fileName, countElementId);
            });
        });
    } catch (error) {
        console.error('Error fetching download counts:',
            error);
    }
}

// Fetch download counts when the page loads
fetchDownloadCounts();