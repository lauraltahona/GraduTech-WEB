import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/docente/Asignados.css";

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

  const irAPlanEntrega = (idProyecto, correo) => {
    localStorage.setItem('id_proyecto', idProyecto);
    localStorage.setItem('correo', correo);
    navigate('/planEntrega');
  };

  const cambiarEstado = async (idProyecto, nuevoEstado) => {
    try {
      const response = await fetch('http://localhost:5001/proyectos/cambiar-estado', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idProyecto, estado: nuevoEstado }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Proyecto actualizado:', data);
      setProyectos((prev) =>
        prev.map((proy) =>
          proy.idProyecto === idProyecto ? { ...proy, estado: nuevoEstado } : proy
        )
      );
    } catch (error) {
      console.error('Error al cambiar el estado del proyecto:', error);
    }
  };

  return (
    <div className="contenedor-proyectos">
      <h2>✅Proyectos Asignados</h2>
      {proyectos.length === 0 ? (
        <p>No hay proyectos asignados.</p>
      ) : (
        proyectos.map((proyecto) => (
          <div className="card-proyecto" key={proyecto.idProyecto}>
            <h3>{proyecto.titulo}</h3>
            <p><strong>Estudiante:</strong> {proyecto.estudiante}</p>
            <p><strong>Estado:</strong> {proyecto.estado}</p>
            <div className="acciones-plan-entrega">
              <button onClick={() => irAPlanEntrega(proyecto.idProyecto, proyecto.correo)}>
                Planear entrega
              </button>
              <select
                value={proyecto.estado}
                onChange={(e) => cambiarEstado(proyecto.idProyecto, e.target.value)}
              >
                <option value="EN REVISIÓN">EN REVISIÓN</option>
                <option value="APROBADO POR DOCENTE">APROBADO POR DOCENTE</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
