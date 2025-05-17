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
import ProyectosAsignados from './pages/docente/ProyectosAsignados.jsx';
import EntregasEstudiante from './pages/estudiante/EntregasEstudiante.jsx';
import SubirEntrega from './pages/estudiante/SubirEntrega.jsx';
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
          <Route path="entregasEstudiante" element={<EntregasEstudiante />} />
          <Route path="subir-entrega/:id_plan_entrega" element={<SubirEntrega />} />
        </Route>
        <Route path="/proyectosAsignados" element={<ProyectosAsignados />} />
        <Route path="/planEntrega" element={<PlanEntrega />} />
      </Routes>
    </Router>
  );
}

export default App;