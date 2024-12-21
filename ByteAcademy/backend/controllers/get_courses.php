<?php
require_once '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$database = new Database();
$conn = $database->getConnection();

$query = "SELECT * FROM Curso";
$stmt = $conn->prepare($query);
$stmt->execute();

$courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($courses);
?>