import { useLocation } from 'react-router-dom';
import "../../styles/jurado/ProyectoJurado.css";

const ProyectoFinal = () => {
  const location = useLocation();
  const proyecto = location.state?.proyecto;

  if (!proyecto) return <p>No se encontró la información del proyecto.</p>;

  return (
    <div className="contenedor-proyecto-final">
      <h2>📄 Detalles del Proyecto</h2>
      <p><strong>Título:</strong> {proyecto.titulo}</p>
      <p><strong>Tipo:</strong> {proyecto.tipo}</p>
      <p><strong>Estado:</strong> {proyecto.estado}</p>
      <p><strong>Estudiante:</strong> {proyecto.estudiante}</p>
      <p><strong>Correo:</strong> {proyecto.correo}</p>
      <p><strong>Documento:</strong> 
        <a
          href={`http://localhost:5001${proyecto.rutaDocumento}`}
          target="_blank"
          rel="noopener noreferrer"
          className="enlace-documento-final"
        >
          📄 Ver documento
        </a>
      </p>
    </div>
  );
};

export default ProyectoFinal;
