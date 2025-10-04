import Student from "../models/student-model.js";
import Project from "../models/proyect-model.js";
import { ProjectRepository } from "../repository/project-repository.js";
import { db } from "../db.js";

 export class ProjectService{
    static async createProject({ title, tipo, rutaDocumento, idEstudiante }) {
        const project = await ProjectRepository.createProject({ title, tipo, rutaDocumento, idEstudiante });
        return project;
    }
    
    static async obtenerProyecto(idUser){
        const project = await ProjectRepository.obtenerProyecto(idUser);
        return project;
    }

    static async obtenerProyectosAsignados(id_usuario) {
        const proyectos = await ProjectRepository.obtenerProyectosAsignados(id_usuario);
        return proyectos;
    }
    
    static async asignarDocenteAProyecto(title, cedulaDocente) {
        const proyecto = await ProjectRepository.asignarDocenteAProyecto(title, cedulaDocente);
        return proyecto;
    }
    
    static async asignarJuradoAProyecto(title, cedulaJurado) {
        const proyecto = await ProjectRepository.asignarJuradoAProyecto(title, cedulaJurado);
        return proyecto;
    }

    static async autorizacionRepositorio(idProyecto, aprobacion){
        const proyecto = await ProjectRepository.autorizacionRepositorio(idProyecto, aprobacion);
        return proyecto;
    }

    static async cambiarEstado(idProyecto, estado){
        const proyecto = await ProjectRepository.cambiarEstado(idProyecto, estado);
        return proyecto;
    }

    static async listarProyectosSinDocente() {
        const proyectos = await ProjectRepository.listarProyectosSinDocente();
        return proyectos;
    }

    static async listarProyectosSinJurado() {
        const proyectos = await ProjectRepository.listarProyectosSinJurado();
        return proyectos;
    }

    static async mostrarProyectosPorTipo(tipo){
        const proyectos = await ProjectRepository.mostrarProyectosPorTipo(tipo);
        return proyectos;
    }

    static async obtenerProyectosAsignadosJurados(id_usuario) {
        const proyectos = await ProjectRepository.obtenerProyectosAsignadosJurados(id_usuario);
        return proyectos;
    }
 }
