import React, { useState } from 'react';
import './ServicesForm.css';

const AgregarServicio = () => {
  const [formData, setFormData] = useState({
    id_servicio: "",
    equipo: "",
    descripcion: "",
    fecha_entrega: "",
    id_empleado: "",
    costo: "",
    id_sucursal: ""
  });
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const res = await fetch('http://localhost:5000/agregarServicio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setMensaje(data.message || 'Servicio agregado correctamente');
    } catch (error) {
      setMensaje('Error al agregar el servicio');
    }
    setCargando(false);
  };

  return (
    <div className="service-form-wrapper">
      <h2>Agregar Servicio</h2>
      <form className="service-form" onSubmit={handleSubmit}>
        <label htmlFor="id_servicio">ID Servicio</label>
        <input name="id_servicio" value={formData.id_servicio} onChange={handleChange} required />

        <label htmlFor="equipo">Equipo</label>
        <input name="equipo" value={formData.equipo} onChange={handleChange} required />

        <label htmlFor="descripcion">Descripción</label>
        <input name="descripcion" value={formData.descripcion} onChange={handleChange} required />

        <label htmlFor="fecha_entrega">Fecha Entrega</label>
        <input name="fecha_entrega" value={formData.fecha_entrega} onChange={handleChange} required />

        <label htmlFor="id_empleado">ID Empleado</label>
        <input name="id_empleado" value={formData.id_empleado} onChange={handleChange} required />

        <label htmlFor="costo">Costo</label>
        <input name="costo" value={formData.costo} onChange={handleChange} required />

        <label htmlFor="id_sucursal">ID Sucursal</label>
        <input name="id_sucursal" value={formData.id_sucursal} onChange={handleChange} required />

        <button type="submit" disabled={cargando}>Agregar</button>
      </form>
      {mensaje && <div style={{ marginTop: 16, color: "#2a9d8f" }}>{mensaje}</div>}
    </div>
  );
};

export default AgregarServicio;