import React, { useState } from "react";
import "./agregar_servicio.css"; // Asegúrate de que la ruta sea correcta

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setCargando(true);
  setMensaje("");

  if (!formData.id_empleado || !formData.id_sucursal) {
    setMensaje("Todos los campos son obligatorios.");
    setCargando(false);
    return;
  }

  const servicioData = {
    id_servicio: formData.id_servicio,
    equipo: formData.equipo,
    descripcion: formData.descripcion,
    fecha_entrega: formData.fecha_entrega,
    id_empleado: formData.id_empleado,
    costo: parseFloat(formData.costo),
    id_sucursal: formData.id_sucursal
  };

  console.log("Datos a enviar:", servicioData);

  try {
    const response = await fetch("http://localhost:5000/agregarServicio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(servicioData)
    });
    const data = await response.json();
    if (response.ok) {
      setMensaje(data.message || "Servicio agregado exitosamente.");
      setFormData({
        id_servicio: "",
        equipo: "",
        descripcion: "",
        fecha_entrega: "",
        id_empleado: "",
        costo: "",
        id_sucursal: ""
      });
    } else {
      setMensaje(data.error || "Error al agregar el servicio.");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    setMensaje("Error de conexión.");
  } finally {
    setCargando(false);
  }
};


  return (
    <div className="as-form-container">
      <h2>Agregar Servicio</h2>
      <form onSubmit={handleSubmit} className="as-form">
        <div className="form-group">
          <label htmlFor="id_servicio">ID Servicio:</label>
          <input
            type="text"
            id="id_servicio"
            name="id_servicio"
            placeholder="ID del servicio"
            value={formData.id_servicio}
            onChange={handleChange}
            className="as-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="equipo">Equipo:</label>
          <input
            type="text"
            id="equipo"
            name="equipo"
            placeholder="Nombre del equipo"
            value={formData.equipo}
            onChange={handleChange}
            className="as-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            placeholder="Detalles del servicio"
            value={formData.descripcion}
            onChange={handleChange}
            className="as-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="fecha_entrega">Fecha de Entrega:</label>
          <input
            type="date"
            id="fecha_entrega"
            name="fecha_entrega"
            value={formData.fecha_entrega}
            onChange={handleChange}
            className="as-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="id_empleado">ID Empleado:</label>
          <input
            type="text"
            id="id_empleado"
            name="id_empleado"
            placeholder="Número de empleado"
            value={formData.id_empleado}
            onChange={handleChange}
            className="as-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="costo">Costo:</label>
          <input
            type="text"
            id="costo"
            name="costo"
            placeholder="Costo del servicio"
            value={formData.costo}
            onChange={handleChange}
            className="as-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="id_sucursal">ID Sucursal:</label>
          <input
            type="text"
            id="id_sucursal"
            name="id_sucursal"
            placeholder="Identificador de sucursal"
            value={formData.id_sucursal}
            onChange={handleChange}
            className="as-input"
            required
          />
        </div>
        
        <button type="submit" className="as-btn" disabled={cargando}>
          {cargando ? "Agregando..." : "Solución: Agregar"}
        </button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default AgregarServicio;
