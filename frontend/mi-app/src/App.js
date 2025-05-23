import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login.jsx";
import HomeEstudiante from "./pages/estudiante/HomeEstudiante.jsx";
import MenuEstudiante from "./pages/estudiante/MenuEstudiante.jsx";
import ProyectoEstudiante from "./pages/estudiante/RegistrarProyecto.jsx";
import MiProyecto from "./pages/estudiante/MiProyecto.jsx";
import RevisionJurados from "./pages/estudiante/RevisionJurados.jsx";
import Calendario from "./pages/estudiante/Calendario.jsx";
import PlanEntrega from "./pages/docente/PlanEntrega.jsx";
import ProyectosAsignados from "./pages/docente/ProyectosAsignados.jsx";
import EntregasEstudiante from "./pages/estudiante/EntregasEstudiante.jsx";
import SubirEntrega from "./pages/estudiante/SubirEntrega.jsx";
import EntregasPorPlan from "./pages/docente/EntregaPorPlan.jsx";
import MenuAdmin from "./pages/admin/MenuAdmin.jsx";
import RegistrarEstudiante from "./pages/admin/RegistrarEstudiante.jsx";
import RegistrarDocente from "./pages/admin/RegistrarDocente.jsx";
import AsignarDocente from "./pages/admin/AsignarDocente.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homeEstudiante" element={<HomeEstudiante />} />

        <Route path="/menuEstudiante" element={<MenuEstudiante />}>
          <Route path="registrarProyecto" element={<ProyectoEstudiante />} />
          <Route path="miProyecto" element={<MiProyecto />} />
          <Route path="revisionJurados" element={<RevisionJurados />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="entregasEstudiante" element={<EntregasEstudiante />} />
          <Route
            path="subir-entrega/:id_plan_entrega"
            element={<SubirEntrega />}
          />
        </Route>

        <Route path="/proyectosAsignados" element={<ProyectosAsignados />} />
        <Route path="/planEntrega" element={<PlanEntrega />} />
        <Route
          path="/entrega-por-plan/:id_plan_entrega"
          element={<EntregasPorPlan />}
        />

        <Route path="/menuAdmin" element={<MenuAdmin />}>
          <Route path="registrarEstudiante" element={<RegistrarEstudiante />} />
          <Route path="registrarDocente" element={<RegistrarDocente />} />
          <Route path="asignarDocente" element={<AsignarDocente />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="entregasEstudiante" element={<EntregasEstudiante />} />
          <Route
            path="subir-entrega/:id_plan_entrega"
            element={<SubirEntrega />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
