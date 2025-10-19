import { useState, useEffect } from "react";
import "../../styles/docente/PlanEntrega.css";
import HeaderDocente from '../auth/HeaderDocente.jsx';

export default function PlanEntrega() {
  const [entregas, setEntregas] = useState([]);
  const [planesExistentes, setPlanesExistentes] = useState([]);
  const [formData, setFormData] = useState({
    nro_entrega: "",
    titulo: "",
    descripcion: "",
    fecha_limite: "",
  });

  const id_proyecto = localStorage.getItem("id_proyecto");
  const correo_estudiante = localStorage.getItem("correo");

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await fetch(`http://localhost:5001/entrega/proyecto/${id_proyecto}`);
        if (!response.ok) throw new Error("Error al obtener planes existentes");
        const data = await response.json();
        setPlanesExistentes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlanes();
  }, [id_proyecto]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    const nuevaEntrega = {
      id_proyecto: Number(id_proyecto),
      ...formData,
      correo: correo_estudiante,
    };

    try {
      const response = await fetch("http://localhost:5001/entrega/planear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaEntrega),
      });

      if (!response.ok) {
        throw new Error("Error al crear plan de entrega");
      }

      setEntregas([...entregas, nuevaEntrega]);
      setFormData({ nro_entrega: "", titulo: "", descripcion: "", fecha_limite: "" });

      const updated = await fetch(`http://localhost:5001/entrega/proyecto/${id_proyecto}`);
      const updatedData = await updated.json();
      setPlanesExistentes(updatedData);
    } catch (error) {
      console.error(error);
      alert("No se pudo registrar el plan de entrega.");
    }
  };

  return (
  <>
      <HeaderDocente /> {/* Header arriba */}
    <div className="plan-entrega-container">
      <h2>📌Planificación de entregas</h2>

      <div className="form-grid-deliveryPlan">
        <div>
          <label>N° Entrega</label>
          <input name="nro_entrega" value={formData.nro_entrega} onChange={handleChange} />
        </div>
        <div>
          <label>Título</label>
          <input name="titulo" value={formData.titulo} onChange={handleChange} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label>Descripción</label>
          <input name="descripcion" value={formData.descripcion} onChange={handleChange} />
        </div>
        <div>
          <label>Fecha límite</label>
          <input type="date" name="fecha_limite" value={formData.fecha_limite} onChange={handleChange} />
        </div>
        <div style={{ alignSelf: "end" }}>
          <button onClick={handleAdd}>Agregar</button>
        </div>
      </div>

      <h3 style={{ marginBottom: "1rem" }}>Planes de entrega ya creados:</h3>
      <div className="card-list">
        {planesExistentes.map((plan, index) => (
          <div className="card" key={index}>
            <a href={`/entrega-por-plan/${plan.id_plan_entrega}`}>
              Entrega #{plan.nro_entrega}: {plan.titulo}
            </a>
            <p><strong>Fecha límite:</strong> {new Date(plan.fecha_limite).toLocaleDateString()}</p>
            <p>{plan.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  </>
  );
}
