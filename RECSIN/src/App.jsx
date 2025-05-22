import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuCards from "./components/MenuCards";
import AgregarCliente from "./components/functions/Agregar_Cliente";
import AgregarServicio from "./components/functions/Agregar_Servicio";
import KnowledgeBase from "./components/functions/KnowledgeBase";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuCards />} />
        <Route path="/agregar-cliente" element={<AgregarCliente />} />
        <Route path="/agregar-servicio" element={<AgregarServicio />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
      </Routes>
    </Router>
  );
}

export default App;
