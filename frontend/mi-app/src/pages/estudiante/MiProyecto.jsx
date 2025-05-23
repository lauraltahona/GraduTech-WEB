import { useState, useEffect } from "react";
import "../../styles/MiProyecto.css"; // Importamos los estilos

export default function MiProyecto() {
  const [proyecto, setProyecto] = useState(null);
  const id_usuario = localStorage.getItem("userId");

  useEffect(() => {
    if (!id_usuario) return;
    fetch(`http://localhost:5001/proyectos/obtener/${id_usuario}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la petición");
        return res.json();
      })
      .then((data) => {
        setProyecto(data);
      })
      .catch((error) => {
        console.error("Error al obtener el proyecto:", error);
      });
  }, [id_usuario]);

  if (!proyecto) {
    return (
      <div className="loading">
        Cargando proyecto...
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="titulo">🌱 Mi Proyecto 🌿</h1>

      <div className="tarjeta">
        <div className="seccion">
          <h2>Título</h2>
          <p>{proyecto.title}</p>
        </div>

        <div className="seccion">
          <h2>Estado</h2>
          <p>{proyecto.estado}</p>
        </div>

        <div className="seccion">
          <h2>Documento</h2>
          <a
            href={`http://localhost:5001${proyecto.rutaDocumento}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver documento final
          </a>
        </div>

        

        <div className="botones">
          <button className="btn editar">✍️ Editar Proyecto</button>
        </div>
      </div>
    </div>
  );
}
