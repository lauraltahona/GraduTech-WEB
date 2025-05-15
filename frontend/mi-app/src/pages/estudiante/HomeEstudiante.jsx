import React from 'react';
import { Link } from 'react-router-dom'; 

const HomeEstudiante = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Bienvenido a la App</h1>
      <Link to="/menuEstudiante" style={styles.boton}>Menú</Link>
    </div>
  );
};

const styles = {
  boton: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    marginTop: "20px"
  }
};

export default HomeEstudiante;