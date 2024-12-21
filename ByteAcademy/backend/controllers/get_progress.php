<?php
require_once '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id;
$course_id = $data->course_id;

$database = new Database();
$conn = $database->getConnection();

$query = "SELECT Codigo FROM ProgresoUsuario WHERE IdUsuario = :IdUsuario AND IdCurso = :IdCurso";
$stmt = $conn->prepare($query);
$stmt->bindParam(':IdUsuario', $user_id);
$stmt->bindParam(':IdCurso', $course_id);
$stmt->execute();

$progress = $stmt->fetch(PDO::FETCH_ASSOC);

if ($progress) {
    echo json_encode(["codigo" => $progress['Codigo']]);
} else {
    echo json_encode(["codigo" => ""]);
}
?>