<?php
require_once '../config/database.php';
require_once '../models/User.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"));

        if (!$data) {
            throw new Exception("Invalid input");
        }

        $username = $data->username;
        $nombre = $data->nombre;
        $apellido = $data->apellido;
        $email = $data->email;
        $password = $data->password;

        $user = new User();
        $result = $user->register($username, $nombre, $apellido, $email, $password);

        if ($result) {
            http_response_code(201);
            echo json_encode(["message" => "User registered successfully", "status" => true]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "User registration failed", "status" => false]);
        }
    } else {
        http_response_code(405);
        echo json_encode(["message" => "Invalid request method", "status" => false]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Server error: " . $e->getMessage(), "status" => false]);
}
?>