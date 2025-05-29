import React, { useState } from "react";
import './Agregar_Cliente.css';

const AgregarCliente = () => {
  const [cliente, setCliente] = useState({
    id_cliente: "",
    nombre_completo: "",
    numero: "",
  });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      const response = await fetch('http://localhost:5000/agregarCliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });
      const data = await response.json();

      if (response.ok) {
        setMensaje(data.message || 'Cliente agregado exitosamente.');
        setCliente({ id_cliente: '', nombre_completo: '', numero: '' });
      } else {
        setMensaje(data.error || 'Error al agregar el cliente.');
      }
    } catch (error) {
      setMensaje('Error de conexión.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="client-form-container">
      <div className="form-wrapper">
        <h2>Agregar Cliente</h2>
        <form className="client-form" onSubmit={handleSubmit}>
          <label htmlFor="id_cliente">ID</label>
          <input
            id="id_cliente"
            name="id_cliente"
            value={cliente.id_cliente}
            onChange={handleChange}
            disabled={cargando}
          />

          <label htmlFor="nombre_completo">Nombre Completo</label>
          <input
            id="nombre_completo"
            name="nombre_completo"
            value={cliente.nombre_completo}
            onChange={handleChange}
            disabled={cargando}
          />

          <label htmlFor="numero">Número</label>
          <input
            id="numero"
            name="numero"
            value={cliente.numero}
            onChange={handleChange}
            disabled={cargando}
          />

          <button className="button-client" type="submit" disabled={cargando}>
            {cargando ? 'Agregando...' : 'Agregar'}
          </button>
        </form>
        {mensaje && <p style={{ marginTop: '1rem', color: 'red', textAlign: 'center' }}>{mensaje}</p>}
      </div>
    </div>
  );
};

export default AgregarCliente;
