import React from 'react';
import logo from '../assets/LogoBlanco.png';

export default function Navbar() {
	return (
		<>
			<header className="main-header">
				<nav>
					<a className="navbar-brand" href="/Home">
						<img src={logo} alt="logo" style={{ width: '150px' }} />
					</a>
					<ul className="nav-links">
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
					</ul>
				</nav>
			</header>
		</>
	);
}
