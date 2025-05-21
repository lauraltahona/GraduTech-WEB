import { Teacher, User, Project, Student } from '../shared/schemas.js';
import { db } from '../db.js';

export class ProyectModel {
  // Crear proyecto
  static async createProyect({ title, tipo, rutaDocumento, idEstudiante }) {
    try {
      const existingProyect = await Project.findOne({ where: { title } });
      if (existingProyect) throw new Error("El título ya existe");

      const studentProject = await Project.findOne({ where: { idEstudiante } });
      if (studentProject) throw new Error("El estudiante ya tiene un proyecto registrado");

      const nuevoProyecto = await Project.create({
        title,
        tipo,
        estado: "EN REVISIÓN",
        rutaDocumento,
        idEstudiante
      });
      console.log(nuevoProyecto);
 
      return nuevoProyecto;
    } catch (error) {
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
      
      const proyecto = await Project.findOne({
        where: { idEstudiante: student.idEstudiante },
        attributes: ["idProyecto", "title", "estado", "rutaDocumento", "idEstudiante"]
      });

      return proyecto;
    } catch (error) {
      throw new Error("Error al obtener proyecto: " + error.message);
    }
  }

  // Obtener proyectos asignados a un docente por id_usuario
  // Definir asociaciones con alias (esto en la definición de modelos)

  // Función corregida
  static async obtenerProyectosAsignados(id_usuario) {

      const connection = await db.getConnection();
      try {
        
        const [docenteResult] = await connection.query(
          "SELECT idDocente FROM teachers WHERE idUser = ?", 
          [id_usuario]
        );

        if (docenteResult.length === 0) {
          throw new Error("No se encontró un docente con ese usuario.");
        }
        const id_docente = docenteResult[0].idDocente;
        const [rows] = await connection.query(`
          SELECT 
              p.idProyecto, 
              p.title AS titulo, 
              p.estado, 
              u.nombre AS estudiante
          FROM projects p
          JOIN students s ON s.idEstudiante = p.idEstudiante
          JOIN users u ON u.idUsers = s.idUser
          WHERE p.idDocente = ?
        `, [id_docente]);
        await connection.commit();
        return rows;
      } catch (error) {
        throw new Error("Error al obtener proyectos asignados: " + error.message);
      } finally {
        connection.release();
      }
    }


}
