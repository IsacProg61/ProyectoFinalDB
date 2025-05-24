import React, { useState } from 'react';
import './KnowledgeBase.css';
import { useNavigate } from 'react-router-dom';
import AgregarRegistro from './AgregarRegistro';

export default function KnowledgeBase() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="kb-container">
      <aside className="kb-sidebar">
        <nav className="kb-nav">
          <button className="kb-btn" onClick={() => setShowForm(true)}>Agregar</button>
          <button className="kb-btn">Borrar</button>
          <button className="kb-btn">Actualizar</button>
          <button className="kb-btn kb-btn-menu" onClick={() => navigate('/')}>Volver al Menú Principal</button>

        </nav>
      </aside>
      <main className="kb-main">
        {showForm ? <AgregarRegistro /> : <img src="./images/logoColorRECSIN.png" alt="Logo RECSIN" style={{ maxWidth: '100%', height: 'auto' }} />}
      </main>
    </div>
  );
}