<?php
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/models/User.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
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

    $user = new User();

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $result = $user->getAllUsers();
            echo json_encode($result);
            break;
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            if ($user->usernameExists($data->username)) {
                echo json_encode(["status" => false, "message" => "El nombre de usuario ya está en uso"]);
                break;
            }
            if ($user->emailExists($data->email)) {
                echo json_encode(["status" => false, "message" => "El correo electrónico ya está en uso"]);
                break;
            }
            $result = $user->register($data->username, $data->nombre, $data->apellido, $data->email, $data->password);
            echo json_encode(["status" => $result]);
            break;
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            if ($user->usernameExists($data->username, $data->id)) {
                echo json_encode(["status" => false, "message" => "El nombre de usuario ya está en uso"]);
                break;
            }
            if ($user->emailExists($data->email, $data->id)) {
                echo json_encode(["status" => false, "message" => "El correo electrónico ya está en uso"]);
                break;
            }
            $result = $user->updateUser($data->id, $data->username, $data->nombre, $data->apellido, $data->email, $data->password);
            echo json_encode(["status" => $result]);
            break;
        case 'DELETE':
            $data = json_decode(file_get_contents("php://input"));
            $result = $user->deleteUser($data->id);
            echo json_encode(["status" => $result]);
            break;
        default:
            http_response_code(405);
            echo json_encode(["message" => "Invalid request method", "status" => false]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Server error: " . $e->getMessage(), "status" => false]);
}
?>