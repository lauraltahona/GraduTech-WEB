import { useEffect, useState } from "react";

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
    setDocenteSeleccionado(null); // Limpiar selección anterior
  };

  const handleAsignar = async () => {
    if (!proyectoSeleccionado || !docenteSeleccionado) return;

    try {
      const res = await fetch("http://localhost:5001/proyectos/asignar-docente", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tituloProyecto: proyectoSeleccionado.title,
          idDocente: docenteSeleccionado,
        }),
      });

      const data = await res.json();
      alert(data.message || "Docente asignado con éxito");

      // Opcional: recargar proyectos y docentes para actualizar estado
      window.location.reload();
    } catch (error) {
      console.error("Error al asignar docente:", error);
      alert("Hubo un error al asignar el docente");
    }
  };

  if (cargando) return <p>Cargando datos...</p>;

  return (
    <div>
      <h2>Asignar Docente a Proyecto</h2>

      <label>Selecciona un proyecto:</label>
      <select onChange={handleProyectoChange} defaultValue="">
        <option value="">-- Selecciona --</option>
        {proyectos.map((p) => (
          <option key={p.id} value={p.title}>
            {p.title}
          </option>
        ))}
      </select>

      {docentesFiltrados.length > 0 ? (
        <>
          <label>Selecciona un docente:</label>
          <select
            onChange={(e) => setDocenteSeleccionado(e.target.value)}
            defaultValue=""
          >
            <option value="">-- Selecciona --</option>
            {docentesFiltrados.map((d) => (
              <option key={d.id} value={d.id}>
                {d.id}
              </option>
            ))}
          </select>
        </>
      ) : proyectoSeleccionado ? (
        <p>No hay docentes disponibles para la carrera de este proyecto.</p>
      ) : null}

      <button
        onClick={handleAsignar}
        disabled={!proyectoSeleccionado || !docenteSeleccionado}
      >
        Asignar
      </button>
    </div>
  );
};

export default AsignarDocente;
