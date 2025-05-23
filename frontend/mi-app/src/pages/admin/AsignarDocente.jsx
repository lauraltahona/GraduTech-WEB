import { useEffect, useState } from "react";

const AsignarDocente = () => {
  const [proyectos, setProyectos] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [docentesFiltrados, setDocentesFiltrados] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/proyectos/sin-docente")
      .then((res) => res.json())
      .then(setProyectos);

    fetch("http://localhost:5001/docente/docentes-disponibles")
      .then((res) => res.json())
      .then(setDocentes);
  }, []);

  const handleProyectoChange = (e) => {
    const title = e.target.value;
    const proyecto = proyectos.find((p) => p.title === title);
    setProyectoSeleccionado(proyecto);

    // Filtrar docentes por carrera
    const filtrados = docentes.filter(
      (d) => d.carrera === proyecto.carrera
    );
    setDocentesFiltrados(filtrados);
  };

  const handleAsignar = async () => {
    const res = await fetch("http://localhost:5001/proyectos/asignar-docente", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tituloProyecto: proyectoSeleccionado.title,
        idDocente: docenteSeleccionado,
      }),
    });

    const data = await res.json();
    alert(data.message || "Docente asignado");
  };

  return (
    <div>
      <h2>Asignar Docente a Proyecto</h2>

      <label>Selecciona un proyecto:</label>
      <select onChange={handleProyectoChange}>
        <option value="">-- Selecciona --</option>
        {proyectos.map((p) => (
          <option key={p.id} value={p.title}>
            {p.title}
          </option>
        ))}
      </select>

      <label>Selecciona un docente:</label>
      <select onChange={(e) => setDocenteSeleccionado(e.target.value)}>
        <option value="">-- Selecciona --</option>
        {docentesFiltrados.map((d) => (
          <option key={d.id} value={d.id}>
            {d.id} - {d.carrera}
          </option>
        ))}
      </select>

      <button onClick={handleAsignar} disabled={!proyectoSeleccionado || !docenteSeleccionado}>
        Asignar
      </button>
    </div>
  );
}

export default AsignarDocente;
