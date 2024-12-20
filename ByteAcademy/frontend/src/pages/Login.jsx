import React, { useState, useContext } from 'react';
import { Container, Card, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/Logo.png';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('data', data);
            if (data.status) {
                setAuth({ username, nombre: data.Nombre });
                document.cookie = `username=${username}; path=/`;
                document.cookie = `nombre=${data.Nombre}; path=/`;
                navigate('/');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("An error occurred during login");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '400px' }} className="shadow">
                <Card.Body className="border border-primary">
                    <Image src={logo} alt="logo" className="img-fluid d-block mx-auto" style={{ width: '300px' }} />
                    <Form onSubmit={handleSubmit}>
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
                                Iniciar sesión
                            </Button>
                        </div>
                    </Form>
                    {message && <p className="mt-3 text-center">{message}</p>}
                </Card.Body>
            </Card>
        </Container>
    );
}