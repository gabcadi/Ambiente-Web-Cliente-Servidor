import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      setLoading(false);
    }
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="hero-section text-center py-5">
        <div className="container">
          {auth ? <h1 className="mt-4 display-4">Hola, <label className='font-weight-bold'>{auth.nombre}</label></h1> : <h1 className="mt-4">Hola</h1>}
          <h1 className="display-4">¿Qué esperas para aprender a programar, ya?</h1>
          <p className="lead">"Aprender a programar es abrir la puerta a un mundo de posibilidades infinitas. Cada línea de código es un paso hacia la creación de algo extraordinario."</p>
          <a href="/Cursos" className="btn btn-primary btn-lg">
            Comienza ya
          </a>
        </div>
      </main>

      <section className="benefits-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Beneficios de Aprender a Programar</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Alta Demanda Laboral</h5>
                  <p className="card-text">Los programadores son muy solicitados en el mercado laboral actual, lo que te brinda excelentes oportunidades de empleo.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Salarios Competitivos</h5>
                  <p className="card-text">Los trabajos en programación suelen ofrecer salarios atractivos y beneficios adicionales.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Flexibilidad y Creatividad</h5>
                  <p className="card-text">La programación te permite trabajar de manera flexible y ser creativo en la solución de problemas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}