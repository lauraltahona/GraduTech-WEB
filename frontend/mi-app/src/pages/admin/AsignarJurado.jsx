import { useEffect, useState } from "react";

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

        setProyectos(dataProyectos);
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
    setJuradoSeleccionado(null); // Limpiar selección anterior
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
      alert(data.mensaje || "Jurado asignado correctamente");

      window.location.reload(); // Recargar para ver cambios
    } catch (error) {
      console.error("Error al asignar jurado:", error);
      alert("Hubo un error al asignar el jurado");
    }
  };

  if (cargando) return <p>Cargando datos...</p>;

  return (
    <div>
      <h2>Asignar Jurado a Proyecto</h2>

      <label>Selecciona un proyecto:</label>
      <select onChange={handleProyectoChange} defaultValue="">
        <option value="">-- Selecciona --</option>
        {proyectos.map((p) => (
          <option key={p.id} value={p.title}>
            {p.title}
          </option>
        ))}
      </select>

      {juradosFiltrados.length > 0 ? (
        <>
          <label>Selecciona un jurado:</label>
          <select
            onChange={(e) => setJuradoSeleccionado(e.target.value)}
            defaultValue=""
          >
            <option value="">-- Selecciona --</option>
            {juradosFiltrados.map((j) => (
              <option key={j.idJurado} value={j.idJurado}>
                {j.idJurado}
              </option>
            ))}
          </select>
        </>
      ) : proyectoSeleccionado ? (
        <p>No hay jurados disponibles para la carrera de este proyecto.</p>
      ) : null}

      <button
        onClick={handleAsignar}
        disabled={!proyectoSeleccionado || !juradoSeleccionado}
      >
        Asignar
      </button>
    </div>
  );
};

export default AsignarJurado;
