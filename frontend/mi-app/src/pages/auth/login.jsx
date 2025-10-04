import React, { useState } from "react";
import "../../styles/loginStyles.css";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/login/Logo.png";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      localStorage.setItem("token", result.token); 
      localStorage.setItem("userId", user.id_usuario);
      localStorage.setItem("userRol", user.rol);

      // redireccionar según el rol
      if (user.rol === "Estudiante") {
        navigate("/menuEstudiante");
      }
      if (user.rol === "Docente") {
        navigate("/proyectosAsignados");
      }
      if(user.rol === "Jurado"){
        navigate("/proyectosJurado");
      }
      if (user.rol === "Administrador") {
        navigate("/menuAdmin");
      }
    } else {
      alert("Credenciales incorrectas");
      // throw new Error(Error ${response.status}: ${await response.text()});
    }
  };

  return (
    <main className="main-content login">
      <div className="test">
        <header className="header-content-login">
          <div className="header-content-img">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="content-title">
            <h1 className="header-title">Iniciar sesión</h1>
            <h3 className="header-description">
              Ingresa tus credenciales para acceder
            </h3>
          </div>
        </header>
        <form onSubmit={handleSubmit} className="form-content-login">
          <div className="form-content-email">
            <label htmlFor="email" className="label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="usuario@unicesar.edu.co"
              className="input inputEmail"
              required
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
                type={showPassword ? "text" : "password"}
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="••••••••"
                className="input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="button-showPass"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} className="password-icon" />
                ) : (
                  <Eye size={18} className="password-icon" />
                )}
              </button>
            </div>
          </div>
          <div className="content-button-login">
            <button type="submit" className="button-login">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
