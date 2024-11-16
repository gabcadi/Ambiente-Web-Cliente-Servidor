import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="hero-section">
				<h1>Aprende a programar</h1>
				<p>Vivamus tempor dignissim erat.</p>
				<a href="/Cursos" className="cta-btn">
					Comienza ya
				</a>
			</main>
			<Footer />
		</>
	);
}
