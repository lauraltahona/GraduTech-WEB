// routes/cloudinary-router.js
import express from 'express';
import { subirArchivoCloudinary } from '../controller/cloudinary-controller.js';

const router = express.Router();

router.post('/upload', subirArchivoCloudinary);

export default router;
