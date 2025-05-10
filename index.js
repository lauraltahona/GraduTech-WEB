import express from 'express';
import { corsMiddleware } from './middleware/cors.js';
import studentRouter from './routes/student-router.js';
import teacherRouter from './routes/teacher-router.js';

const app = express();
const port = 5001;

app.use(corsMiddleware);
app.use(express.json());
app.use('/estudiante', studentRouter);
app.use('/docente', teacherRouter);

app.get("/",(req,res)=>{
res.send("hola mundo")
})

app.listen(port, ()=>{
    console.log(`escuchando puerto en http://localhost:${port}`);
})