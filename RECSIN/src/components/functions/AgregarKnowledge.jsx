import React, { useState } from 'react';
import './AgregarKnowledge.css';

export default function AgregarRegistro() {
  const [form, setForm] = useState({ cliente: '', servicio: '', fecha_salida: '', solucion: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setMensaje('¡Registro agregado correctamente!');
    setForm({ cliente: '', servicio: '', fecha_salida: '', solucion: '' });
    setTimeout(() => setMensaje(''), 2000);
  };

  return (
    <div className="kb-form-container">
      <h2>Agregar Registro</h2>
      <form className="kb-form" onSubmit={handleSubmit}>
        <label>Cliente:<input className="kb-input" name="cliente" value={form.cliente} onChange={handleChange} required /></label>
        <label>Servicio:<input className="kb-input" name="servicio" value={form.servicio} onChange={handleChange} required /></label>
        <label>Fecha Salida:<input className="kb-input" type="date" name="fecha_salida" value={form.fecha_salida} onChange={handleChange} required /></label>
        <label>Solución:<textarea className="kb-input" name="solucion" rows={3} value={form.solucion} onChange={handleChange} required /></label>
        <button type="submit" className="kb-btn" style={{ marginTop: 16 }}>Agregar</button>
        {mensaje && <div style={{ color: '#2b7cff', marginTop: 12, textAlign: 'center' }}>{mensaje}</div>}
      </form>
    </div>
  );
}
