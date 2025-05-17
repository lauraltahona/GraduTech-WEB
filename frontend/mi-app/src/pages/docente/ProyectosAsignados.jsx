import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function ProyectosAsignados() {
  const [proyectos, setProyectos] = useState([]);
  const idUsuario = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProyectos = async () => {
    try {
      const response = await fetch(`http://localhost:5001/proyectos/asignados/${idUsuario}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setProyectos(data);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
};

    if (idUsuario) {
      fetchProyectos();
    }
  }, [idUsuario]);

  const irAPlanEntrega = (id_proyecto) => {
    localStorage.setItem("id_proyecto", id_proyecto);
    navigate("/planEntrega"); // Asegúrate que esta ruta existe
  };

  return (
    <div>
      <h2>Proyectos Asignados</h2>
      {proyectos.length === 0 ? (
        <p>No hay proyectos asignados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Estado</th>
              <th>Estudiante</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((proyecto) => (
              <tr key={proyecto.id_proyecto}>
                <td>{proyecto.id_proyecto}</td>
                <td>{proyecto.titulo}</td>
                <td>{proyecto.estado}</td>
                <td>{proyecto.estudiante}</td>
                <td>
                  <button onClick={() => irAPlanEntrega(proyecto.id_proyecto)}>Planear entrega</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
