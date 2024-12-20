import React, { useState } from 'react';
import { Container, Card, Form, Button, Image } from 'react-bootstrap';
import logo from '../assets/Logo.png';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost/ByteAcademy/backend/auth/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card style={{ width: '400px' }} className="shadow">
                    <Card.Body className="border border-primary">
                        <Image src={logo} alt="logo" className="img-fluid d-block mx-auto" style={{ width: '300px' }} />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Nombre de Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu nombre de usuario"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <div className="d-grid">
                                <Button type="submit" variant="warning">
                                    Entrar
                                </Button>
                            </div>
                        </Form>
                        {message && <p className="mt-3 text-center">{message}</p>}
                        <p className="mt-3 text-center">
                            ¿No tienes una cuenta? <a href="/Registro">Regístrate</a>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}