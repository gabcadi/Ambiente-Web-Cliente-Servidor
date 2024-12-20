import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import logo from '../assets/Logo.png';

export default function Registro() {
    const [username, setUsername] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, nombre, apellido, email, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('data', data);

            if (data.status) {
                setMessage("User registered successfully");
            } else {
                if (data.message.includes("Username")) {
                    setMessage("Username is already taken");
                } else if (data.message.includes("Email")) {
                    setMessage("Email is already taken");
                } else {
                    setMessage("User registration failed");
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("An error occurred during registration");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="shadow" style={{ width: '400px' }}>
                <Card.Body className="border border-primary">
                    <img src={logo} className="img-fluid d-block mx-auto" alt="logo" style={{ width: '300px' }} />
                    <Form onSubmit={handleSubmit} className="mt-3">
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Ingresa tu nombre de usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                placeholder="Ingresa tu nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="apellido">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="apellido"
                                placeholder="Ingresa tu apellido"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Ingresa tu correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className="d-grid">
                            <Button type="submit" variant="warning">
                                Registrar
                            </Button>
                        </div>
                    </Form>
                    {message && <p className="mt-3 text-center">{message}</p>}
                    <p className="mt-3 text-center">
                        ¿Ya tienes una cuenta? <a href="/Login">Iniciar sesión</a>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
}