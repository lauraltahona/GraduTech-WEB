// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5001/usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo, contraseña })
    });

    const result = await response.json();

    if (response.ok) {
      const user = result.user;
      alert('Ingresado como '+ user.rol);
      localStorage.setItem('token', result.token); // si tienes token
      localStorage.setItem('userId', user.id);     // o el campo que uses como ID
      localStorage.setItem('userRol', user.rol);   // opcional, si lo necesitas

      // redireccionar según el rol
      if (user.rol === 'Estudiante') {
        navigate('/homeEstudiante'); 
      }
      if(user.rol === 'Docente'){
        navigate('/planEntrega');
      }
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
