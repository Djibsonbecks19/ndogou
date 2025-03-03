<?php
// add_participations.php
include 'database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form data
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $montant = $_POST['montant'];

    // Prepare SQL query to insert data safely using a prepared statement
    $stmt = $conn->prepare("INSERT INTO cotisations (nom, prenom, montant) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $nom, $prenom, $montant);  // 'ssd' for string, string, and double

    if ($stmt->execute()) {
        // If insertion is successful
        $response = ["message" => "Cotisation ajoutée avec succès!"];
    } else {
        // If there is an error in executing the query
        $response = ["message" => "Erreur: " . $stmt->error];
    }

    // Return the response as JSON
    echo json_encode($response);

    // Close the prepared statement
    $stmt->close();
}
?>
