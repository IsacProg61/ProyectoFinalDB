import React, { useState } from "react";
import './Agregar_Cliente.css';

const Borrar_Cliente = () => {
  const [id_cliente, setIdCliente] = useState("");
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setIdCliente(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    try {
      const response = await fetch('http://localhost:5000/borrarCliente', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_cliente }),
      });
      const data = await response.json();

      if (response.ok) {
        setMensaje(data.message || 'Cliente borrado exitosamente.');
        setIdCliente('');
      } else {
        setMensaje(data.error || 'Error al borrar el cliente.');
      }
    } catch (error) {
      setMensaje('Error de conexión.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Borrar Cliente</h2>
      <form className="client-form" onSubmit={handleSubmit}>
        <label htmlFor="id_cliente">ID Cliente</label>
        <input
          id="id_cliente"
          name="id_cliente"
          value={id_cliente}
          onChange={handleChange}
          disabled={cargando}
          required
        />

        <button className="button-client" type="submit" disabled={cargando}>
          {cargando ? 'Borrando...' : 'Borrar'}
        </button>
      </form>
      {mensaje && <p style={{ marginTop: '1rem', color: 'red', textAlign: 'center' }}>{mensaje}</p>}
    </div>
  );
};

export default Borrar_Cliente;