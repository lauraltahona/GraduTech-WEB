import React, { useEffect, useState } from 'react';
import '../../styles/admin/consultaDocente.css';

const ConsultaDocente = () => {
  const [idDocente, setIdDocente] = useState('');
  const [docente, setDocente] = useState(null);
  const [docentes, setDocentes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/docente/getAll')
      .then((res) => res.json())
      .then((data) => setDocentes(data))
      .catch((err) => console.error('Error al obtener docentes:', err));
  }, []);

  const handleConsultar = async () => {
    try {
      const response = await fetch(`http://localhost:5001/docente/id=/${idDocente}`);
      if (!response.ok) throw new Error('Error al obtener el docente');
      const data = await response.json();
      setDocente(data);
      setError('');
    } catch (err) {
      setDocente(null);
      setError('No se pudo encontrar el docente');
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este docente?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:5001/docente/eliminar/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idDocente: id }),
      });
      if (!res.ok) throw new Error();
      setDocentes((prev) => prev.filter((d) => d.id_docente !== id));
      alert('Docente eliminado con éxito');
    } catch {
      alert('Error al eliminar el docente');
    }
  };

  return (
    <div className="consulta-docente-container">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Consultar Docente</h2>
      <div className="consulta-docente-form">
        <input
          type="text"
          placeholder="Ingrese ID del docente"
          value={idDocente}
          onChange={(e) => setIdDocente(e.target.value)}
          className="border border-green-300 rounded px-2 py-1 mr-2"
        />
        <button
          onClick={handleConsultar}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Consultar
        </button>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {(docente || docentes.length > 0) && (
        <table className="consulta-docente-tabla">
          <thead className="bg-green-200">
            <tr>
              <th className="border px-2 py-1">ID Docente</th>
              <th className="border px-2 py-1">Profesión</th>
              <th className="border px-2 py-1">Disponibilidad</th>
              <th className="border px-2 py-1">Carrera</th>
              <th className="border px-2 py-1">Nombre</th>
              <th className="border px-2 py-1">Correo</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(docente ? [docente] : docentes).map((d) => (
              <tr key={d.id_docente} className="hover:bg-green-100">
                <td className="border px-2 py-1">{d.id_docente}</td>
                <td className="border px-2 py-1">{d.profesion}</td>
                <td className="border px-2 py-1">{d.disponibilidad}</td>
                <td className="border px-2 py-1">{d.carrera}</td>
                <td className="border px-2 py-1">{d.usuario.nombre}</td>
                <td className="border px-2 py-1">{d.usuario.correo}</td>
                <td className="acciones">
                  <button className="editar" title="Editar">
                    ✏️
                  </button>
                  <button
                    className="eliminar"
                    onClick={() => handleEliminar(d.id_docente)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConsultaDocente;
