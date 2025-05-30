// src/components/docente/HeaderDocente.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/HeaderDocente.css";

export default function HeaderJurado() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="header-docente">
      <div className="user-info">
            <div className="user-avatar">
              <span>U</span>
            </div>
            <div className="user-details">
              <p className="user-name">Usuario</p>
              <p className="user-role">Jurado</p>
            </div>
     </div>
      <button className="logout-button-header" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  );
}
