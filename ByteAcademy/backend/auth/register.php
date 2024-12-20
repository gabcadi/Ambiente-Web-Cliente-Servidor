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
    $result = $user->register($username, $password);

    if ($result) {
        Response::send(201, "User registered successfully", ["status" => true]);
    } else {
        Response::send(400, "User registration failed", ["status" => false]);
    }
} else {
    Response::send(405, "Invalid request method", ["status" => false]);
}
?>