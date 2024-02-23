// counter.js

const downloadCountsFile = 'download_counter.json';

function getDownloadCount() {
    // Read the download count from the JSON file
    const downloadCounts = JSON.parse(localStorage.getItem(downloadCountsFile)) || {};
    return downloadCounts.count || 0;
}

function incrementDownloadCount() {
    // Increment the download count and update the JSON file
    const downloadCounts = JSON.parse(localStorage.getItem(downloadCountsFile)) || {};
    downloadCounts.count = (downloadCounts.count || 0) + 1;
    localStorage.setItem(downloadCountsFile, JSON.stringify(downloadCounts));
}

document.getElementById('downloadButton').addEventListener('click', function() {
    // Increment the download count when the button is clicked
    incrementDownloadCount();

    // You can add additional logic to initiate the file download here
    // For example, redirect the user to the file download URL or trigger a download using JavaScript
});

