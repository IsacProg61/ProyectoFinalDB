import React, { useEffect, useState } from 'react';
import './AgregarKnowledge.css';

export default function VerKnowledge() {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setCargando(true);
      setError('');
      try {
        const res = await fetch('http://localhost:5000/verKnowledge');
        const data = await res.json();
        if (res.ok) {
          setRegistros(data);
        } else {
          setError(data.error || 'Error al obtener los registros.');
        }
      } catch (e) {
        setError('Error de conexión.');
      } finally {
        setCargando(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="kb-form-container">
      <h2>Base de Knowledge</h2>
      {cargando ? (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>Cargando...</div>
      ) : error ? (
        <div style={{ color: '#e63946', textAlign: 'center', margin: '2rem 0' }}>{error}</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="kb-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha Salida</th>
                <th style={{ color: '#2b7cff', fontWeight: 'bold' }}>Procedimiento</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r, i) => (
                <tr key={i}>
                  <td>{r.id_cliente}</td>
                  <td>{r.id_servicio}</td>
                  <td>{r.fecha_salida}</td>
                  <td style={{ background: '#eaf1ff', color: '#1a237e', fontWeight: 'bold', maxWidth: 400, whiteSpace: 'pre-line' }}>{r.procedimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
