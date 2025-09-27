import { Router } from 'express';
import { UserController } from '../controller/user-controller.js';

const userRouter = Router();

userRouter.post('/login', UserController.login);
userRouter.post('/register', UserController.createUser);

export default userRouter;