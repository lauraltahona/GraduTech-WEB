import React, { useState } from 'react';

const ConsultaEstudiante = () => {
  const [idEstudiante, setIdEstudiante] = useState('');
  const [estudiante, setEstudiante] = useState(null);
  const [error, setError] = useState('');

  const handleConsultar = async () => {
    try {
      const response = await fetch(`http://localhost:5001/estudiante/id=/${idEstudiante}`);
      if (!response.ok) {
        throw new Error('Error al obtener el estudiante');
      }
      const data = await response.json();
      setEstudiante(data);
      setError('');
    } catch (err) {
      setEstudiante(null);
      setError('No se pudo encontrar el estudiante');
    }
  };

  return (
    <div>
      <h2>Consultar Estudiante por ID</h2>
      <input
        type="text"
        placeholder="Ingrese ID del estudiante"
        value={idEstudiante}
        onChange={(e) => setIdEstudiante(e.target.value)}
      />
      <button onClick={handleConsultar}>Consultar</button>

      {error && <p>{error}</p>}

      {estudiante && (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID Estudiante</th>
              <th>Carrera</th>
              <th>Semestre</th>
              <th>ID Usuario</th>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{estudiante.id_estudiante}</td>
              <td>{estudiante.carrera}</td>
              <td>{estudiante.semestre}</td>
              <td>{estudiante.usuario.id_usuario}</td>
              <td>{estudiante.usuario.nombre}</td>
              <td>{estudiante.usuario.correo}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConsultaEstudiante;
