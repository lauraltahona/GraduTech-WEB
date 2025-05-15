import { useState } from "react";

export default function PlanEntregaDocente() {
  const [entregas, setEntregas] = useState([]);
  const [formData, setFormData] = useState({
    nro_entrega: "",
    titulo: "",
    descripcion: "",
    fecha_limite: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setEntregas([...entregas, formData]);
    setFormData({ nro_entrega: "", titulo: "", descripcion: "", fecha_limite: "" });
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
          <input name="titulo" value={formData.titulo} onChange={handleChange} />
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
