import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import portada from "../../assets/repositorio/portada.png";
import "../../styles/repositorio/mostrarProyectos.css"
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MostrarProyectos() {
  const query = useQuery();
  const tipo = query.get('tipo');
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const response = await fetch(`http://localhost:5001/proyectos/mostrarProyectos?tipo=${tipo}`);
        if (!response.ok) throw new Error('Error al obtener los proyectos');
        const data = await response.json();
        setProyectos(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProyectos();
  }, [tipo]);

  if (loading) {
  return <p className="mensaje-repo">Cargando proyectos...</p>;
  }

    if (proyectos.length === 0) {
    return <p className="mensaje-repo">No hay aprobados para el tipo "{tipo}"</p>;
    }

  return (
    <main data-tipo={`Proyectos tipo: ${tipo || "—"}`} className='main-proyectos-repositorio'>
      <table className="tabla-proyectos-repo">
        <thead>
          <tr>
            <th>Portada</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Tipo</th>
            <th>Carrera</th>
            <th>Fecha</th>
            <th>Documento</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto) => (
            <tr key={proyecto.idProyecto}>
              <img src={portada} alt="Portada proyecto" className='portada-proyectos'></img>
              <td>{proyecto.title}</td>
              <td>{proyecto.descripcion}</td>
              <td>{proyecto.tipo}</td>
              <td>{proyecto.student?.carrera || '—'}</td>
              <td>{new Date(proyecto.createdAt).toLocaleDateString()}</td>
              <td>
                <a
                  href={`http://localhost:5001${proyecto.rutaDocumento}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enlace-documento-repo"
                >
                  📄 Ver documento
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default MostrarProyectos;
