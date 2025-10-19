import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/docente/Asignados.css";
import HeaderDocente from '../auth/HeaderDocente.jsx';

export default function ProyectosAsignados() {
  const [proyectos, setProyectos] = useState([]);
  const idUsuario = localStorage.getItem('userId');
  const [mostrarModal, setMostrarModal] = useState(false);
  // eslint-disable-next-line
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [lugar, setLugar] = useState('');
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

  const handleProgramarClick = (proyecto) => {
    setMostrarModal(true);
    setProyectoSeleccionado(proyecto);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProyectoSeleccionado(null);
    setMensaje('');
    setFecha('');
    setHora('');
    setLugar('');
  };

  const enviarReunion = async () => {
    try {
      const response = await fetch('http://localhost:5001/email/programar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo: proyectos[0].correo,
          fecha,
          hora,
          lugar
        })
      });

      if (response.ok) {
        setMensaje('✅ Reunión programada con éxito');
        setMostrarModal(false);
      } else {
        setMensaje('❌ Error al programar la reunión');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error de conexión con el servidor');
    }
  };

  return (
    <>
      <HeaderDocente /> {/* Header arriba */}
      <div className="contenedor-proyectos">
        <h2>✅Proyectos Asignados</h2>
        {proyectos.length === 0 && proyectos.estado === 'APROBADO' ? (
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
                <button onClick={handleProgramarClick} >
                  Programar Reunión
                </button>
                {mensaje && <p>{mensaje}</p>}
                <select
                  value={proyecto.estado}
                  onChange={(e) => cambiarEstado(proyecto.idProyecto, e.target.value)}
                >
                  <option value="EN REVISIÓN">EN REVISIÓN</option>
                  <option value="APROBADO POR DOCENTE">APROBADO POR DOCENTE</option>
                  <option value="RECHAZADO">RECHAZADO</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
      {mostrarModal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <h3>📅 Programar reunión</h3>
            <div className="formulario-reunion">
              <label>
                Fecha:
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </label>
              <label>
                Hora:
                <input
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                />
              </label>
              <label>
                Lugar:
                <input
                  type="text"
                  value={lugar}
                  onChange={(e) => setLugar(e.target.value)}
                  placeholder="Ej. Sala de profesores"
                />
              </label>
              <div className="modal-botones">
                <button onClick={enviarReunion} className="btn-enviar-reunion2">
                  Enviar invitación
                </button>
                <button onClick={cerrarModal} className="btn-cerrar-modal">
                  Cancelar
                </button>
              </div>
              {mensaje && <p>{mensaje}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );

}
