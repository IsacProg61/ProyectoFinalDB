import React, { useState } from "react";
import "./Agregar_Cliente.css";

const AgregarCliente = () => {
  const [cliente, setCliente] = useState({
    id: "",
    nombre: "",
    numero: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        alert('Cliente agregado correctamente');
        setCliente({ id: "", nombre: "", numero: "" });
      } else {
        alert('Error al agregar cliente');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la conexión con el servidor');
    }
    };


  return (
    <form className="success-container" onSubmit={handleSubmit}>
      <input
        type="text"
        name="id_cliente"
        placeholder="ID"
        value={cliente.id_cliente}
        onChange={handleChange}
      />
      <input
        type="text"
        name="nombre_completo"
        placeholder="Nombre Completo"
        value={cliente.nombre_completo}
        onChange={handleChange}
      />
      <input
        type="number"
        name="numero"
        placeholder="Número"
        value={cliente.numero}
        onChange={handleChange}
      />
      <button type="submit">Agregar Cliente</button>
    </form>
  );
};

export default AgregarCliente;
