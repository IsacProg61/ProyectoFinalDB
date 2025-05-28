import React, { useState } from 'react';
import './ServicesForm.css';

const BorrarService = () => {
  const [id, setId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const res = await fetch('http://localhost:5000/BorrarService', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_servicio: id })
      });
      const data = await res.json();
      setMensaje(data.message || 'Servicio eliminado correctamente');
    } catch (error) {
      setMensaje('Error al eliminar el servicio');
    }
    setCargando(false);
  };

  return (
    <div className="service-form-container">
      <div className="service-form-wrapper">
        <h2>Eliminar Servicio</h2>
        <form className="service-form" onSubmit={handleSubmit}>
          <label htmlFor="id_servicio">ID Servicio</label>
          <input
            name="id_servicio"
            value={id}
            onChange={e => setId(e.target.value)}
            required
          />
          <button type="submit" disabled={cargando}>Eliminar</button>
        </form>
        {mensaje && <div style={{ marginTop: 16, color: "#2a9d8f" }}>{mensaje}</div>}
      </div>
    </div>
  );
};

export default BorrarService;