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
import MenuConsultas from "./pages/admin/MenuConsultas.jsx";
import ConsultaEstudiante from "./pages/admin/ConsultaEstudiante.jsx";
import ConsultaDocente from "./pages/admin/ConsultaDocente.jsx";
import Proyectos from "./pages/jurado/Proyectos.jsx";
import AsignarJurado from "./pages/admin/AsignarJurado.jsx";
import RegistrarJurado from "./pages/admin/RegistrarJurado.jsx";
import ProyectoFinal from "./pages/jurado/ProyectoFinal.jsx";
import Inicio from "./pages/inicio/Inicio.jsx";
import HomeRepo from "./pages/repositorio/HomeRepo.jsx";
import MostrarProyectos from "./pages/repositorio/MostrarProyectos.jsx";
import ConsultaAuditoria from "./pages/admin/ConsultaAuditoria.jsx";
import BienvenidaMenu from "./pages/inicio/BienvenidaMenu.jsx";
import EditarProyecto from "./pages/estudiante/EditarProyecto.jsx";
import Estadisticas from "./pages/admin/estadisticas.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homeEstudiante" element={<HomeEstudiante />} />

        <Route path="/homeRepo" element={<HomeRepo />} />
        <Route path="/mostrarProyectosRepositorio" element={<MostrarProyectos />} />
        
        <Route path="/menuEstudiante" element={<MenuEstudiante />}>
          <Route index element={<BienvenidaMenu />} />
          <Route path="registrarProyecto" element={<ProyectoEstudiante />} />
          <Route path="editarProyecto" element={<EditarProyecto />} />
          <Route path="miProyecto" element={<MiProyecto />} />
          <Route path="revisionJurados" element={<RevisionJurados />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="entregasEstudiante" element={<EntregasEstudiante />} />
          <Route path="subir-entrega/:id_plan_entrega" element={<SubirEntrega />}/>
        </Route>

        <Route path="/proyectosAsignados" element={<ProyectosAsignados />} />
        <Route path="/planEntrega" element={<PlanEntrega />} />
        <Route
          path="/entrega-por-plan/:id_plan_entrega"
          element={<EntregasPorPlan />}
        />

        <Route path="/menuAdmin" element={<MenuAdmin />}>
          <Route index element={<BienvenidaMenu />} />
          <Route path="registrarEstudiante" element={<RegistrarEstudiante />} />
          <Route path="registrarDocente" element={<RegistrarDocente />} />
          <Route path="registrarJurado" element={<RegistrarJurado />} />
          <Route path="asignarDocente" element={<AsignarDocente />} />
          <Route path="asignarJurado" element={<AsignarJurado />} />
          <Route path="menuConsultas" element={<MenuConsultas />}>
            <Route path="consultarEstudiante" element={<ConsultaEstudiante />} />
            <Route path="consultarDocente" element={<ConsultaDocente />} />
            <Route path="consultarAuditoria" element={<ConsultaAuditoria />} />
          </Route>
          <Route path="estadisticas" element={<Estadisticas />} />
        </Route>

        <Route path="/proyectosJurado" element={<Proyectos />} />
        <Route path="/proyectoFinal" element={<ProyectoFinal />} />
      </Routes>
    </Router>
  );
}

export default App;
