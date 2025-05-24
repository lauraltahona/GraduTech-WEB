import React, { useState } from "react";
import "../../styles/loginStyles.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button.jsx";
import Logo from "../../assets/login/Logo.png";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/usuario/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contraseña }),
    });

    const result = await response.json();

    if (response.ok) {
      const user = result.user;
      console.log(user);

      alert("Ingresado como " + user.rol);
      localStorage.setItem("token", result.token); // si tienes token
      localStorage.setItem("userId", user.id_usuario);
      localStorage.setItem("userRol", user.rol);

      // redireccionar según el rol
      if (user.rol === "Estudiante") {
        navigate("/homeEstudiante");
      }
      if (user.rol === "Docente") {
        navigate("/proyectosAsignados");
      }
      if (user.rol === "Administrador") {
        navigate("/menuAdmin");
      }
    } else {
      alert("Credenciales incorrectas");
      throw new Error(`Error ${response.status}: ${await response.text()}`);
    }
  };

  return (
    <main className="main-content">
      <header className="header-content">
        <div className="header-content-img">{Logo}</div>
        <div className="content-title">
          <h1 className="header-title">Iniciar sesión</h1>
          <h3 className="header-description">
            Ingresa tus credenciales para acceder
          </h3>
        </div>
      </header>
      <form className="form-content">
        <div className="form-content-email">
          <label htmlFor="email" className="label">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@ejemplo.com"
            className="input inputEmail"
          />
        </div>
        <div className="form-content-password">
          <div className="content-labelPassword">
            <label htmlFor="password" className="label">
              Contraseña
            </label>
            <p href="#" className="label-rememberPassword">
              ¿Olvidaste tu contraseña?
            </p>
          </div>
          <div className="content-input-password">
            <input
              id="password"
              // type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input"
            />
            <button
              type="button"
              // onClick={() => setShowPassword(!showPassword)}
              className="button-showPass"
              // aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {/* {showPassword ? <EyeOff size={18} /> : <Eye size={18} />} */}
            </button>
          </div>
        </div>
      </form>
      <div className="content-button-login">
        <button className="button-login">Iniciar sesión</button>
      </div>
    </main>

    // <div>
    //   <h2>Iniciar sesión</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       placeholder="Correo"
    //       value={correo}
    //       onChange={(e) => setCorreo(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Contraseña"
    //       value={contraseña}
    //       onChange={(e) => setContraseña(e.target.value)}
    //     />
    //     <button type="submit">Ingresar</button>
    //   </form>
    // </div>
  );
}

export default Login;
