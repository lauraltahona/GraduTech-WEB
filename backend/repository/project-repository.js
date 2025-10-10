import Project from '../models/proyect-model.js';
import Student from '../models/student-model.js';
import User from '../models/user-model.js';
import Teacher from '../models/teacher-model.js';
import Jury from '../models/jury-model.js';
import { db } from '../db.js';
import { Op, where } from "sequelize";


export class ProjectRepository {
  // Crear proyecto 
  static async createProject({ title, tipo, rutaDocumento, idEstudiante }) {
    console.log('estoy en repository: ',title, tipo, rutaDocumento, idEstudiante);
    
    const t = await Project.sequelize.transaction();
    try {

      const user = await User.findOne({
        where: { cedula: idEstudiante },
      }, { transaction: t });

      const student = await Student.findOne({
        where: { idUser: user.idUsers },
      }, { transaction: t });

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
      if (!t.finished) {
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
        `SELECT "idDocente" FROM teachers WHERE "idUser" = $1`,
        [id_usuario]
      );

      if (docenteResult.rows.length === 0) {
        throw new Error("No se encontró un docente con ese usuario.");
      }

      const id_docente = docenteResult.rows[0].idDocente;

      // Consultar proyectos asignados
      const result = await db.query(`
        SELECT 
          p."idProyecto",
          p.title AS titulo,
          p.estado, 
          u.nombre AS estudiante,
          u.correo AS correo
        FROM projects p
        JOIN students s ON s."idEstudiante" = p."idEstudiante" 
        JOIN users u ON u."idUsers" = s."idUser"
        WHERE p."idDocente" = $1
      `, [id_docente]);
      //no es recomendable usar mayusculas en nombres de columnas en Postgre,
      //dado esto, se le ponen comillas a los nombres en las sentencias
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.log(error);

      throw new Error("Error al obtener proyectos asignados: " + error.message);
    }
  }

  static async asignarDocenteAProyecto(title, idDocente) {

    try {
      console.log('estoy en repositorio: ', title, idDocente);

      const proyecto = await Project.findOne({ where: { title: title } });
      if (!proyecto) {
        throw new Error("No se encontró un proyecto con ese título.");
      }

      const docente = await Teacher.findByPk(idDocente)
      console.log(docente);
      if (!docente) {
        throw new Error("No se encontró un docente con esa id.");
      }

      proyecto.idDocente = idDocente;
      proyecto.estado = 'EN REVISIÓN';
      await proyecto.save();
      return proyecto;
    } catch (error) {
      throw new Error("Error al asignar docente: " + error.message);
    }
  }

  static async asignarJuradoAProyecto(title, idJurado) {
    try {
      const proyecto = await Project.findOne({ where: { title: title } });

      if (!proyecto) {
        throw new Error("No se encontró un proyecto con ese título.");
      }

      const jurado = await Jury.findByPk(idJurado)
      if (!jurado) {
        throw new Error("No se encontró un jurado con esa cédula.");
      }

      proyecto.idJurado = idJurado;
      await proyecto.save();
      return proyecto;

    } catch (error) {
      throw new Error("Error al asignar jurado: " + error.message);
    }
  }

  static async autorizacionRepositorio(idProyecto, aprobacion) {
    const proyecto = await Project.findByPk(idProyecto);
    if (!proyecto) {
      throw new Error("Proyecto no encontrado");
    }

    proyecto.autorizacion_repositorio = aprobacion;

    await proyecto.save();
    return proyecto;
  }

  static async cambiarEstado(idProyecto, estado) {
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
    })

    return proyectos.map(p => ({
      id: p.idProyecto,
      title: p.title,
      estado: p.estado,
      carrera: p.student?.carrera,
    }));
  }

  static async listarProyectosSinJurado() {
    const proyectos = await Project.findAll({
      where: { idJurado: null },
      include: [{ model: Student }],
    })
    return proyectos.map(p => ({
      id: p.idProyecto,
      title: p.title,
      estado: p.estado,
      carrera: p.student?.carrera,
    }));
  }

  static async mostrarProyectosPorTipo(tipo) {
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
    try {

      const juradoResult = await db.query(
        `SELECT "idJurado" FROM juries WHERE "idUser" = $1`,
        [id_usuario]
      );
      
      if (juradoResult.length === 0) {
        throw new Error("No se encontró un jurado con ese usuario.");
      }
      const id_jurado = juradoResult.rows[0].idJurado;
      
      const rows = await db.query(`
          SELECT 
              p."idProyecto", 
              p.title AS titulo, 
              p.tipo AS tipo,
              p.estado, 
              u.nombre AS estudiante,
              u.correo AS correo,
              p."rutaDocumento" AS "rutaDocumento"
          FROM projects p
          JOIN students s ON s."idEstudiante" = p."idEstudiante"
          JOIN users u ON u."idUsers" = s."idUser"
          WHERE p."idJurado" = $1
        `, [id_jurado]);

      return rows.rows;
    } catch (error) {
      throw new Error("Error al obtener proyectos asignados: " + error.message);
    } 
  }
}
