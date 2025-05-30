import React, { useEffect, useState } from 'react';
import '../../styles/admin/consultaDocente.css';

const ConsultaAuditoria = () => {
  const [auditorias, setAuditorias] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/auditoria/getAll')
      .then((res) => res.json())
      .then((data) => setAuditorias(data))
      .catch((err) => console.error('Error al obtener auditorías:', err));
  }, []);

  return (
    <div className="consulta-docente-container">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Auditoría de Entregas</h2>

      {auditorias.length > 0 ? (
        <table className="consulta-docente-tabla">
          <thead className="bg-green-200">
            <tr>
              <th className="border px-2 py-1">Acción</th>
              <th className="border px-2 py-1">Descripción</th>
              <th className="border px-2 py-1">Fecha Acción</th>
            </tr>
          </thead>
          <tbody>
            {auditorias.map((a, index) => (
              <tr key={index} className="hover:bg-green-100">
                <td className="border px-2 py-1">{a.accion}</td>
                <td className="border px-2 py-1">{a.descripcion}</td>
                <td className="border px-2 py-1">
                  {new Date(a.fecha_accion).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No hay registros de auditoría disponibles.</p>
      )}
    </div>
  );
};

export default ConsultaAuditoria;
