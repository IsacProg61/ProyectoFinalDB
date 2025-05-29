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
    <div className="services-main">
      <div className="form-wrapper">
        <h2 className="services-title">Eliminar Servicio</h2>
        <form className="services-form" onSubmit={handleSubmit}>
          <label htmlFor="id_servicio">
            ID Servicio:
            <input
              className="services-input"
              id="id_servicio"
              name="id_servicio"
              value={id}
              onChange={e => setId(e.target.value)}
              required
              disabled={cargando}
            />
          </label>
          <button
            type="submit"
            className="services-btn"
            disabled={cargando}
            style={{ marginTop: 8 }}
          >
            {cargando ? "Eliminando..." : "Eliminar"}
          </button>
        </form>
        {mensaje && (
          <div style={{ marginTop: 12, color: "#2a9d8f", textAlign: "center" }}>{mensaje}</div>
        )}
      </div>
    </div>
  );
};

export default BorrarService;