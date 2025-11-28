import { useState, useEffect } from 'react';
import '../../styles/admin/estadisticas.css';

export default function ProjectFilter() {
  const [listaProyectos, setListaProyectos] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);

  const [filtroSeleccionadoTipo, setFiltroSeleccionadoTipo] = useState('');
  const [filtroSeleccionadoEstado, setFiltroSeleccionadoEstado] = useState('');
  const [filtroSeleccionadoAño, setFiltroSeleccionadoAño] = useState('');
  const [filtroSeleccionadoCarrera, setFiltroSeleccionadoCarrera] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/proyectos/getAll')
      .then(respuesta => respuesta.json())
      .then(datosRecibidos => {
        setListaProyectos(datosRecibidos);
        setEstaCargando(false);
      })
      .catch(errorCapturado => {
        console.error(errorCapturado);
        setEstaCargando(false);
      });
  }, []);

  const proyectosFiltradosFinales = listaProyectos.filter(proyectoActual => {
    if (filtroSeleccionadoTipo && proyectoActual.tipo !== filtroSeleccionadoTipo) return false;
    if (filtroSeleccionadoEstado && proyectoActual.estado !== filtroSeleccionadoEstado) return false;
    if (filtroSeleccionadoAño && new Date(proyectoActual.createdAt).getFullYear() !== Number(filtroSeleccionadoAño)) return false;
    if (filtroSeleccionadoCarrera && proyectoActual.student?.carrera !== filtroSeleccionadoCarrera) return false;
    return true;
  });

  const tiposUnicos = [...new Set(listaProyectos.map(proyecto => proyecto.tipo))];
  const estadosUnicos = [...new Set(listaProyectos.map(proyecto => proyecto.estado))];
  const añosUnicos = [...new Set(listaProyectos.map(proyecto => new Date(proyecto.createdAt).getFullYear()))].sort((a, b) => b - a);
  const carrerasUnicas = [...new Set(listaProyectos.map(proyecto => proyecto.student?.carrera).filter(carrera => carrera !== undefined && carrera !== null))];

  const limpiarTodosFiltros = () => {
    setFiltroSeleccionadoTipo('');
    setFiltroSeleccionadoEstado('');
    setFiltroSeleccionadoAño('');
    setFiltroSeleccionadoCarrera('');
  };

  if (estaCargando) {
    return <div className="contenedor-cargando">Cargando proyectos...</div>;
  }

  return (
    <div className="contenedor-principal-proyectos">
      <h1 className="titulo-principal-proyectos">Proyectos de Grado</h1>

      <div className="seccion-filtros-proyectos">
        <div className="contenedor-selectores-filtros">
          <select 
            className="selector-filtro-tipo" 
            value={filtroSeleccionadoTipo} 
            onChange={(evento) => setFiltroSeleccionadoTipo(evento.target.value)}
          >
            <option value="">Todos los tipos</option>
            {tiposUnicos.map(tipoItem => (
              <option key={tipoItem} value={tipoItem}>{tipoItem}</option>
            ))}
          </select>

          <select 
            className="selector-filtro-estado" 
            value={filtroSeleccionadoEstado} 
            onChange={(evento) => setFiltroSeleccionadoEstado(evento.target.value)}
          >
            <option value="">Todos los estados</option>
            {estadosUnicos.map(estadoItem => (
              <option key={estadoItem} value={estadoItem}>{estadoItem}</option>
            ))}
          </select>

          <select 
            className="selector-filtro-carrera" 
            value={filtroSeleccionadoCarrera} 
            onChange={(evento) => setFiltroSeleccionadoCarrera(evento.target.value)}
          >
            <option value="">Todas las carreras</option>
            {carrerasUnicas.map(carreraItem => (
              <option key={carreraItem} value={carreraItem}>{carreraItem}</option>
            ))}
          </select>

          <select 
            className="selector-filtro-año" 
            value={filtroSeleccionadoAño} 
            onChange={(evento) => setFiltroSeleccionadoAño(evento.target.value)}
          >
            <option value="">Todos los años</option>
            {añosUnicos.map(añoItem => (
              <option key={añoItem} value={añoItem}>{añoItem}</option>
            ))}
          </select>

          <button className="boton-limpiar-filtros" onClick={limpiarTodosFiltros}>
            Limpiar filtros
          </button>
        </div>

        <p className="texto-contador-proyectos">
          Mostrando {proyectosFiltradosFinales.length} de {listaProyectos.length} proyectos
        </p>
      </div>

      <div className="contenedor-tabla-proyectos">
        <table className="tabla-proyectos">
          <thead className="encabezado-tabla-proyectos">
            <tr className="fila-encabezado-tabla">
              <th className="columna-titulo">Título</th>
              <th className="columna-tipo">Tipo</th>
              <th className="columna-estado">Estado</th>
              <th className="columna-carrera">Carrera</th>
              <th className="columna-fecha">Fecha</th>
              <th className="columna-documento">Documento</th>
            </tr>
          </thead>
          <tbody className="cuerpo-tabla-proyectos">
            {proyectosFiltradosFinales.map(proyectoItem => (
              <tr key={proyectoItem.idProyecto} className="fila-proyecto">
                <td className="celda-titulo">{proyectoItem.title}</td>
                <td className="celda-tipo">{proyectoItem.tipo}</td>
                <td className="celda-estado">
                  <span className={`etiqueta-estado etiqueta-estado-${proyectoItem.estado.toLowerCase().replace(' ', '-')}`}>
                    {proyectoItem.estado}
                  </span>
                </td>
                <td className="celda-carrera">{proyectoItem.student?.carrera || '—'}</td>
                <td className="celda-fecha">
                  {new Date(proyectoItem.createdAt).toLocaleDateString('es-ES')}
                </td>
                <td className="celda-documento">
                  <a
                    className="enlace-documento"
                    href={proyectoItem.rutaDocumento}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver documento
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {proyectosFiltradosFinales.length === 0 && (
          <div className="mensaje-sin-resultados">
            No hay proyectos que coincidan con los filtros
          </div>
        )}
      </div>
    </div>
  );
}