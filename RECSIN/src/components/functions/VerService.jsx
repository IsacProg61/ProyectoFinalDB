import React, { useEffect, useState } from 'react';
import './VerService.css';

const VerService = () => {
  const [services, setServices] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/VerService')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  return (
    <div className="services-list">
      <h2 style={{ textAlign: "center", marginBottom: "24px", color: "#1a237e" }}>
        Lista de Servicios
      </h2>
      {cargando ? (
        <p style={{ textAlign: "center" }}>Cargando...</p>
      ) : (
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table className="kb-table">
            <thead>
              <tr>
                <th>ID Servicio</th>
                <th>Equipo</th>
                <th>Descripción</th>
                <th>Fecha Entrega</th>
                <th>ID Empleado</th>
                <th>Costo</th>
                <th>ID Sucursal</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={i}>
                  <td>{s.id_servicio}</td>
                  <td>{s.equipo}</td>
                  <td>{s.descripcion}</td>
                  <td>{s.fecha_entrega}</td>
                  <td>{s.id_empleado}</td>
                  <td>{s.costo}</td>
                  <td>{s.id_sucursal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerService;