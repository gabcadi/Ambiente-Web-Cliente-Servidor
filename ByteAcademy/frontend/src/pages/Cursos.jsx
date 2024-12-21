import React, { useState, useEffect, useRef, useContext } from "react";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

export default function Cursos() {
  const { auth } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState('');
  const iframeRef = useRef(null);

  useEffect(() => {
    fetch('/api/controllers/get_courses.php')
      .then(response => response.json())
      .then(data => setCourses(data));
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
    loadProgress(course.IdCurso);
  };

  const handleRunCode = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = code;
    }
  };

  const handleSaveProgress = () => {
    const user_id = auth.user_id; // Get user_id from context
    const course_id = selectedCourse.IdCurso;

    fetch('/api/controllers/save_progress.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, course_id, codigo: code }),
    })
      .then(response => response.json())
      .then(data => {
        toast.success("Progreso guardado correctamente");
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error("Error al guardar el progreso");
      });
  };

  const handleClearCode = () => {
    setCode('');
  };

  const loadProgress = (course_id) => {
    const user_id = auth.user_id; // Get user_id from context

    fetch('/api/controllers/get_progress.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, course_id }),
    })
      .then(response => response.json())
      .then(data => setCode(data.codigo));
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row>
          {courses.map(course => (
            <Col key={course.IdCurso} md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{course.Titulo}</Card.Title>
                  <Card.Text>{course.Descripcion}</Card.Text>
                  <Button variant="primary" onClick={() => handleCourseClick(course)}>Comenzar curso</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedCourse?.Titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedCourse?.Contenido}</p>
          <Form.Group className="mb-3">
            <Form.Label>Editor de código:</Form.Label>
            <CodeEditor
              value={code}
              language="html"
              placeholder="Please enter your HTML code."
              onChange={(evn) => setCode(evn.target.value)}
              padding={15}
              style={{
                fontSize: 18,
                fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
              }}
            />
          </Form.Group>
          <Button variant="success" onClick={handleRunCode}>Run</Button>
          <Button variant="primary" onClick={handleSaveProgress} className="ms-2">Guardar Progreso</Button>
          <Button variant="danger" onClick={handleClearCode} className="ms-2">🗑️</Button>
          <div className="mt-3">
            <iframe
              ref={iframeRef}
              title="Output"
              style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}
            />
          </div>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
}