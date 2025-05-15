import { Router } from "express";
import { ProyectController } from "../controller/proyect-controller.js";

const proyectRouter = Router();

proyectRouter.post('/', ProyectController.createProyect);
proyectRouter.get('/asignados/:id_docente', ProyectController.getProyectosAsignados);

export default proyectRouter;