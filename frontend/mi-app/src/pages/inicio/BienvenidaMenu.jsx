import React from "react";
import "../../styles/inicio/BienvenidaMenu.css";
import logo from "../../assets/login/Logo.png"

const BienvenidaMenu = () => {
  return (
    <div className="bienvenida-menu-container">
      <div className="bienvenida-menu-card">
        <img src={logo} alt="Logo Gradutech" className="bienvenida-menu-logo" />
        <h1 className="bienvenida-menu-titulo">¡Bienvenido a Gradutech!</h1>
        <p className="bienvenida-menu-texto">
          Aquí podrás gestionar tus proyectos, entregas y mucho más. Explora el menú para comenzar.
        </p>
      </div>
    </div>
  );
};

export default BienvenidaMenu;
