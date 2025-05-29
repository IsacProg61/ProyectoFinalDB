import React, { useState } from 'react';
import './ClienteBase.css';
import All from './All';
import Agregar_Cliente from './Agregar_Cliente';
import ActualizarCliente from './ActualizarCliente';
import Borrar_Cliente from './Borrar_Cliente';

export default function ClienteBase() {
  const [formType, setFormType] = useState('all');

  return (
    <div className="cliente-container">
      <aside className="cliente-sidebar">
        <nav className="cliente-nav">
          <button className="cliente-btn" onClick={() => setFormType('all')}>Ver</button>
          <button className="cliente-btn" onClick={() => setFormType('agregar-cliente')}>Agregar</button>
          <button className="cliente-btn" onClick={() => setFormType('borrar-cliente')}>Borrar</button>
          <button className="cliente-btn" onClick={() => setFormType('actualizar-cliente')}>Actualizar</button>
          <button className="cliente-btn cliente-btn-menu" onClick={() => window.location.href = '/'}>Volver al Menú Principal</button>
        </nav>
      </aside>

      <main className="cliente-main-content">
        {formType === 'all' && <All />}
        {formType === 'agregar-cliente' && <Agregar_Cliente />}
        {formType === 'borrar-cliente' && <Borrar_Cliente />}
        {formType === 'actualizar-cliente' && <ActualizarCliente />}
      </main>
    </div>
  );
}
