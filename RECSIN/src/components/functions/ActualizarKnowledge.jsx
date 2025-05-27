import React, { useState } from 'react';
import './AgregarKnowledge.css';

export default function ActualizarKnowledge() {
  const [form, setForm] = useState({ id_cliente: '', fecha_salida: '', id_servicio: '', solucion: '' });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMensaje('¡Knowledge actualizado correctamente!');
    setForm({ id_cliente: '', fecha_salida: '', id_servicio: '', solucion: '' });
    setTimeout(() => setMensaje(''), 2000);
  };

  return (
    <div className="kb-form-container">
      <h2>Actualizar Knowledge</h2>
      <form className="kb-form" onSubmit={handleSubmit}>
        <label>ID Cliente:<input className="kb-input" name="id_cliente" value={form.id_cliente} onChange={handleChange} required /></label>
        <label>ID Servicio:<input className="kb-input" name="id_servicio" value={form.id_servicio} onChange={handleChange} required /></label>
        <label>Fecha Salida:<input className="kb-input" type="date" name="fecha_salida" value={form.fecha_salida} onChange={handleChange} required /></label>
        <label>Solución:<textarea className="kb-input" name="solucion" rows={3} value={form.solucion} onChange={handleChange} required /></label>
        <button type="submit" className="kb-btn" style={{ marginTop: 16 }}>Actualizar</button>
        {mensaje && <div style={{ color: '#2b7cff', marginTop: 12, textAlign: 'center' }}>{mensaje}</div>}
      </form>
    </div>
  );
}
