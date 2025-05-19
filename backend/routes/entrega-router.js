import { EntregaController } from "../controller/entrega-controller.js";
import { Router } from "express";

const entregaRouter = Router();

entregaRouter.post('/planear', EntregaController.crearPlanEntrega);
entregaRouter.get('/asignadas/:id_usuario', EntregaController.obtenerEntregasEstudiante);
entregaRouter.post('/subir', EntregaController.subirEntrega);
entregaRouter.get('/proyecto/:id_proyecto', EntregaController.obtenerPlanesEntrega);
entregaRouter.get('/entrega-por-plan/:id_plan_entrega', EntregaController.obtenerEntregasPorPlan);
entregaRouter.get('/fechas/:id_usuario', EntregaController.obtenerFechaLimite);
export default entregaRouter;
