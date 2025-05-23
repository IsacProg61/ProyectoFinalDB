import React from 'react';
import './KnowledgeBase.css';

export default function KnowledgeBase() {
  return (
    <div className="kb-container">
      <aside className="kb-sidebar">
        <nav className="kb-nav">
          <button className="kb-btn">Agregar</button>
          <button className="kb-btn">Borrar</button>
          <button className="kb-btn">Actualizar</button>
        </nav>
      </aside>

      <main className="kb-main">
        <img src="./images/logoColorRECSIN.png" alt="Descripción"/>
      </main>
    </div>
  );
}