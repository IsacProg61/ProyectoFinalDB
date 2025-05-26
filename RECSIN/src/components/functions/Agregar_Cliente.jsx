import React, { useState } from "react";
import "./Agregar_Cliente.css";

const AgregarCliente = () => {
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
      const response = await fetch("http://localhost:5000/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        alert("Cliente agregado correctamente");
        setCliente({ id_cliente: "", nombre_completo: "", numero: "" });
      } else {
        alert("Error al agregar cliente");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="client-form-container">
      <aside className="side-bar">
        <button
          className="back-button"
          onClick={() => window.history.back()}
        >
          Menu Principal
        </button>
      </aside>

      <div className="form-wrapper">
        <h2>Agregar Cliente</h2>
        <form class="client-form">
          <label for="id">ID</label>
          <input type="text" id="id" name="id" />

          <label for="name">Nombre Completo</label>
          <input type="text" id="name" name="name" />

          <label for="number">Número</label>
          <input type="text" id="number" name="number" />

          <button type="submit">Agregar Cliente</button>
        </form>
        
      </div>
    </div>
  );
};

export default AgregarCliente;
