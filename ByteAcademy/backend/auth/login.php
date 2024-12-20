<?php
require_once '../config/database.php';
require_once '../models/User.php';
require_once '../utils/Response.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    $password = $data->password;

    $user = new User();
    $result = $user->login($username, $password);

    if ($result) {
        Response::send(200, "Login successful", ["status" => true]);
    } else {
        Response::send(401, "Invalid credentials", ["status" => false]);
    }
} else {
    Response::send(405, "Invalid request method", ["status" => false]);
}
?>