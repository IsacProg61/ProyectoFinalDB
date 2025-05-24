import React, { useEffect, useState } from "react";

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
    <div>
      <h1>Todos los Clientes</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {clientes.length > 0 ? (
        <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
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
      ) : (
        <p>No hay clientes para mostrar.</p>
      )}
    </div>
  );
};

export default All;
