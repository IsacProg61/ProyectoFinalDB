import React, { useEffect, useState } from "react";
import './VerClientes.css';
import './Agregar_Cliente.css'; 

const All = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/allClients");
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setClientes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="form-wrapper" style={{ maxWidth: 600, overflowX: "auto" }}>
      <h1 style={{ textAlign: "center", color: "black", fontSize: "1.1rem", marginBottom: 18 }}>
        Todos los Clientes
      </h1>

      {error && <p style={{ color: "red", textAlign: "center", fontSize: "0.95rem" }}>{error}</p>}

      {clientes.length > 0 ? (
        <div style={{ width: "100%", overflowX: "auto" }}>
          <table className="kb-table" style={{ fontSize: "0.93rem", minWidth: 420 }}>
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Nombre Completo</th>
                <th>Número</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id_cliente}>
                  <td>{cliente.id_cliente}</td>
                  <td>{cliente.nombre_completo}</td>
                  <td>{cliente.numero}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#555", fontSize: "0.95rem" }}>No hay clientes para mostrar.</p>
      )}
    </div>
  );
};

export default All;