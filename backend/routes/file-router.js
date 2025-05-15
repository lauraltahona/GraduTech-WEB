import { Router } from 'express';
import { uploadFileController } from '../controller/file-controller.js';

const fileRouter = Router();

fileRouter.post('/', uploadFileController.upload);

export default fileRouter;
