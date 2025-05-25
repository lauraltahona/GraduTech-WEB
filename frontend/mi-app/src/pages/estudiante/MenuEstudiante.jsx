import React from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
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
  { id: "registrarProyecto", label: "Mis Proyectos", icon: FolderOpen },
  { id: "calendario", label: "Calendario", icon: Calendar },
  { id: "miProyecto", label: "Mi proyecto", icon: FileText },
  { id: "entregasEstudiante", label: "Entregas", icon: Package },
  { id: "revisionJurados", label: "Revisión Jurado", icon: Users },
  { id: "repositorio", label: "Repositorio", icon: Archive },
];

const MenuEstudiante = () => {
  const [activeItem, setActiveItem] = useState("registrarProyecto");

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
              <p className="user-role">Estudiante</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MenuEstudiante;
