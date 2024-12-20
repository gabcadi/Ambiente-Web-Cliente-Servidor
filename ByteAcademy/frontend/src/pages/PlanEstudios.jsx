import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function PlanEstudios() {
	const planes = [
		{
			id: 1,
			titulo: 'Desarrollo Web Completo',
			descripcion: 'Aprende a crear sitios web y aplicaciones dinámicas con HTML, CSS, JavaScript, y React.',
			duracion: '12 semanas',
			nivel: 'Principiante',
		},
		{
			id: 2,
			titulo: 'Ciencia de Datos',
			descripcion: 'Explora el análisis de datos, estadística y machine learning utilizando Python y herramientas avanzadas.',
			duracion: '16 semanas',
			nivel: 'Intermedio',
		},
		{
			id: 3,
			titulo: 'Desarrollo de Software',
			descripcion: 'Domina los principios de diseño de software, estructuras de datos, y algoritmos con Java.',
			duracion: '20 semanas',
			nivel: 'Avanzado',
		},
		{
			id: 4,
			titulo: 'Ciberseguridad',
			descripcion: 'Entiende las bases de la seguridad informática y aprende cómo proteger sistemas y redes.',
			duracion: '10 semanas',
			nivel: 'Intermedio',
		},
        {
            id: 5,
            titulo: "Certificación en Ciencia de Datos",
            descripcion: "Valida tu experiencia en análisis de datos y machine learning con Python.",
            duracion: '18 semanas',
			nivel: 'Intermedio',
          },
          {
            id: 6,
            titulo: "Certificación en Seguridad Informática",
            descripcion: "Gana reconocimiento en la industria asegurando sistemas y redes con esta certificación.",
            duracion: '6 semanas',
			nivel: 'Intermedio',
          },
	];

	return (
		<>
			<Navbar />
			<Container className="my-5">
				<h1 className="text-center mb-4">Nuestros Planes de Estudio</h1>
				<p className="text-center">Explora nuestros programas diseñados para ayudarte a alcanzar tus metas profesionales en tecnología.</p>
				<Row className="gy-4">
					{planes.map((plan) => (
						<Col key={plan.id} md={6} lg={4}>
							<Card className="shadow-sm h-100">
								<Card.Body>
									<Card.Title>{plan.titulo}</Card.Title>
									<Card.Subtitle className="mb-2 text-muted">
										{plan.nivel} | {plan.duracion}
									</Card.Subtitle>
									<Card.Text>{plan.descripcion}</Card.Text>
									<Button variant="primary" className="w-100">
										Ver Detalles
									</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
			<Footer />
		</>
	);
}
