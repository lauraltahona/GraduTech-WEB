import { Router } from "express";
import { JuryController } from "../controller/jury-controller.js";

const juryRouter = Router();

juryRouter.post('/', JuryController.createJury);

export default juryRouter;