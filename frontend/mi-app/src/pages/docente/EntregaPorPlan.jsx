import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EntregasPorPlan = () => {
  const { id_plan_entrega } = useParams();
  const [entregas, setEntregas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => { 
    const obtenerEntregas = async () => {
      setError('');
      setEntregas([]);

      try {
        const response = await fetch(`http://localhost:5001/entrega/entrega-por-plan/${id_plan_entrega}`);
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        if (data.length === 0) {
          setError('No se encontraron entregas para este plan.');
        } else {
          setEntregas(data);
        }
      } catch (err) {
        console.error('Error al obtener entregas:', err);
        setError('Hubo un error al consultar las entregas.');
      }
    };

    obtenerEntregas();
  }, [id_plan_entrega]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Entregas para el plan #{id_plan_entrega}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {entregas.length > 0 ? (
        <table border="1" cellPadding="8" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>ID Entrega</th>
              <th>Fecha Envío</th>
              <th>Ruta Documento</th>
              <th>Descripción</th>
              <th>ID Estudiante</th>
            </tr>
          </thead>  
          <tbody>
            {entregas.map((entrega) => (
              <tr key={entrega.id_entrega}>
                <td>{entrega.id_entrega}</td>
                <td>{new Date(entrega.fecha_envio).toLocaleDateString()}</td>
                <td>
                  <a href={`http://localhost:5001${entrega.ruta_documento}`} target="_blank" rel="noopener noreferrer">
                    Ver documento
                  </a>
                </td>
                <td>{entrega.descripcion}</td>
                <td>{entrega.id_estudiante}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Cargando entregas...</p>
      )}
    </div>
  );
};

export default EntregasPorPlan;
