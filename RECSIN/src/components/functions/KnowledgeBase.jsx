import React, { useState } from 'react';
import './KnowledgeBase.css';
import { useNavigate } from 'react-router-dom';
import BorrarRegistro from './BorrarKnowledge';
import ActualizarKnowledge from './ActualizarKnowledge';
import AgregarKnowledge from './AgregarKnowledge';
import VerKnowledge from './VerKnowledge';

export default function KnowledgeBase() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState('ver'); // Mostrar VER por defecto

  return (
    <div className="kb-container">
      <aside className="kb-sidebar">
        <nav className="kb-nav">
          <button className="kb-btn" onClick={() => setFormType('ver')}>Ver</button>
          <button className="kb-btn" onClick={() => setFormType('agregar')}>Agregar</button>
          <button className="kb-btn" onClick={() => setFormType('borrar')}>Borrar</button>
          <button className="kb-btn" onClick={() => setFormType('actualizar')}>Actualizar</button>
          <button className="kb-btn kb-btn-menu" onClick={() => navigate('/')}>Volver al Menú Principal</button>
        </nav>
      </aside>
      <main className="kb-main">
        {formType === 'ver' && <VerKnowledge />}
        {formType === 'agregar' && <AgregarKnowledge />}
        {formType === 'borrar' && <BorrarRegistro />}
        {formType === 'actualizar' && <ActualizarKnowledge />}
      </main>
    </div>
  );
}