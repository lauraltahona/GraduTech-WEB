import { EmailController } from "../controller/EmailController.js";
import { Router } from "express";

const emailRouter = Router();

emailRouter.post('/programar', EmailController.programarReunión);

export default emailRouter;