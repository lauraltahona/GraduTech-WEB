import { EntregaController } from "../controller/entrega-controller.js";
import { Router } from "express";

const entregaRouter = Router();

entregaRouter.post('/planear', EntregaController.crearPlanEntrega);
entregaRouter.get('/asignadas/:id_usuario', EntregaController.obtenerEntregasEstudiante);
entregaRouter.post('/subir', EntregaController.subirEntrega);

export default entregaRouter;
