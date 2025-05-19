import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EntregasEstudiante.css";

function EntregasEstudiante() {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const id_usuario = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchEntregas() {
      try {
        const response = await fetch(`http://localhost:5001/entrega/asignadas/${id_usuario}`);
        if (!response.ok) throw new Error("Error al obtener las entregas");
        const data = await response.json();
        setEntregas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id_usuario) fetchEntregas();
  }, [id_usuario]);

  if (loading) return <p className="status-message">Cargando entregas...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;

  return (
    <div className="entregas-container">
      <h2 className="entregas-title">Entregas Asignadas</h2>
      {entregas.length === 0 ? (
        <p className="status-message">No tienes entregas asignadas.</p>
      ) : (
        <div className="entregas-list">
          {entregas.map((entrega, index) => (
            <div key={entrega.id_plan_entrega} className="entrega-card">
              <div className="entrega-header">
                <span className="entrega-numero">Entrega #{entrega.nro_entrega}</span>
                <h3 className="entrega-titulo">{entrega.titulo}</h3>
              </div>
              <p className="entrega-descripcion">{entrega.descripcion}</p>
              <p className="entrega-fecha">Fecha límite: <strong>{new Date(entrega.fecha_limite).toLocaleString()}</strong></p>
              <button
                className="entrega-button"
                onClick={() => navigate(`/menuEstudiante/subir-entrega/${entrega.id_plan_entrega}`)}
              >
                Subir entrega
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EntregasEstudiante;
