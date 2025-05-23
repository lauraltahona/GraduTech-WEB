import React, { useState } from 'react';

const RegistrarEstudiante = () => {
  const [form, setForm] = useState({
    id_estudiante: '',
    carrera: '',
    semestre: '',
    usuario: {
      nombre: '',
      correo: '',
      contraseña: ''
    }
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (['nombre', 'correo', 'contraseña'].includes(name)) {
    setForm({ ...form, usuario: { ...form.usuario, [name]: value } });
  } else {
    setForm({
      ...form,
      [name]: name === 'semestre' ? parseInt(value, 10) : value
    });
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/estudiante', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      
      if (res.ok) {
        setMensaje(`✅ ${data.message || 'Registrado correctamente'}`);
      } else {
        setMensaje(`❌ Error: ${data.error || 'No se pudo registrar'}`);
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error: No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registrar Estudiante</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="id_estudiante"
          placeholder="ID Estudiante"
          value={form.id_estudiante}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="carrera"
          value={form.carrera}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Seleccione carrera</option>
          <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
          <option value="Ingeniería Ambiental">Ingeniería Ambiental</option>
          <option value="Ingeniería Agroindustrial">Ingeniería Agroindustrial</option>
          <option value="Psicología">Psicología</option>
          <option value="Sociología">Sociología</option>
        </select>
        <input
          name="semestre"
          placeholder="Semestre"
          type="number"
          min="1"
          value={form.semestre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.usuario.nombre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="correo"
          placeholder="Correo"
          type="email"
          value={form.usuario.correo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="contraseña"
          placeholder="Contraseña"
          type="password"
          value={form.usuario.contraseña}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Registrar
        </button>
      </form>
      {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
    </div>
  );
};

export default RegistrarEstudiante;
