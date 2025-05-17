import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MenuEstudiante = () => {
  return (
    <div style={styles.container}>
      {/* Barra lateral */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>GRADUTECH</h2>
        <nav>
          <ul style={styles.menu}>
            <li><Link to="registrarProyecto" style={styles.link}>Mis Proyectos</Link></li>
            <li><Link to="calendario" style={styles.link}>Calendario</Link></li>
            <li><Link to="miProyecto" style={styles.link}>Mi proyecto</Link></li>
            <li><Link to="entregasEstudiante" style={styles.link}>Entregas</Link></li>
            <li><Link to="revisionJurados" style={styles.link}>Revisión Jurado</Link></li>
            <li><Link to="repositorio" style={styles.link}>Repositorio</Link></li>
          </ul>
        </nav>
      </div>

      {/* Sección principal con Outlet */}
      <div style={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", height: "100vh" },
  sidebar: { width: "250px", background: "#2C3E50", padding: "20px", color: "white" },
  logo: { textAlign: "center" },
  menu: { listStyle: "none", padding: 0 },
  link: { color: "white", textDecoration: "none", display: "block", padding: "10px" },
  main: { flex: 1, padding: "20px" }
};

export default MenuEstudiante;