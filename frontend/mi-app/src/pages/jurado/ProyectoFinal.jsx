import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import "../../styles/jurado/ProyectoJurado.css";

const ProyectoFinal = () => {
  const location = useLocation();
  const proyecto = location.state?.proyecto;

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mensaje, setMensaje] = useState('');

  if (!proyecto) return <p>No se encontró la información del proyecto.</p>;

  const handleProgramarClick = () => {
    setMostrarFormulario(true);
  };

  const enviarReunion = async () => {
    try {
      const response = await fetch('http://localhost:5001/email/programar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo: proyecto.correo,
          fecha,
          hora
        })
      });

      if (response.ok) {
        setMensaje('✅ Reunión programada con éxito');
        setMostrarFormulario(false);
      } else {
        setMensaje('❌ Error al programar la reunión');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error de conexión con el servidor');
    }
  };

  return (
    <div className="contenedor-proyecto-final">
      <h2>📄 Detalles del Proyecto</h2>
      <p><strong>Título:</strong> {proyecto.titulo}</p>
      <p><strong>Tipo:</strong> {proyecto.tipo}</p>
      <p><strong>Estado:</strong> {proyecto.estado}</p>
      <p><strong>Estudiante:</strong> {proyecto.estudiante}</p>
      <p><strong>Correo:</strong> {proyecto.correo}</p>
      <p>
        <strong>Documento:</strong>{' '}
        <a
          href={`http://localhost:5001${proyecto.rutaDocumento}`}
          target="_blank"
          rel="noopener noreferrer"
          className="enlace-documento-final"
        >
          📄 Ver documento
        </a>
      </p>

      <button onClick={handleProgramarClick} className="btn-programar">
        📅 Programar Reunión
      </button>

      {mostrarFormulario && (
        <div className="formulario-reunion">
          <label>
            Fecha:
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </label>
          <label>
            Hora:
            <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
          </label>
          <button onClick={enviarReunion} className="btn-enviar-reunion">
            Enviar invitación
          </button>
        </div>
      )}

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default ProyectoFinal;
