import React, { useState } from "react";
import "../../styles/loginStyles.css";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/Card.jsx";
import { Label } from "../../components/ui/Label.jsx";
import { Input } from "../../components/ui/Input.jsx";
import { Button } from "../../components/ui/button.jsx";

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
  <Card className="card">
        <CardHeader className="cardHeader">
          <div className="div3">
            {/* Espacio para el logo */}
            <div className="div4">Espacio para el logo de tu proyecto</div>
          </div>
          <div className="div5">
            <CardTitle className="cardTitle">Iniciar sesión</CardTitle>
            <CardDescription className="cardDescription">
              Ingresa tus credenciales para acceder
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="cardContent">
          <div className="div7">
            <Label htmlFor="email" className="label labelEmail">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@ejemplo.com"
              className="input"
            />
          </div>
          <div className="div8">
            <div className="div9">
              <Label htmlFor="password" className="label">
                Contraseña
              </Label>
              <p href="#" className="p1">
                ¿Olvidaste tu contraseña?
              </p>
            </div>
            <div className="div10">
              <Input
                id="password"
                // type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input"
              />
              <button
                type="button"
                // onClick={() => setShowPassword(!showPassword)}
                className="button1"
                // aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {/* {showPassword ? <EyeOff size={18} /> : <Eye size={18} />} */}
              </button>
            </div>
          </div>
        </CardContent>
        <div className="div11">
          <Button className="button2">Iniciar sesión</Button>
          <p className="p2">
            ¿No tienes una cuenta?{" "}
            <p href="#" className="p3">
              Regístrate
            </p>
          </p>
        </div>
      </Card>

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
