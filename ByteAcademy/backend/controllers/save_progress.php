<?php
require_once '../config/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id;
$course_id = $data->course_id;
$codigo = $data->codigo;

$database = new Database();
$conn = $database->getConnection();

$query = "INSERT INTO ProgresoUsuario (IdUsuario, IdCurso, Codigo) VALUES (:IdUsuario, :IdCurso, :Codigo)
          ON DUPLICATE KEY UPDATE Codigo = :Codigo";
$stmt = $conn->prepare($query);
$stmt->bindParam(':IdUsuario', $user_id);
$stmt->bindParam(':IdCurso', $course_id);
$stmt->bindParam(':Codigo', $codigo);

if ($stmt->execute()) {
    echo json_encode(["message" => "Progreso guardado correctamente"]);
} else {
    echo json_encode(["message" => "Falló al guardar el progreso"]);
}
?>