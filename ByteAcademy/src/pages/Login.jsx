import React from 'react';
import { Breadcrumb, Container, Card, Form, Button, Image } from 'react-bootstrap';
import logo from '../assets/Logo.png';

export default function Login() {
	return (
		<>
			<Container className="d-flex justify-content-center align-items-center vh-100">
				<Card style={{ width: '400px' }} className="shadow">
					<Card.Body className="border border-primary">
						<Image src={logo} alt="logo" className="img-fluid d-block mx-auto" style={{ width: '300px' }} />
						<Form action="procesar_login.php" method="POST">
							<Form.Group className="mb-3" controlId="username">
								<Form.Label>Nombre de Usuario</Form.Label>
								<Form.Control type="text" placeholder="Ingresa tu nombre de usuario" name="username" required />
							</Form.Group>
							<Form.Group className="mb-3" controlId="password">
								<Form.Label>Contraseña</Form.Label>
								<Form.Control type="password" placeholder="Ingresa tu contraseña" name="password" required />
							</Form.Group>
							<div className="d-grid">
								<Button type="submit" variant="warning">
									Entrar
								</Button>
							</div>
						</Form>
						<p className="mt-3 text-center">
							¿No tienes una cuenta? <a href="/Registro">Regístrate</a>
						</p>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
}
