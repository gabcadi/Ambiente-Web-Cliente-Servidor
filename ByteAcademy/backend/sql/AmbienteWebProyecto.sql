create database AmbienteWeb;

use AmbienteWeb;

-- Tabla Usuario
CREATE TABLE Usuario (
    IdUsuario INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    Contraseña VARCHAR(255) NOT NULL,
    FechaRegistro DATE NOT NULL
);

-- Tabla Logro
CREATE TABLE Logro (
    IdLogro INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    PuntosRequeridos INT NOT NULL
);

-- Tabla Proyecto
CREATE TABLE Proyecto (
    IdProyecto INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    Nivel VARCHAR(50) NOT NULL
);

-- Tabla Curso
CREATE TABLE Curso (
    IdCurso INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(100) NOT NULL,
    Nivel VARCHAR(50) NOT NULL,
    Descripcion TEXT,
    Contenido TEXT NOT NULL
);

-- Tabla ProgresoUsuario
CREATE TABLE ProgresoUsuario (
    IdProgresoUsuario INT AUTO_INCREMENT PRIMARY KEY,
    IdUsuario INT NOT NULL,
    IdCurso INT NOT NULL,
    Codigo TEXT,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
    FOREIGN KEY (IdCurso) REFERENCES Curso(IdCurso)
);


-- Tabla Modulo
CREATE TABLE Modulo (
    IdModulo INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(100) NOT NULL,
    Orden INT NOT NULL,
    IdCurso INT NOT NULL,
    FOREIGN KEY (IdCurso) REFERENCES Curso(IdCurso) ON DELETE CASCADE
);

-- Tabla Leccion
CREATE TABLE Leccion (
    IdLeccion INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(100) NOT NULL,
    Contenido TEXT,
    IdModulo INT NOT NULL,
    FOREIGN KEY (IdModulo) REFERENCES Modulo(IdModulo) ON DELETE CASCADE
);

-- Tabla Evaluacion
CREATE TABLE Evaluacion (
    IdEvaluacion INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion TEXT NOT NULL,
    Tipo VARCHAR(50) NOT NULL,
    PuntajeMaximo INT NOT NULL,
    IdLeccion INT NOT NULL,
    FOREIGN KEY (IdLeccion) REFERENCES Leccion(IdLeccion) ON DELETE CASCADE
);

-- Tabla Certificacion
CREATE TABLE Certificacion (
    IdCertificacion INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(100) NOT NULL,
    Requisitos TEXT
);

-- Tabla Entrega
CREATE TABLE Entrega (
    IdEntrega INT AUTO_INCREMENT PRIMARY KEY,
    IdCertificacion INT NOT NULL,
    FOREIGN KEY (IdCertificacion) REFERENCES Certificacion(IdCertificacion) ON DELETE CASCADE
);
