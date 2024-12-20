<?php
require_once 'database.php';

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Create a new database connection
    $database = new Database();
    $conn = $database->getConnection();

    // Check if the connection is successful
    if ($conn) {
        echo "Database connection successful.<br>";

        // Perform a SELECT * FROM Usuario query
        $query = "SELECT * FROM Usuario";
        $stmt = $conn->prepare($query);
        $stmt->execute();

        // Fetch all results
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Display the results
        echo "<pre>";
        print_r($results);
        echo "</pre>";
    } else {
        echo "Database connection failed.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>