import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import studentRouter from './routes/student-router.js';
import teacherRouter from './routes/teacher-router.js';
import { PORT } from './config.js';
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use('/estudiante', studentRouter);
app.use('/docente', teacherRouter);


app.listen(PORT, ()=>{
    console.log(`escuchando puerto en http://localhost:${PORT}`);
})