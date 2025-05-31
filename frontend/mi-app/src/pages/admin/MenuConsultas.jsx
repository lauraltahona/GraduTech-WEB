import { Link, Outlet } from 'react-router-dom';
import '../../styles/admin/menuConsultas.css';

const MenuConsultas = () => {
  return (
    <div className="menu-consultas-container">
      <h1 className="menu-consultas-titulo">Menú de Consultas</h1>
      <div className="menu-consultas-botones">
        <Link to="consultarEstudiante" className="menu-consultas-boton">
          Consultar Estudiante
        </Link>
        <Link to="consultarDocente" className="menu-consultas-boton">
          Consultar Docente
        </Link>
        <Link to="consultarAuditoria" className="menu-consultas-boton">
          Consultar Auditoria
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MenuConsultas;
