import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./agregar_servicio.css";

const AgregarServicio = () => {
  const navigate = useNavigate();
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

  const setFechaActual = () => {
    const today = new Date().toISOString().split('T')[0];
    setFormData({...formData, fecha_entrega: today});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje("");

    const servicioData = {
      id_servicio: formData.id_servicio,
      equipo: formData.equipo,
      descripcion: formData.descripcion,
      fecha_entrega: formData.fecha_entrega,
      id_empleado: formData.id_empleado,
      costo: parseFloat(formData.costo),
      id_sucursal: formData.id_sucursal
    };

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
    <div className="service-container">
      {/* Barra lateral */}
      <div className="sidebar">
        <div className="sidebar-title">Menu Principal</div>
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← Regresar al Menú
        </button>
      </div>

      {/* Contenido principal */}
      <div className="form-content">
        <h2>Agregar Servicio</h2>
        <form onSubmit={handleSubmit} className="as-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="id_servicio">ID Servicio:</label>
              <input
                type="text"
                id="id_servicio"
                name="id_servicio"
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
                value={formData.equipo}
                onChange={handleChange}
                className="as-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="as-input"
              required
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fecha_entrega">Fecha de Entrega:</label>
              <div style={{display: 'flex', gap: '10px'}}>
                <input
                  type="date"
                  id="fecha_entrega"
                  name="fecha_entrega"
                  value={formData.fecha_entrega}
                  onChange={handleChange}
                  className="as-input"
                  required
                  style={{flex: 1}}
                />
                <button 
                  type="button" 
                  onClick={setFechaActual}
                  style={{
                    padding: '0 12px',
                    background: '#f0f0f0',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Hoy
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="id_empleado">ID Empleado:</label>
              <input
                type="text"
                id="id_empleado"
                name="id_empleado"
                value={formData.id_empleado}
                onChange={handleChange}
                className="as-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="costo">Costo:</label>
              <input
                type="number"
                id="costo"
                name="costo"
                value={formData.costo}
                onChange={handleChange}
                className="as-input"
                required
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label htmlFor="id_sucursal">ID Sucursal:</label>
              <input
                type="text"
                id="id_sucursal"
                name="id_sucursal"
                value={formData.id_sucursal}
                onChange={handleChange}
                className="as-input"
                required
              />
            </div>
          </div>

          <button type="submit" className="as-btn" disabled={cargando}>
            {cargando ? "Agregando..." : "Agregar Servicio"}
          </button>
        </form>
        {mensaje && <p className={`mensaje ${mensaje.includes('exitosamente') ? 'success' : 'error'}`}>{mensaje}</p>}
      </div>
    </div>
  );
};

export default AgregarServicio;