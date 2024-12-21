import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/LogoBlanco.png';

export default function Navbar() {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(null);
        navigate('/Login');
    };

    return (
        <>
            <header className="main-header">
                <nav>
                    <Link className="navbar-brand" to="/Home">
                        <img src={logo} alt="logo" style={{ width: '150px' }} />
                    </Link>
                    <ul className="nav-links d-flex align-items-center">
                        <li>
                            <Link to="/SobreNosotros">Sobre nosotros</Link>
                        </li>
                        <li>
                            <Link to="/Cursos">Cursos</Link>
                        </li>
                        <li>
                            <Link to="/PlanEstudios">Planes de estudio</Link>
                        </li>
                        <li>
                            <Link to="/Contactar">Contáctenos</Link>
                        </li>
                        <li>
                            <Button onClick={handleLogout} variant="danger">Cerrar sesión</Button>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}