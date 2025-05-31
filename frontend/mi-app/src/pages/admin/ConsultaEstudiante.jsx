import React, { useEffect, useState } from 'react';
import '../../styles/admin/consultaEstudiante.css'; // crea este archivo

const ConsultaEstudiante = () => {
  const [idEstudiante, setIdEstudiante] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [error, setError] = useState('');

  // Cargar todos los estudiantes al iniciar
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch('http://localhost:5001/estudiante/getAll');
        const data = await res.json();
        setEstudiantes(data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar estudiantes');
      }
    };
    fetchAll();
  }, []);

  const handleConsultar = async () => {
    try {
      const res = await fetch(`http://localhost:5001/estudiante/id=/${idEstudiante}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEstudiantes([data]);
      setError('');
    } catch {
      setEstudiantes([]);
      setError('No se pudo encontrar el estudiante');
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este estudiante?"); 

    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:5001/estudiante/eliminar/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();

      setEstudiantes((prev) => prev.filter((e) => e.id_estudiante !== id));
      alert('Estudiante eliminado con éxito');
    } catch {
      alert('Error al eliminar estudiante');
    }
  };

  return (
    <div className="consulta-est-container">
      <h2>Consulta de Estudiantes</h2>

      <div className="consulta-est-form">
        <input
          type="text"
          placeholder="Buscar por ID"
          value={idEstudiante}
          onChange={(e) => setIdEstudiante(e.target.value)}
        />
        <button onClick={handleConsultar}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {estudiantes.length > 0 && (
        <table className="consulta-est-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Carrera</th>
              <th>Semestre</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((est) => (
              <tr key={est.id_estudiante}>
                <td>{est.id_estudiante}</td>
                <td>{est.carrera}</td>
                <td>{est.semestre}</td>
                <td>{est.usuario.nombre}</td>
                <td>{est.usuario.correo}</td>
                <td className="acciones">
                  <button className="editar" title="Editar">
                    ✏️
                  </button>
                  <button
                    className="eliminar"
                    onClick={() => handleEliminar(est.id_estudiante)}
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

export default ConsultaEstudiante;
