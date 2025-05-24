import { Router } from 'express';
import { TeacherController } from '../controller/teacher-controller.js';
const teacherRouter = Router();

teacherRouter.post('/', TeacherController.createTeacher);
teacherRouter.get('/docentes-disponibles', TeacherController.obtenerDocentesDisponibles);
teacherRouter.get('/obtener', TeacherController.getAllTeacher);
teacherRouter.get('/id=/:idDocente', TeacherController.getTeacherById);
teacherRouter.delete('/eliminar', TeacherController.deleteTeacher);

export default teacherRouter;