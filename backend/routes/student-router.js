import express from 'express';
import { Router } from 'express';
import { StudentController } from '../controller/student-controller.js';

const studentRouter = Router();

studentRouter.post('/', StudentController.createStudent);


export default studentRouter;