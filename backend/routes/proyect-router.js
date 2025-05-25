import { Router } from "express";
import { ProyectController } from "../controller/proyect-controller.js";

const proyectRouter = Router();

proyectRouter.post('/', ProyectController.createProyect);
proyectRouter.get('/asignados/:id_usuario', ProyectController.getProyectosAsignados);
proyectRouter.get('/asignados/jurado/:id_usuario', ProyectController.getProyectosAsignadosJurado);
proyectRouter.get('/obtener/:id_usuario', ProyectController.obtenerProyectos);
proyectRouter.get('/sin-docente', ProyectController.obtenerProyectosSinDocente);
proyectRouter.patch('/asignar-docente', ProyectController.asignarDocente);
proyectRouter.get('/sin-jurado', ProyectController.obtenerProyectosSinJurado);
proyectRouter.patch('/asignar-jurado', ProyectController.asignarJurado);
proyectRouter.patch('/cambiar-estado', ProyectController.cambiarEstado);
export default proyectRouter;