import { EntregaController } from "../controller/entrega-controller.js";
import { Router } from "express";

const entregaRouter = Router();

/**
 * Para la semantica de las rutas es mejor utilizar cosas simples por ejemplo tener una variavle
 * como "const BASE_URL:"/api/v1""
 * y luego que todas las rutas se colocan simples por semantica es decir 
 * entregaRouter.post(`${BASE_URL}/`, EntregaController.crearPlanEntrega);
 */

entregaRouter.post('/planear', EntregaController.crearPlanEntrega);
entregaRouter.get('/asignadas/:id_usuario', EntregaController.obtenerEntregasEstudiante);
entregaRouter.post('/subir', EntregaController.subirEntrega);
entregaRouter.get('/proyecto/:id_proyecto', EntregaController.obtenerPlanesEntrega);
entregaRouter.get('/entrega-por-plan/:id_plan_entrega', EntregaController.obtenerEntregasPorPlan);
entregaRouter.get('/fechas/:id_usuario', EntregaController.obtenerFechaLimite);
entregaRouter.patch('/:idEntrega/retroalimentacion', EntregaController.comentarRetroalimentación);

entregaRouter.post('/email',EntregaController.EmailsSend)

export default entregaRouter;
