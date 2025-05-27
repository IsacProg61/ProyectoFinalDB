import React, { useState } from 'react';
import './AgregarKnowledge.css';

export default function BorrarKnowledge() {
  const [form, setForm] = useState({ cliente: '', servicio: '' });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');
    try {
      const response = await fetch('http://localhost:5000/borrarKnowledge', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setMensaje(data.message || 'Knowledge borrado exitosamente.');
        setForm({ cliente: '', servicio: '' });
      } else {
        setMensaje(data.error || 'Error al borrar el knowledge.');
      }
    } catch (error) {
      setMensaje('Error de conexión.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="kb-form-container">
      <h2>Borrar Knowledge</h2>
      <form className="kb-form" onSubmit={handleSubmit}>
        <label>
          Cliente:
          <input className="kb-input" name="cliente" value={form.cliente} onChange={handleChange} required />
        </label>
        <label>
          Servicio:
          <input className="kb-input" name="servicio" value={form.servicio} onChange={handleChange} required />
        </label>
        <button type="submit" className="kb-btn" style={{ marginTop: 16 }} disabled={cargando}>
          {cargando ? 'Borrando...' : 'Borrar'}
        </button>
        {mensaje && (
          <div style={{ color: '#e63946', marginTop: 12, textAlign: 'center' }}>{mensaje}</div>
        )}
      </form>
    </div>
  );
}
