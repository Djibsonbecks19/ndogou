<?php
// database.php
$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "cotisations_db";

// Create connection
$conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set UTF-8 character encoding for better handling of special characters
mysqli_set_charset($conn, 'utf8');
?>
