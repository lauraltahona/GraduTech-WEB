import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/inicio/logoEnBlanco.png";
import fondo from "../../assets/inicio/YO_AMO_UPC.jpeg";
import "../../styles/inicio/inicio.css";
const Inicio = () => {
  const navigate = useNavigate();

  const irLogin = () => navigate("/login");
  const irRepositorio = () => navigate("/homeRepo");

  return (
    <div className="bienvenida-container" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="overlay-bienvenida">
        <header className="bienvenida-header">
          <img src={logo} alt="Logo UNICESAR" className="logoUpc" />
          <h1 className="tituloEslogan">Tu graduación, nuestro compromiso.</h1>
          <button className="btn-entrar-login" onClick={irLogin}>Entrar</button>
        </header>

        <main className="bienvenida-main">

          <div className="repositorio-box">
            <div className="icono-carpeta">📁</div>
            <div>
              <h2>Repositorio</h2>
              <p>Haz click para ver nuestro repositorio institucional</p>
              <button className="btn-repositorio" onClick={irRepositorio}>ir a repositorio</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inicio;