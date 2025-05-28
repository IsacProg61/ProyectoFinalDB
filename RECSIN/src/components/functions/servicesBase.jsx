import React, { useState } from 'react';
import './KnowledgeBase.css';
import { useNavigate } from 'react-router-dom';
import VerService from './VerService';
import AgregarServicio from './Agregar_Servicio';
import ActualizarService from './ActualizarService';
import BorrarService from './BorrarService';

export default function Servicios() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState('servicesbase');

  return (
    <div className="kb-container">
      <aside className="kb-sidebar">
        <div className="kb-title">Servicios</div>
        <nav className="kb-nav">
          <button className="kb-btn" onClick={() => setMenu('servicesbase')}>ServicesBase</button>
          <button className="kb-btn" onClick={() => setMenu('ver')}>Ver</button>
          <button className="kb-btn" onClick={() => setMenu('agregar')}>Agregar</button>
          <button className="kb-btn" onClick={() => setMenu('actualizar')}>Actualizar</button>
          <button className="kb-btn" onClick={() => setMenu('eliminar')}>Eliminar</button>
          <button className="kb-btn kb-btn-menu" onClick={() => navigate('/')}>Volver al Menú Principal</button>
        </nav>
      </aside>
      <main className="kb-main">
        {menu === 'servicesbase' && (
          <div>
            <h2>Bienvenido a la gestión de servicios</h2>
            <p>Selecciona una opción del menú para comenzar.</p>
          </div>
        )}
        {menu === 'ver' && <VerService />}
        {menu === 'agregar' && <AgregarServicio />}
        {menu === 'actualizar' && <ActualizarService />}
        {menu === 'eliminar' && <BorrarService />}
      </main>
    </div>
  );
}