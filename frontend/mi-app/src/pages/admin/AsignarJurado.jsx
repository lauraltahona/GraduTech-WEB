import { useEffect, useState } from "react";
import "../../styles/admin/asignarDocente.css";

const AsignarJurado = () => {
  const [proyectos, setProyectos] = useState([]);
  const [jurados, setJurados] = useState([]);
  const [juradosFiltrados, setJuradosFiltrados] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [juradoSeleccionado, setJuradoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resProyectos, resJurados] = await Promise.all([
          fetch("http://localhost:5001/proyectos/sin-jurado"),
          fetch("http://localhost:5001/jurado/getAll"),
        ]);

        const [dataProyectos, dataJurados] = await Promise.all([
          resProyectos.json(),
          resJurados.json(),
        ]);

        const proyectosAprobados = dataProyectos.filter(
          (p) => p.estado?.toLowerCase() === "aprobado por docente"
        );

        setProyectos(proyectosAprobados);
        setJurados(dataJurados);
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
      setJuradosFiltrados([]);
      return;
    }

    const filtrados = jurados.filter(
      (j) =>
        j.carrera.trim().toLowerCase() === proyecto.carrera.trim().toLowerCase()
    );

    setJuradosFiltrados(filtrados);
    setJuradoSeleccionado(null);
  };

  const handleAsignar = async () => {
    if (!proyectoSeleccionado || !juradoSeleccionado) return;

    try {
      const res = await fetch("http://localhost:5001/proyectos/asignar-jurado", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: proyectoSeleccionado.title,
          idJurado: juradoSeleccionado,
        }),
      });

      const data = await res.json();
      alert(data.message || "Jurado asignado con éxito");
      window.location.reload();
    } catch (error) {
      console.error("Error al asignar jurado:", error);
      alert("Hubo un error al asignar el jurado");
    }
  };

  if (cargando) return <p className="loading">Cargando datos...</p>;

  return (
    <div className="asignar-docente-container">
      <h2 className="titulo">Asignación de Jurado</h2>
      <p className="descripcion">
        Cuando elijas un proyecto, se mostrarán automáticamente los jurados disponibles para esa misma carrera.
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

      {juradosFiltrados.length > 0 ? (
        <div className="form-group">
          <label>Selecciona un jurado:</label>
          <select
            onChange={(e) => setJuradoSeleccionado(e.target.value)}
            defaultValue=""
          >
            <option value="">-- Selecciona --</option>
            {juradosFiltrados.map((j) => (
              <option key={j.id_jurado} value={j.id_jurado}>
                {j.usuario.nombre} C.C: ({j.usuario.cedula})
              </option>
            ))}
          </select>
        </div>
      ) : proyectoSeleccionado ? (
        <p className="no-docentes">No hay jurados disponibles para esta carrera.</p>
      ) : null}

      <button
        className="btn-asignar"
        onClick={handleAsignar}
        disabled={!proyectoSeleccionado || !juradoSeleccionado}
      >
        Asignar Jurado
      </button>
    </div>
  );
};

export default AsignarJurado;
