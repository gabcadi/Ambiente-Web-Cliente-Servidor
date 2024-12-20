import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/LogoBlanco.png';

export default function Navbar() {

    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(null);
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'nombre=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        navigate('/login');
    };

	return (
		<>
			<header className="main-header">
				<nav>
					<a className="navbar-brand" href="/Home">
						<img src={logo} alt="logo" style={{ width: '150px' }} />
					</a>
					<ul className="nav-links d-flex align-items-center">
						<li>
							<a href="/SobreNosotros">Sobre nosotros</a>
						</li>
						<li>
							<a href="/Cursos">Cursos</a>
						</li>
						<li>
							<a href="/PlanEstudios">Planes de estudio</a>
						</li>
						<li>
							<a href="/Contactar">Contáctenos</a>
						</li>
						<li>
							<Button onClick={handleLogout} variant="warning">Cerrar sesión</Button>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}
