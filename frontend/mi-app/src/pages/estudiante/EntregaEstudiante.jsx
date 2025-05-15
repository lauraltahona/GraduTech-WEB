import { useState } from "react";

export default function EntregaEstudiante({ entregasPlanificadas }) {
  const [uploads, setUploads] = useState({});

  const handleFileChange = (e, id_plan) => {
    setUploads({ ...uploads, [id_plan]: e.target.files[0] });
  };

  const handleSubmit = (id_plan) => {
    const file = uploads[id_plan];
    if (!file) return alert("Debes seleccionar un archivo");
    alert(`Subiendo entrega para ID plan ${id_plan}: ${file.name}`);
    // Aquí iría la lógica de subida (API call)
  };

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Mis entregas</h2>
      <div style={{ marginTop: '1rem' }}>
        {entregasPlanificadas.map((entrega) => (
          <div key={entrega.id_plan_entrega} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            <p><strong>Entrega #{entrega.nro_entrega}:</strong> {entrega.titulo}</p>
            <p>{entrega.descripcion}</p>
            <p><strong>Fecha límite:</strong> {entrega.fecha_limite}</p>
            <div style={{ marginTop: '0.5rem' }}>
              <input type="file" onChange={(e) => handleFileChange(e, entrega.id_plan_entrega)} />
              <button onClick={() => handleSubmit(entrega.id_plan_entrega)} style={{ marginLeft: '1rem' }}>Enviar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );