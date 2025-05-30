import { AuditoriaController } from "../controller/auditoria-controller.js";
import { Router } from "express";

const auditoriaRouter = Router();

auditoriaRouter.get('/getAll', AuditoriaController.getAuditorias);

export default auditoriaRouter;