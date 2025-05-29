import React, { useState } from 'react';
import './Servicios.css';
import { useNavigate } from 'react-router-dom';
import VerService from './VerService';
import AgregarServicio from './AgregarService';
import ActualizarService from './ActualizarService';
import BorrarService from './BorrarService';

export default function Servicios() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState('servicesbase');

  return (
    <div className="services-container">
      <aside className="services-sidebar">
        <div className="services-title">Servicios</div>
        <nav className="services-nav">
          <button className="services-btn" onClick={() => setMenu('servicesbase')}>ServicesBase</button>
          <button className="services-btn" onClick={() => setMenu('ver')}>Ver</button>
          <button className="services-btn" onClick={() => setMenu('agregar')}>Agregar</button>
          <button className="services-btn" onClick={() => setMenu('actualizar')}>Actualizar</button>
          <button className="services-btn" onClick={() => setMenu('eliminar')}>Eliminar</button>
          <button className="services-btn-menu" onClick={() => navigate('/')}> Volver al Menú Principal </button>
        </nav>

      </aside>
      <main className="services-main">
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