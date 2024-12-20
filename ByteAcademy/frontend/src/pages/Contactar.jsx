import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Contactar() {

  return (
    <>
    <Navbar />
    <Container className="my-5">
      <h1 className="text-center mb-4">Contáctenos</h1>

      <Form action="procesar_contactar.php" method="POST">
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Tu email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="mensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="mensaje"
            placeholder="Escribe tu mensaje"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
    <Footer />
    </>
  );
}
