import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { corsMiddleware } from './middleware/cors.js';
import { fileUploadMiddleware } from './middleware/fileUpload.js';

import studentRouter from './routes/student-router.js';
import teacherRouter from './routes/teacher-router.js';
import userRouter from './routes/user-router.js';
import fileRouter from './routes/file-router.js';

import { PORT } from './config.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(corsMiddleware);
app.use(fileUploadMiddleware);
app.use(express.json());

app.use('/estudiante', studentRouter);
app.use('/docente', teacherRouter);
app.use('/usuario', userRouter);
app.use('/upload', fileRouter);
app.use('/files', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend')));


app.listen(PORT, ()=>{
    console.log(`escuchando puerto en http://localhost:${PORT}`);
})