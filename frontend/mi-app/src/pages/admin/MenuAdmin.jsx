import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../styles/Menu.css';

const MenuAdmin = () => {
  return (
    <div className="menu-container">
      <aside className="sidebar">
        <h2 className="logo">GRADUTECH</h2>
        <nav>
          <ul className="menu">
            <li><Link to="registrarEstudiante" className="menu-link">Registrar Estudiante</Link></li>
            <li><Link to="registrarDocente" className="menu-link">Registrar Docente</Link></li>
            <li><Link to="registrarJurados" className="menu-link">Registrar Jurados</Link></li>
            <li><Link to="menuConsultas" className="menu-link">Consultar</Link></li>
            <li><Link to="asignarDocente" className="menu-link">Asignar docente</Link></li>
            <li><Link to="asignarJurado" className="menu-link">Asignar Jurado</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MenuAdmin;
