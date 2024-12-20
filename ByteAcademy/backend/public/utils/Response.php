<?php
class Response {
    public static function send($status_code, $message, $data = []) {
        http_response_code($status_code);
        header('Content-Type: application/json');
        echo json_encode(array_merge(["message" => $message], $data));
    }
}
?>