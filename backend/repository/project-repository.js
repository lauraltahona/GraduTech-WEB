import Project from '../models/proyect-model.js';
import Student from '../models/student-model.js';   
import User from '../models/user-model.js';
import { db } from '../db.js';
import { Op, where } from "sequelize";


export class ProjectRepository {
  // Crear proyecto 
  static async createProject({ title, tipo, rutaDocumento, idEstudiante }) {
    const t = await Project.sequelize.transaction();
    try {

      const user = await User.findOne({
        where: {cedula: idEstudiante},
      } , { transaction: t });

      const student = await Student.findOne({
        where: {idUser: user.idUsers}, 
      } , { transaction: t });
      
      //verificar si el titulo o el estudiante ya tienen un proyecto
      const existingProject = await Project.findOne({
        where: {
          [Op.or]: [
            { title },
            { idEstudiante: student.idEstudiante }
          ]
        },
      }, { transaction: t });

      if (existingProject) {
        throw new Error("Ya existe un proyecto con el mismo título o estudiante");
      }

      const nuevoProyecto = await Project.create({
        title,
        tipo,
        estado: "PENDIENTE",
        rutaDocumento,
        idEstudiante: student.idEstudiante
      });

      await t.commit();
      return nuevoProyecto;
    } catch (error) {
      if (!t.finished){
        await t.rollback();
      }
      throw new Error("Error al registrar proyecto: " + error.message);
    }
  }

  // Obtener proyecto por id_usuario
  static async obtenerProyecto(idUser) {
    console.log("Model - idUser recibido:", idUser);
    
    try {
      const student = await Student.findOne({ where: { idUser } });

      if (!student) throw new Error("No se encontró un estudiante con ese usuario.");
      console.log(student);
      const nombre = student.nombre;
      
      const proyecto = await Project.findOne({
        where: { idEstudiante: student.idEstudiante },
        attributes: ["idProyecto", "title", "estado", "rutaDocumento", "idEstudiante", "updatedAt", "descripcion", "idDocente", "idJurado"]
      });

      return proyecto;
    } catch (error) {
      throw new Error("Error al obtener proyecto: " + error.message);
    }
  }
  
  static async obtenerProyectosAsignados(id_usuario) {
    try {
      // Obtener idDocente
      const docenteResult = await db.query(
        "SELECT idDocente FROM teachers WHERE idUser = $1",
        [id_usuario]
      );

      if (docenteResult.rows.length === 0) {
        throw new Error("No se encontró un docente con ese usuario.");
      }

      const id_docente = docenteResult.rows[0].idDocente;

      // Consultar proyectos asignados
      const result = await db.query(`
        SELECT 
          p.idProyecto, 
          p.title AS titulo, 
          p.estado, 
          u.nombre AS estudiante,
          u.correo AS correo
        FROM projects p
        JOIN students s ON s.idEstudiante = p.idEstudiante
        JOIN users u ON u.idUsers = s.idUser
        WHERE p.idDocente = $1
      `, [id_docente]);

      console.log(result.rows);
      return result.rows;
    } catch (error) {
      throw new Error("Error al obtener proyectos asignados: " + error.message);
    }
  }

  static async asignarDocenteAProyecto(title, cedulaDocente) {

    try{
      const proyecto = await Project.findOne({where: {title: title}});
      if (!proyecto) {
        throw new Error("No se encontró un proyecto con ese título.");
      }

      const docente = await Teacher.findOne({
        include:[{
          model: User,
          where: {cedula: cedulaDocente}
        }]
      });

      if(!docente){
        throw new Error("No se encontró un docente con esa cédula.");
      }

      proyecto.idDocente = docente.idDocente;
      await proyecto.save();
      return proyecto;
    } catch (error) {
      throw new Error("Error al asignar docente: " + error.message);
    }
  }

  static async asignarJuradoAProyecto(title, cedulaJurado) {
    try{
      const proyecto = await Project.findOne({where: {title: title}});
      if (!proyecto) {
        throw new Error("No se encontró un proyecto con ese título.");
      }

      const jurado = await Jury.findOne({
        include: [{
          model: User,
          where: {cedula: cedulaJurado}
        }]
      });

      if(!jurado){
        throw new Error("No se encontró un jurado con esa cédula.");
      }

      proyecto.idJurado = jurado.idJurado;
      await proyecto.save();
      return proyecto;

    } catch (error) {
      throw new Error("Error al asignar jurado: " + error.message);
    }
  }

}
