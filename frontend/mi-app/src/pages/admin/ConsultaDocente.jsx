import React, { useState } from 'react';

const ConsultaDocente = () => {
  const [idDocente, setIdDocente] = useState('');
  const [docente, setDocente] = useState(null);
  const [error, setError] = useState('');

  const handleConsultar = async () => {
    try {
      const response = await fetch(`http://localhost:5001/docente/id=/${idDocente}`);
      if (!response.ok) {
        throw new Error('Error al obtener el docente');
      }
      const data = await response.json();
      setDocente(data);
      setError('');
    } catch (err) {
      setDocente(null);
      setError('No se pudo encontrar el docente');
    }
  };

  return (
    <div>
      <h2>Consultar Docente por ID</h2>
      <input
        type="text"
        placeholder="Ingrese ID del docente"
        value={idDocente}
        onChange={(e) => setIdDocente(e.target.value)}
      />
      <button onClick={handleConsultar}>Consultar</button>

      {error && <p>{error}</p>}

      {docente && (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID Docente</th>
              <th>Profesión</th>
              <th>Disponibilidad</th>
              <th>Carrera</th>
              <th>ID Usuario</th>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{docente.id_docente}</td>
              <td>{docente.profesion}</td>
              <td>{docente.disponibilidad}</td>
              <td>{docente.carrera}</td>
              <td>{docente.usuario.id_usuario}</td>
              <td>{docente.usuario.nombre}</td>
              <td>{docente.usuario.correo}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConsultaDocente;
