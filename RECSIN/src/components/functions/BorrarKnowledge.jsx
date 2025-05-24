import React, { useState } from 'react';
import './AgregarKnowledge.css';

export default function BorrarRegistro() {
  const [form, setForm] = useState({ cliente: '', servicio: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setMensaje('¡Registro borrado correctamente!');
    setForm({ cliente: '', servicio: '' });
    setTimeout(() => setMensaje(''), 2000);
  };

  return (
    <div className="kb-form-container">
      <h2>Borrar Registro</h2>
      <form className="kb-form" onSubmit={handleSubmit}>
        <label>Cliente:<input className="kb-input" name="cliente" value={form.cliente} onChange={handleChange} required /></label>
        <label>Servicio:<input className="kb-input" name="servicio" value={form.servicio} onChange={handleChange} required /></label>
        <button type="submit" className="kb-btn" style={{ marginTop: 16 }}>Borrar</button>
        {mensaje && <div style={{ color: '#e63946', marginTop: 12, textAlign: 'center' }}>{mensaje}</div>}
      </form>
    </div>
  );
}
