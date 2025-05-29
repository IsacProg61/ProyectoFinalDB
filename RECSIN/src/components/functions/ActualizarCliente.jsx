import React, { useState } from "react";
import "./Agregar_Cliente.css";

const ActualizarCliente = () => {
  const [cliente, setCliente] = useState({
    id_cliente: "",
    nombre_completo: "",
    numero: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cliente.id_cliente || !cliente.nombre_completo || !cliente.numero) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/actualizarCliente", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        alert("Cliente actualizado correctamente");
        setCliente({ id_cliente: "", nombre_completo: "", numero: "" });
      } else {
        alert("Error al actualizar cliente");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Actualizar Cliente</h2>
      <form className="client-form" onSubmit={handleSubmit}>
        <label htmlFor="id_cliente">ID</label>
        <input
          type="text"
          id="id_cliente"
          name="id_cliente"
          value={cliente.id_cliente}
          onChange={handleChange}
        />

        <label htmlFor="nombre_completo">Nombre Completo</label>
        <input
          type="text"
          id="nombre_completo"
          name="nombre_completo"
          value={cliente.nombre_completo}
          onChange={handleChange}
        />

        <label htmlFor="numero">Número</label>
        <input
          type="text"
          id="numero"
          name="numero"
          value={cliente.numero}
          onChange={handleChange}
        />

        <button type="submit">Actualizar Cliente</button>
      </form>
    </div>
  );
};

export default ActualizarCliente;