// src/pages/RepositoryHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/inicio/logoEnBlanco.png";
import logoTesis from "../../assets/repositorio/logo-tesis.png";
import logoProyectos from "../../assets/repositorio/logo-proyectos.png";
import logoPasantias from "../../assets/repositorio/logo-pasantias.png";
import "../../styles/repositorio/HomeRepo.css";
const HomeRepo = () => {
  const navigate = useNavigate();

  const goTo = (tipo) => {
    navigate(`/mostrarProyectosRepositorio?tipo=${tipo}`);
  };

  return (
    <div className="repo-container">
      <header className="repo-header">
        <img src={logo} alt="Logo UNICESAR" className="logoUpc2" />
      </header>

      <main className="repo-main">
        <h1 className="repo-title">REPOSITORIO UNICESAR</h1>

        <div className="repo-search">
          <input type="text" placeholder="Buscar en el repositorio..." className="search-input-repo" />
          <button className="search-button-repo">🔍</button>
        </div>

        <div className="repo-categories">
          <div className="category-card" onClick={() => goTo("Tesis")}>
            <img src={logoTesis} alt="Logo tesis" className="logoUpc" />
            <h3 className="category-title">Tesis</h3>
          </div>

          <div className="category-card" onClick={() => goTo("Pasantía")}>
            <img src={logoPasantias} alt="Logo pasantias" className="logoUpc" />
            <h3 className="category-title">Pasantías</h3>
          </div>

          <div className="category-card" onClick={() => goTo("Proyecto de grado")}>
            <img src={logoProyectos} alt="Logo proyectos" className="logoUpc" />
            <h3 className="category-title">Proyectos de grado</h3>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeRepo;
