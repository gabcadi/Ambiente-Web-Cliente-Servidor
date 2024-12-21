<?php
require_once __DIR__ . '/../config/database.php';

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

    public function getUserByUsername($username) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE Username = :username";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
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

    public function getAllUsers() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function updateUser($id, $username, $nombre, $apellido, $email, $password) {
        $query = "UPDATE " . $this->table_name . " SET Username = :username, Nombre = :nombre, Apellido = :apellido, Email = :email, Contraseña = :password WHERE IdUsuario = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
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

    public function deleteUser($id) {
        $query = "DELETE FROM " . $this->table_name . " WHERE IdUsuario = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function usernameExists($username, $id = null) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE Username = :username";
        if ($id) {
            $query .= " AND IdUsuario != :id";
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        if ($id) {
            $stmt->bindParam(':id', $id);
        }
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    public function emailExists($email, $id = null) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE Email = :email";
        if ($id) {
            $query .= " AND IdUsuario != :id";
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        if ($id) {
            $stmt->bindParam(':id', $id);
        }
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }
}
?>