<?php
require_once '../config/database.php';

class User {
    private $conn;
    private $table_name = "Usuario";

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function login($username, $password) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE Username = :username AND Contraseña = :password";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function register($username, $nombre, $apellido, $email, $password) {
        $query = "INSERT INTO " . $this->table_name . " (Username, Nombre, Apellido, Email, Contraseña, FechaRegistro) VALUES (:username, :nombre, :apellido, :email, :password, CURDATE())";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido', $apellido);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
?>