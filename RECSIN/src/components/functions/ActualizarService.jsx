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
    <div className="service-form-wrapper">
      <h2>Actualizar Servicio</h2>
      <form className="service-form" onSubmit={handleSubmit}>
        <label>
          ID Servicio:
          <input
            className="service-input"
            name="id_servicio"
            value={form.id_servicio}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Equipo:
          <input
            className="service-input"
            name="equipo"
            value={form.equipo}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción:
          <input
            className="service-input"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />
        </label>
        <label>
          Fecha Entrega:
          <input
            className="service-input"
            type="date"
            name="fecha_entrega"
            value={form.fecha_entrega}
            onChange={handleChange}
          />
        </label>
        <label>
          ID Empleado:
          <input
            className="service-input"
            name="id_empleado"
            value={form.id_empleado}
            onChange={handleChange}
          />
        </label>
        <label>
          Costo:
          <input
            className="service-input"
            name="costo"
            value={form.costo}
            onChange={handleChange}
          />
        </label>
        <label>
          ID Sucursal:
          <input
            className="service-input"
            name="id_sucursal"
            value={form.id_sucursal}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="service-btn" disabled={cargando} style={{ marginTop: 16 }}>
          Actualizar
        </button>
        {mensaje && <div style={{ color: '#2a9d8f', marginTop: 12, textAlign: 'center' }}>{mensaje}</div>}
      </form>
    </div>
  );
};

export default ActualizarService;