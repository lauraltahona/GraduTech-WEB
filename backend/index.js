import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { corsMiddleware } from './middleware/cors.js';
import { fileUploadMiddleware } from './middleware/fileUpload.js';
import { authMiddleware } from './middleware/auth.js';
import cookieParser from 'cookie-parser';

import studentRouter from './routes/student-router.js';
import teacherRouter from './routes/teacher-router.js';
import userRouter from './routes/user-router.js';
import fileRouter from './routes/file-router.js';
import proyectRouter from './routes/proyect-router.js';
import entregaRouter from './routes/entrega-router.js';
import juryRouter from './routes/jury-router.js';
import emailRouter from './routes/email-router.js';
import { syncModels } from './shared/schemas.js';

import { PORT } from './config.js';
import { Connect } from './db.js';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(corsMiddleware);
app.use(fileUploadMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);

Connect()

app.use('/estudiante', studentRouter);
app.use('/docente', teacherRouter);
app.use('/usuario', userRouter);
app.use('/upload', fileRouter);
app.use('/files', express.static(path.join(__dirname, 'uploads')));
app.use('/proyectos', proyectRouter);
app.use('/entrega', entregaRouter);
app.use('/jurado', juryRouter);
app.use('/email', emailRouter);
app.use(express.static(path.join(__dirname, '../frontend')));



app.listen(PORT, ()=>{
    console.log(`escuchando puerto en http://localhost:${PORT}`);
})