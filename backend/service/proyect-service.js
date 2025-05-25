import { Project, Student } from "../shared/schemas.js";
import { db } from "../db.js";

 export class ProjectService{
    static async asignarDocenteAProyecto(title, idDocente) {
        console.log('ESTOY EN MODEL:', title, idDocente);
        
        // Validar que el proyecto existe
        const proyecto = await Project.findOne({ where: { title } });
        if (!proyecto) {
            throw new Error("Proyecto no encontrado");
        }

        // Asignar el docente
        proyecto.idDocente = idDocente;

        // Guardar cambios
        await proyecto.save();

        return proyecto;
    }
    
    static async asignarJuradoAProyecto(title, idJurado) {
        console.log('ESTOY EN MODEL:', title, idJurado);
        
        // Validar que el proyecto existe
        const proyecto = await Project.findOne({ where: { title } });
        if (!proyecto) {
            throw new Error("Proyecto no encontrado");
        }

        // Asignar el docente
        proyecto.idJurado = idJurado;

        // Guardar cambios
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
        console.log(proyectos);
        
        return proyectos.map(p => ({
            id: p.idProyecto,
            title: p.title,
            estado: p.estado,
            carrera: p.student?.carrera,
        }));
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
