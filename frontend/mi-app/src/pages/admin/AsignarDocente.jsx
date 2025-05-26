import { useEffect, useState } from "react";
import "../../styles/admin/asignarDocente.css" 

const AsignarDocente = () => {
  const [proyectos, setProyectos] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [docentesFiltrados, setDocentesFiltrados] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resProyectos, resDocentes] = await Promise.all([
          fetch("http://localhost:5001/proyectos/sin-docente"),
          fetch("http://localhost:5001/docente/docentes-disponibles"),
        ]);

        const [dataProyectos, dataDocentes] = await Promise.all([
          resProyectos.json(),
          resDocentes.json(),
        ]);

        setProyectos(dataProyectos);
        setDocentes(dataDocentes);
      } catch (error) {
        console.error("Error cargando datos:", error);
        alert("Error al cargar los datos del servidor");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const handleProyectoChange = (e) => {
    const title = e.target.value;
    const proyecto = proyectos.find((p) => p.title === title);
    setProyectoSeleccionado(proyecto);

    if (!proyecto) {
      setDocentesFiltrados([]);
      return;
    }

    const filtrados = docentes.filter(
      (d) =>
        d.carrera.trim().toLowerCase() === proyecto.carrera.trim().toLowerCase()
    );

    setDocentesFiltrados(filtrados);
    setDocenteSeleccionado(null);
  };

  const handleAsignar = async () => {
    if (!proyectoSeleccionado || !docenteSeleccionado) return;

    try {
      const res = await fetch("http://localhost:5001/proyectos/asignar-docente", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: proyectoSeleccionado.title,
          idDocente: docenteSeleccionado,
        }),
      });

      const data = await res.json();
      alert(data.message || "Docente asignado con éxito");
      window.location.reload();
    } catch (error) {
      console.error("Error al asignar docente:", error);
      alert("Hubo un error al asignar el docente");
    }
  };

  if (cargando) return <p className="loading">Cargando datos...</p>;

  return (
    <div className="asignar-docente-container">
      <h2 className="titulo">Asignación de Docente</h2>
      <p className="descripcion">
        Cuando elijas un proyecto, se mostrarán automáticamente los docentes disponibles para esa misma carrera.
      </p>

      <div className="form-group">
        <label>Selecciona un proyecto:</label>
        <select onChange={handleProyectoChange} defaultValue="">
          <option value="">-- Selecciona --</option>
          {proyectos.map((p) => (
            <option key={p.id} value={p.title}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {docentesFiltrados.length > 0 ? (
        <div className="form-group">
          <label>Selecciona un docente:</label>
          <select
            onChange={(e) => setDocenteSeleccionado(e.target.value)}
            defaultValue=""
          >
            <option value="">-- Selecciona --</option>
            {docentesFiltrados.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre} ({d.id})
              </option>
            ))}
          </select>
        </div>
      ) : proyectoSeleccionado ? (
        <p className="no-docentes">No hay docentes disponibles para esta carrera.</p>
      ) : null}

      <button
        className="btn-asignar"
        onClick={handleAsignar}
        disabled={!proyectoSeleccionado || !docenteSeleccionado}
      >
        Asignar Docente
      </button>
    </div>
  );
};

export default AsignarDocente;
