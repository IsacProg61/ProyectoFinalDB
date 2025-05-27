import React, { useState } from 'react';
import './AgregarKnowledge.css';

export default function ActualizarKnowledge() {
  const [form, setForm] = useState({ cliente: '', servicio: '', fecha_salida: '', solucion: '' });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');
    try {
      const response = await fetch('http://localhost:5000/actualizarKnowledge', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setMensaje(data.message || 'Knowledge actualizado exitosamente.');
        setForm({ cliente: '', servicio: '', fecha_salida: '', solucion: '' });
      } else {
        setMensaje(data.error || 'Error al actualizar el knowledge.');
      }
    } catch (error) {
      setMensaje('Error de conexión.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="kb-form-container">
      <h2>Actualizar Knowledge</h2>
      <form className="kb-form" onSubmit={handleSubmit}>
        <label>
          Cliente:
          <input className="kb-input" name="cliente" value={form.cliente} onChange={handleChange} required />
        </label>
        <label>
          Servicio:
          <input className="kb-input" name="servicio" value={form.servicio} onChange={handleChange} required />
        </label>
        <label>
          Fecha Salida:
          <input
            className="kb-input"
            type="date"
            name="fecha_salida"
            value={form.fecha_salida}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Solución:
          <textarea className="kb-input" name="solucion" rows={3} value={form.solucion} onChange={handleChange} required />
        </label>
        <button type="submit" className="kb-btn" style={{ marginTop: 16 }} disabled={cargando}>
          {cargando ? 'Actualizando...' : 'Actualizar'}
        </button>
        {mensaje && (
          <div style={{ color: '#2b7cff', marginTop: 12, textAlign: 'center' }}>{mensaje}</div>
        )}
      </form>
    </div>
  );
}
