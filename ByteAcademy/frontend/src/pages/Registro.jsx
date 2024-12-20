import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import logo from '../assets/Logo.png';

export default function Registro() {
	return (
		<Container className="d-flex justify-content-center align-items-center vh-100">
			<Card className="shadow" style={{ width: '400px' }}>
				<Card.Body className="border border-primary">
					<img src={logo} className="img-fluid d-block mx-auto" alt="logo" style={{ width: '300px' }} />
					<Form action="procesar_registro.php" method="POST" className="mt-3">
						<Form.Group className="mb-3" controlId="username">
							<Form.Label>Nombre de Usuario</Form.Label>
							<Form.Control type="text" name="username" placeholder="Ingresa tu nombre de usuario" required />
						</Form.Group>
						<Form.Group className="mb-3" controlId="email">
							<Form.Label>Correo Electrónico</Form.Label>
							<Form.Control type="email" name="email" placeholder="Ingresa tu correo" required />
						</Form.Group>
						<Form.Group className="mb-3" controlId="password">
							<Form.Label>Contraseña</Form.Label>
							<Form.Control type="password" name="password" placeholder="Ingresa tu contraseña" required />
						</Form.Group>
						<div className="d-grid">
							<Button type="submit" variant="warning">
								Registrar
							</Button>
						</div>
					</Form>
					<p className="mt-3 text-center">
						¿Ya tienes una cuenta? <a href="login.html">Iniciar sesión</a>
					</p>
				</Card.Body>
			</Card>
		</Container>
	);
}
