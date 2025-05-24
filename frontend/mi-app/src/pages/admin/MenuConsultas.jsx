import { Link, Outlet } from 'react-router-dom';

const MenuConsultas = () => {
  const cardStyle = {
    width: '200px',
    height: '150px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    margin: '10px',
    padding: '20px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#333',
    backgroundColor: '#f9f9f9',
    boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
    transition: '0.3s'
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column'
  };

  const cardsContainer = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Menú de Consultas</h1>
      <div style={cardsContainer}>
        <Link to="consultarEstudiante" style={cardStyle}>Consultar Estudiante</Link>
        <Link to="consultarDocente" style={cardStyle}>Consultar Docente</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MenuConsultas;
