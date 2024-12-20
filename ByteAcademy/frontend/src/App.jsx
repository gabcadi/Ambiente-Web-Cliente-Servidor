import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

import "./App.css";

import Home from "./pages/Home";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SobreNosotros from "./pages/SobreNosotros";
import Cursos from "./pages/Cursos";
import Contactar from "./pages/Contactar";
import PlanEstudios from "./pages/PlanEstudios";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/SobreNosotros" element={<SobreNosotros />} />
          <Route path="/Cursos" element={<Cursos />} />
          <Route path="/Contactar" element={<Contactar />} />
          <Route path="/PlanEstudios" element={<PlanEstudios />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
