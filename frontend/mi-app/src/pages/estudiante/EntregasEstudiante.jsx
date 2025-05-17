import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        if (!response.ok) {
          throw new Error("Error al obtener las entregas");
        }
        const data = await response.json();
        setEntregas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id_usuario) {
      fetchEntregas();
    }
  }, [id_usuario]);

  if (loading) return <p>Cargando entregas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Entregas Asignadas</h2>
      {entregas.length === 0 ? (
        <p>No tienes entregas asignadas.</p>
      ) : (
        <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>N° Entrega</th>
              <th>Fecha Límite</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {entregas.map((entrega, index) => (
              <tr key={entrega.id_plan_entrega}>
                <td>{index + 1}</td>
                <td>{entrega.titulo}</td>
                <td>{entrega.descripcion}</td>
                <td>{entrega.nro_entrega}</td>
                <td>{new Date(entrega.fecha_limite).toLocaleString()}</td>
                <td>
                  <button onClick={() => navigate(`/menuEstudiante/subir-entrega/${entrega.id_plan_entrega}`)}>
                    Subir entrega
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EntregasEstudiante;
