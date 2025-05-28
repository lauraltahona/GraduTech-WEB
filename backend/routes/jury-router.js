import { Router } from "express";
import { JuryController } from "../controller/jury-controller.js";

const juryRouter = Router();

juryRouter.post('/', JuryController.createJury);
juryRouter.get('/getAll', JuryController.getAllJurys);
juryRouter.get('/getById/:idJurado', JuryController.getById);

export default juryRouter;