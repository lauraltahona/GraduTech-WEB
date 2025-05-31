import React from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FolderOpen,
  Calendar,
  FileText,
  Package,
  Users,
  Archive,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import "../../styles/Menu.css";

const menuItems = [
  {
    id: "registrarEstudiante",
    label: "Registrar Estudiante",
    icon: FolderOpen,
  },
  { id: "registrarDocente", label: "Registrar Docente", icon: Calendar },
  { id: "registrarJurado", label: "Registrar Jurados", icon: FileText },
  { id: "menuConsultas", label: "Consultar", icon: Package },
  { id: "asignarDocente", label: "Asignar docente", icon: Users },
  { id: "asignarJurado", label: "Asignar Jurado", icon: Archive },
];

const MenuAdmin = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/"); 
  };
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <GraduationCap className="logo-icon" />
            <h1 className="logo-text">GRADUTECH</h1>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id} className="nav-item">
                  <Link
                    to={item.id}
                    className={`nav-link ${
                      activeItem === item.id ? "active" : ""
                    }`}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <div className="nav-link-content">
                      <IconComponent className="nav-icon" />
                      <span className="nav-text">{item.label}</span>
                    </div>
                    <ChevronRight className="nav-arrow" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <span>U</span>
            </div>
            <div className="user-details">
              <p className="user-name">Usuario</p>
              <p className="user-role">Administrador</p>
            </div>
          </div>
          
          <button className="logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MenuAdmin;
