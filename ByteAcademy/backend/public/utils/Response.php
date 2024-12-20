<?php
class Response {
    public static function send($status_code, $message, $data = []) {
        http_response_code($status_code);
        echo json_encode(array_merge(["message" => $message], $data));
    }
}
?>