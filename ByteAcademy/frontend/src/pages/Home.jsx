import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
	const { auth, setAuth } = useContext(AuthContext);

	console.log(auth);
	

	return (
		<>
			<Navbar />
			<main className="hero-section">
				<h1>Aprende a programar</h1>
				<p>Vivamus tempor dignissim erat.</p>
				<a href="/Cursos" className="cta-btn">
					Comienza ya
				</a>
				{auth ? <h1>Bienvenido {auth.Nombre}</h1> : <h1>Bienvenido</h1>}

			</main>
			<Footer />
		</>
	);
}
