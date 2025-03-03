<?php
// get_participations.php
include 'database.php';

// Prepare query to fetch all cotisations
$query = "SELECT * FROM cotisations ORDER BY id DESC";  // Ordering by id (desc) for recent first
$result = mysqli_query($conn, $query);

if ($result) {
    // Fetch the data as an associative array
    $cotisations = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($cotisations);
} else {
    echo json_encode(["message" => "Erreur lors de la récupération des cotisations."]);
}

mysqli_free_result($result);
?>
