import { useState } from 'react';

export const JuryForm = () => {
  const [formData, setFormData] = useState({
    idJurado: '',
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
      setFormData({
        ...formData,
        usuario: {
          ...formData.usuario,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/jurado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al registrar jurado');
      }

      setMensaje(`✅ ${data.message}`);
    } catch (err) {
      console.error(err);
      setMensaje('❌ ' + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registrar Jurado</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="idJurado"
          placeholder="ID Jurado"
          value={formData.idJurado}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="carrera"
          placeholder="Carrera"
          value={formData.carrera}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.usuario.nombre}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.usuario.correo}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formData.usuario.contraseña}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Registrar
        </button>
      </form>
      {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
    </div>
  );
};
