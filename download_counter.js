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

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
        }

        const releases = await response.json();

        if (!Array.isArray(releases)) {
            throw new Error('GitHub API response does not contain an array of releases.');
        }

        releases.forEach(release => {
            console.log('Release:', release.tag_name); // Log the tag name for each release

            release.assets.forEach(asset => {
                const fileName = asset.name;
                const countElementId = 'downloadCount' + fileName.replace(/\s+/g, '');
                const count = asset.download_count || 0;

                incrementDownloadCount(fileName);
                updateDownloadCounter(fileName, countElementId);
            });
        });
    } catch (error) {
        console.error('Error fetching download counts:', error);
    }
}

// Fetch download counts when the page loads
fetchDownloadCounts();