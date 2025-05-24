import express from 'express';
import { Router } from 'express';
import { StudentController } from '../controller/student-controller.js';

const studentRouter = Router();

studentRouter.post('/', StudentController.createStudent);
studentRouter.get('/getAll', StudentController.getAllStudents);
studentRouter.get('/id=/:idEstudiante', StudentController.getStudentById);
studentRouter.delete('/eliminar/:idEstudiante', StudentController.deleteStudent);


export default studentRouter;