<?php
$downloadCountsFile = 'download_counts.txt';

function getDownloadCount($fileName) {
    global $downloadCountsFile;
    
    $downloadCounts = json_decode(file_get_contents($downloadCountsFile), true);
    return isset($downloadCounts[$fileName]) ? $downloadCounts[$fileName] : 0;
}

function incrementDownloadCount($fileName) {
    global $downloadCountsFile;
    
    $downloadCounts = json_decode(file_get_contents($downloadCountsFile), true);
    $downloadCounts[$fileName] = isset($downloadCounts[$fileName]) ? $downloadCounts[$fileName] + 1 : 1;
    
    file_put_contents($downloadCountsFile, json_encode($downloadCounts));
}

if (isset($_GET['file'])) {
    $fileName = $_GET['file'];
    incrementDownloadCount($fileName);
    header('Location: ./Downloads/' . $fileName);
} else {
    // Provide an error message if 'file' parameter is not provided
    echo 'Error: File parameter is missing.';
}
?>
