import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SobreNosotros() {
	return (
		<>
			<Navbar />
			<Container className="my-5">
				<h1 className="text-center mb-4">Sobre Nosotros</h1>
				<Row className="text-center">
					<Col md={6} lg={4}>
						<Card className="mb-4">
							<Card.Img variant="top" src="/src/assets/pexels-nemuel-6424586.jpg" alt="Nuestro equipo" />
							<Card.Body>
								<Card.Title>Nuestro Equipo</Card.Title>
								<Card.Text>
									Somos un equipo dedicado a ofrecer soluciones innovadoras para todos nuestros clientes, con un enfoque en la
									calidad y la satisfacción.
								</Card.Text>
								<Button variant="primary">Conoce más</Button>
							</Card.Body>
						</Card>
					</Col>

					<Col md={6} lg={4}>
						<Card className="mb-4">
							<Card.Img variant="top" src="src\assets\pexels-markusspiske-1089438.jpg" alt="Nuestra misión" />
							<Card.Body>
								<Card.Title>Nuestra Misión</Card.Title>
								<Card.Text>
									Nuestra misión es proporcionar productos de alta calidad que mejoren la vida de nuestros clientes, siempre con un
									compromiso social.
								</Card.Text>
								<Button variant="primary">Leer más</Button>
							</Card.Body>
						</Card>
					</Col>

					<Col md={6} lg={4}>
						<Card className="mb-4">
							<Card.Img variant="top" src="src\assets\pexels-sabrina-gelbart-65954-249798.jpg" alt="Nuestra visión" />
							<Card.Body>
								<Card.Title>Nuestra Visión</Card.Title>
								<Card.Text>
									Queremos ser líderes en innovación y servicio, estableciendo relaciones duraderas con nuestros clientes y creando
									un impacto positivo en la sociedad.
								</Card.Text>
								<Button variant="primary">Descubre más</Button>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
      <Footer />
		</>
	);
}
