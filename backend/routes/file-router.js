import { Router } from 'express';
import { uploadFileController } from '../controller/file-controller.js';

const fileRouter = Router();

fileRouter.post('/', uploadFileController);

export default fileRouter;
