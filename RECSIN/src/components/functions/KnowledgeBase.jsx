import React, { useState } from 'react';
import './KnowledgeBase.css';
import { useNavigate } from 'react-router-dom';
import AgregarRegistro from './AgregarKnowledge';
import BorrarRegistro from './BorrarKnowledge';
import ActualizarKnowledge from './ActualizarKnowledge';

export default function KnowledgeBase() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState(null);

  return (
    <div className="kb-container">
      <aside className="kb-sidebar">
        <nav className="kb-nav">
          <button className="kb-btn" onClick={() => setFormType('agregar')}>Agregar</button>
          <button className="kb-btn" onClick={() => setFormType('borrar')}>Borrar</button>
          <button className="kb-btn" onClick={() => setFormType('actualizar')}>Actualizar</button>
          <button className="kb-btn kb-btn-menu" onClick={() => navigate('/')}>Volver al Menú Principal</button>
        </nav>
      </aside>
      <main className="kb-main">
        {formType === 'agregar' && <AgregarRegistro />}
        {formType === 'borrar' && <BorrarRegistro />}
        {formType === 'actualizar' && <ActualizarKnowledge />}
        {!formType && <img src="/RECSIN/src/components/functions/images/logoColorRECSIN.png" alt="Logo RECSIN" style={{ maxWidth: '100%', height: 'auto' }} />}
      </main>
    </div>
  );
}