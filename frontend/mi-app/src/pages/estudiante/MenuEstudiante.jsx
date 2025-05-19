import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/Menu.css';

const MenuEstudiante = () => {
  return (
    <div className="menu-container">
      <aside className="sidebar">
        <h2 className="logo">GRADUTECH</h2>
        <nav>
          <ul className="menu">
            <li><Link to="registrarProyecto" className="menu-link">Mis Proyectos</Link></li>
            <li><Link to="calendario" className="menu-link">Calendario</Link></li>
            <li><Link to="miProyecto" className="menu-link">Mi proyecto</Link></li>
            <li><Link to="entregasEstudiante" className="menu-link">Entregas</Link></li>
            <li><Link to="revisionJurados" className="menu-link">Revisión Jurado</Link></li>
            <li><Link to="repositorio" className="menu-link">Repositorio</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MenuEstudiante;
