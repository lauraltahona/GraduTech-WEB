import express from 'express';
import { Router } from 'express';
import { TeacherController } from '../controller/teacher-controller.js';

const teacherRouter = Router();

teacherRouter.post('/', TeacherController.createTeacher);

export default teacherRouter;