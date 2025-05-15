import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import HomeEstudiante from './pages/estudiante/HomeEstudiante.jsx';
import MenuEstudiante from './pages/estudiante/MenuEstudiante.jsx';
import ProyectoEstudiante from './pages/estudiante/RegistrarProyecto.jsx';
import MiProyecto from './pages/estudiante/MiProyecto.jsx';
import RevisionJurados from './pages/estudiante/RevisionJurados.jsx';
import Calendario from './pages/estudiante/Calendario.jsx';
import PlanEntrega from './pages/docente/PlanEntrega.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homeEstudiante" element={<HomeEstudiante />} />
        <Route path="/menuEstudiante" element={<MenuEstudiante />}>
          <Route path="registrarProyecto" element={<ProyectoEstudiante />} />
          <Route path= "miProyecto" element={<MiProyecto />}/>
          <Route path= "revisionJurados" element={<RevisionJurados />}/>
          <Route path= "calendario" element={<Calendario />}/>
        </Route>
        <Route path="/planEntrega" element={<PlanEntrega />} />
      </Routes>
    </Router>
  );
}

export default App;