import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { corsMiddleware } from './middleware/cors.js';
import { fileUploadMiddleware } from './middleware/fileUpload.js';
import { authMiddleware } from './middleware/auth.js';
import { securityHeadersMiddleware } from './middleware/securityHeaders.js';
import cookieParser from 'cookie-parser';

import studentRouter from './routes/student-router.js';
import teacherRouter from './routes/teacher-router.js';
import userRouter from './routes/user-router.js';
import fileRouter from './routes/file-router.js';
import proyectRouter from './routes/proyect-router.js';
import entregaRouter from './routes/entrega-router.js';
import juryRouter from './routes/jury-router.js';
import emailRouter from './routes/email-router.js';
import auditoriaRouter from './routes/auditoria-router.js';
import cloudinaryRouter from './routes/cloudinary-router.js';

import './models/index.js';

import { PORT } from './config.js';
import { Connect } from './db.js';


const app = express();

// 🔒 PASO 1 - Deshabilitar headers peligrosos
app.disable('x-powered-by');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔒 PASO 2 - Middleware de seguridad ANTES que TODO
app.use(securityHeadersMiddleware);

// 🔒 PASO 3 - CORS ANTES de archivos estáticos
app.use(corsMiddleware);

// PASO 4 - Otros middlewares
app.use(fileUploadMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);

// PASO 5 - Archivos estáticos DESPUÉS de middlewares de seguridad
app.use('/files', express.static(path.join(process.cwd(), 'uploads')));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend')));

// PASO 6 - Rutas de API
app.use('/estudiante', studentRouter);
app.use('/docente', teacherRouter);
app.use('/usuario', userRouter);
app.use('/upload', fileRouter);
app.use('/cloudinary', cloudinaryRouter);
app.use('/proyectos', proyectRouter);
app.use('/entrega', entregaRouter);
app.use('/jurado', juryRouter);
app.use('/email', emailRouter);
app.use('/auditoria', auditoriaRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Project Management API' });
});

// Exportar app para pruebas
export { app };

const start = async () => {
  await Connect();
  const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
};

start();