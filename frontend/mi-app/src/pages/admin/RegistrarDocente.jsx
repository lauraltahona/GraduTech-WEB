import React, { useState } from 'react';

const RegistrarDocente = () => {
  const [form, setForm] = useState({
    id_docente: '',
    profesion: '',
    disponibilidad: '',
    carrera: '',
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
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/docente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`✅ ${data.message || 'Docente registrado correctamente'}`);
      } else {
        setMensaje(`❌ Error: ${data.error || 'No se pudo registrar el docente'}`);
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error: No se pudo conectar con el servidor');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Registrar Docente</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            name="id_docente"
            placeholder="ID Docente"
            value={form.id_docente}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            name="profesion"
            placeholder="Profesión"
            value={form.profesion}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <select
            name="carrera"
            value={form.carrera}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">Selecciona una carrera</option>
            <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
            <option value="Ingeniería Ambiental">Ingeniería Ambiental</option>
            <option value="Ingeniería Agroindustrial">Ingeniería Agroindustrial</option>
            <option value="Psicología">Psicología</option>
            <option value="Sociología">Sociología</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.usuario.nombre}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            name="correo"
            type="email"
            placeholder="Correo"
            value={form.usuario.correo}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            name="contraseña"
            type="password"
            placeholder="Contraseña"
            value={form.usuario.contraseña}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Registrar
        </button>
      </form>
      {mensaje && <p style={{ marginTop: '20px', textAlign: 'center' }}>{mensaje}</p>}
    </div>
  );
};

export default RegistrarDocente;
