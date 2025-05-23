import { useState, useEffect } from "react";

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
        body: JSON.stringify({ data: nuevaEntrega }),
      });

      if (!response.ok) {
        throw new Error("Error al crear plan de entrega");
      }

      setEntregas([...entregas, nuevaEntrega]);
      setFormData({ nro_entrega: "", titulo: "", descripcion: "", fecha_limite: "" });

      // Recargar los planes existentes para que se actualicen automáticamente
      const updated = await fetch(`http://localhost:5001/entrega/proyecto/${id_proyecto}`);
      const updatedData = await updated.json();
      setPlanesExistentes(updatedData);
    } catch (error) {
      console.error(error);
      alert("No se pudo registrar el plan de entrega.");
    }
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Planificación de entregas</h2>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <div>
          <label>N° Entrega</label>
          <input name="nro_entrega" value={formData.nro_entrega} onChange={handleChange} />
        </div>
        <div>
          <label>Título</label>
          <input name="titulo" value={formData.title} onChange={handleChange} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label>Descripción</label>
          <input name="descripcion" value={formData.descripcion} onChange={handleChange} />
        </div>
        <div>
          <label>Fecha límite</label>
          <input type="date" name="fecha_limite" value={formData.fecha_limite} onChange={handleChange} />
        </div>
        <div style={{ alignSelf: 'end' }}>
          <button onClick={handleAdd}>Agregar</button>
        </div>
      </div>

      {/* Mostramos los planes ya creados abajo como enlaces */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Planes de entrega ya creados:</h3>
        <ul>
          {planesExistentes.map((plan, index) => (
            <li key={index}>
              <a
                href={`/entrega-por-plan/${plan.id_plan_entrega}`} // Asegúrate de tener esta ruta configurada en tu app
                style={{ color: 'blue', textDecoration: 'underline' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Entrega #{plan.nro_entrega}: {plan.titulo} - {new Date(plan.fecha_limite).toLocaleDateString()}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '1rem' }}>
        {entregas.map((e, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            <p><strong>Entrega #{e.nro_entrega}:</strong> {e.titulo}</p>
            <p>{e.descripcion}</p>
            <p><strong>Fecha límite:</strong> {e.fecha_limite}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
