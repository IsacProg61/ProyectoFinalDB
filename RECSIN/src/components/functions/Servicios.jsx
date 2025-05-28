import React, { useState } from 'react';
import './ServicesForm.css';
import VerService from './VerService';
import AgregarServicio from './AgregarService';
import ActualizarService from './ActualizarService';
import BorrarService from './BorrarService';

export default function Servicios() {
  const [menu, setMenu] = useState('servicesbase');

  return (
    <div className="service-form-container">
      <aside className="service-side-bar">
        <button className="service-back-button" onClick={() => setMenu('servicesbase')}>
          ServicesBase
        </button>
        <button className="service-back-button" onClick={() => setMenu('ver')}>
          Ver
        </button>
        <button className="service-back-button" onClick={() => setMenu('agregar')}>
          Agregar
        </button>
        <button className="service-back-button" onClick={() => setMenu('actualizar')}>
          Actualizar
        </button>
        <button className="service-back-button" onClick={() => setMenu('eliminar')}>
          Eliminar
        </button>
        <button className="service-back-button" onClick={() => window.location.href = '/'} >
          Volver al Menú Principal
        </button>
      </aside>
      <div className="service-form-wrapper">
        {menu === 'servicesbase' && (
          <>
            <h2 style={{color:'#2a9d8f'}}>Bienvenido a la gestión de servicios</h2>
            <p>Selecciona una opción del menú para comenzar.</p>
          </>
        )}
        {menu === 'ver' && <VerService />}
        {menu === 'agregar' && <AgregarServicio />}
        {menu === 'actualizar' && <ActualizarService />}
        {menu === 'eliminar' && <BorrarService />}
      </div>
    </div>
  );
}