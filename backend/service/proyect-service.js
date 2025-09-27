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
        console.log('estoy en service: ',title, cedulaDocente);
        
        const proyecto = await ProjectRepository.asignarDocenteAProyecto(title, cedulaDocente);
        return proyecto;
    }
    
    static async asignarJuradoAProyecto(title, cedulaJurado) {
        const proyecto = await ProjectRepository.asignarJuradoAProyecto(title, cedulaJurado);
        return proyecto;
    }

    static async autorizacionRepositorio(idProyecto, aprobacion){
        console.log('estoy en service', aprobacion);
        
        const proyecto = await Project.findByPk(idProyecto);
        if (!proyecto) {
            throw new Error("Proyecto no encontrado");
        }
        
        proyecto.autorizacion_repositorio = aprobacion;

        await proyecto.save();
        return proyecto;
    }

    static async cambiarEstado(idProyecto, estado){
        const proyecto = await Project.findByPk(idProyecto);
        if (!proyecto) {
            throw new Error("Proyecto no encontrado");
        }
         proyecto.estado = estado;
         await proyecto.save();
         return proyecto;
    }

    static async listarProyectosSinDocente() {
        const proyectos = await Project.findAll({
            where: { idDocente: null },
            include: [{ model: Student }],
        });
        console.log(proyectos);
        
        return proyectos.map(p => ({
            id: p.idProyecto,
            title: p.title,
            carrera: p.student?.carrera,
        }));
    }

    static async listarProyectosSinJurado() {
        const proyectos = await Project.findAll({
            where: { idJurado: null },
            include: [{ model: Student }],
        });
        
        return proyectos.map(p => ({
            id: p.idProyecto,
            title: p.title,
            estado: p.estado,
            carrera: p.student?.carrera,
        }));
    }

    static async mostrarProyectosPorTipo(tipo){
        console.log(tipo);
        
        try {
            const projects = await Project.findAll({
            where: {
                tipo: tipo,
                estado: 'APROBADO',
                autorizacion_repositorio: 'SI'
            },
            include: [
                {
                    model: Student,
                    attributes: ['carrera']
                }
            ]
            });
            console.log(projects);
            
            return projects;
        } catch (error) {
            
        }
    }

    static async obtenerProyectosAsignadosJurados(id_usuario) {

      const connection = await db.getConnection();
      try {
        
        const [juradoResult] = await connection.query(
          "SELECT idJurado FROM jurys WHERE idUser = ?", 
          [id_usuario]
        );

        console.log(juradoResult);
        

        if (juradoResult.length === 0) {
          throw new Error("No se encontró un jurado con ese usuario.");
        }
        const id_jurado = juradoResult[0].idJurado;
        const [rows] = await connection.query(`
          SELECT 
              p.idProyecto, 
              p.title AS titulo, 
              p.tipo AS tipo,
              p.estado, 
              u.nombre AS estudiante,
              u.correo AS correo,
              p.rutaDocumento AS rutaDocumento
          FROM projects p
          JOIN students s ON s.idEstudiante = p.idEstudiante
          JOIN users u ON u.idUsers = s.idUser
          WHERE p.idJurado = ?
        `, [id_jurado]);
        await connection.commit();
        
        return rows;
      } catch (error) {
        throw new Error("Error al obtener proyectos asignados: " + error.message);
      } finally {
        connection.release();
      }
    }
 }
