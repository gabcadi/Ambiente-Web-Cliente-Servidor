import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({ id: '', username: '', nombre: '', apellido: '', email: '', password: '', confirmPassword: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users.php');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched users:', data); 
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setIsEditing(false);
    setFormData({ id: '', username: '', nombre: '', apellido: '', email: '', password: '', confirmPassword: '' });
    setErrorMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch('/api/users.php', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok || !data.status) {
        setErrorMessage(data.message || `Error ${isEditing ? 'updating' : 'adding'} user`);
        return;
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} user:`, error);
      setErrorMessage(`Error ${isEditing ? 'updating' : 'adding'} user`);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.IdUsuario,
      username: user.Username,
      nombre: user.Nombre,
      apellido: user.Apellido,
      email: user.Email,
      password: user.Contraseña,
      confirmPassword: user.Contraseña,
    });
    setIsEditing(true);
    handleShow();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/users.php', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userToDelete }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchUsers();
      setShowConfirm(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowConfirm(true);
  };

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <h1 className="text-center mb-4">Panel de Administrador</h1>
        <Button variant="primary" onClick={handleShow}>Añadir Usuario</Button>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.IdUsuario}>
                <td>{user.IdUsuario}</td>
                <td>{user.Username}</td>
                <td>{user.Nombre}</td>
                <td>{user.Apellido}</td>
                <td>{user.Email}</td>
                <td>
                  <Button variant="success" className="me-2" onClick={() => handleEdit(user)}>Editar</Button>
                  <Button variant="danger" onClick={() => confirmDelete(user.IdUsuario)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edita un usuario' : 'Añade un usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este usuario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}