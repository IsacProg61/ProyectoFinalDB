import React, { useState } from 'react';
import './ServicesForm.css';

const ActualizarService = () => {
  const [form, setForm] = useState({
    id_servicio: '',
    equipo: '',
    descripcion: '',
    fecha_entrega: '',
    id_empleado: '',
    costo: '',
    id_sucursal: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setCargando(true);
    try {
      const res = await fetch('http://localhost:5000/actualizarService', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMensaje(data.message || 'Servicio actualizado correctamente');
    } catch (error) {
      setMensaje('Error al actualizar el servicio');
    }
    setCargando(false);
  };

  return (
    <div className="services-main">
      <div className="form-wrapper">
        <h2 className="services-title">Actualizar Servicio</h2>
        <form className="services-form" onSubmit={handleSubmit}>
          <label>
            ID Servicio:
            <input
              className="services-input"
              name="id_servicio"
              value={form.id_servicio}
              onChange={handleChange}
              required
              disabled={cargando}
            />
          </label>
          <label>
            Equipo:
            <input
              className="services-input"
              name="equipo"
              value={form.equipo}
              onChange={handleChange}
              disabled={cargando}
            />
          </label>
          <label>
            Descripción:
            <input
              className="services-input"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              disabled={cargando}
            />
          </label>
          <label>
            Fecha Entrega:
            <input
              className="services-input"
              type="date"
              name="fecha_entrega"
              value={form.fecha_entrega}
              onChange={handleChange}
              disabled={cargando}
            />
          </label>
          <label>
            ID Empleado:
            <input
              className="services-input"
              name="id_empleado"
              value={form.id_empleado}
              onChange={handleChange}
              disabled={cargando}
            />
          </label>
          <label>
            Costo:
            <input
              className="services-input"
              name="costo"
              value={form.costo}
              onChange={handleChange}
              disabled={cargando}
            />
          </label>
          <label>
            ID Sucursal:
            <input
              className="services-input"
              name="id_sucursal"
              value={form.id_sucursal}
              onChange={handleChange}
              disabled={cargando}
            />
          </label>
          <button type="submit" className="services-btn" disabled={cargando} style={{ marginTop: 16 }}>
            Actualizar
          </button>
          {mensaje && <div style={{ color: '#2a9d8f', marginTop: 12, textAlign: 'center' }}>{mensaje}</div>}
        </form>
      </div>
    </div>
  );
};

export default ActualizarService;