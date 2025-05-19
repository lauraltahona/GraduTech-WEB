import { db } from "../db.js";

export class ProyectModel{
    static async createProyect({titulo, tipo, ruta_documento, id_estudiante }){
        const connection = await db.getConnection();

        try{
            await connection.beginTransaction();

            const [existingProyect] = await connection.query(
                'SELECT titulo FROM Proyecto WHERE titulo = ?', [titulo]
            );

            const [existingStudent] = await connection.query(
                'SELECT id_estudiante FROM Proyecto WHERE id_estudiante = ?', [id_estudiante]
            );

            if(existingProyect.length > 0) { throw new Error('El titulo ya existe');}
            if(existingStudent.length > 0) { throw new Error('El estudiante ya tiene un proyecto registrado') }

            await connection.query(
                'INSERT INTO Proyecto(titulo, tipo, estado, ruta_documento, id_estudiante) VALUES (?, ?, ?, ?, ?)',
                [titulo, tipo, 'EN REVISIÓN', ruta_documento, id_estudiante]
            );
            await connection.commit();
            return {titulo, tipo, id_estudiante, ruta_documento}
        }catch(error){
            await connection.rollback();
            throw new Error('Error al registrar proyecto' + error)
        } finally {
            connection.release();
        }
    }

    static async obtenerProyecto(id_usuario) {
      const connection = await db.getConnection();
      const [studentResult] = await connection.query(
            `SELECT id_estudiante FROM Estudiante WHERE id_usuario = ?`,
            [id_usuario]
        );

        if (studentResult.length === 0) {
            throw new Error("No se encontró un estudiante con ese usuario.");
        }

      const id_estudiante = studentResult[0].id_estudiante;
      try{
        const [proyecto] =  await connection.query(`
          SELECT id_proyecto, titulo,estado, ruta_documento, id_estudiante FROM Proyecto WHERE id_estudiante = ?`,
          [id_estudiante]
        );
        await connection.commit();
        return proyecto;
      }catch (error){
        console.log('error con consulta del proyecto', error);
        
      }
    }
    static async obtenerProyectosAsignados(id_usuario) {

      const connection = await db.getConnection();
      try {
        
        const [docenteResult] = await connection.query(
        `SELECT id_docente FROM Docente WHERE id_usuario = ?`, 
        [id_usuario]
        );

        if (docenteResult.length === 0) {
          throw new Error("No se encontró un docente con ese usuario.");
        }
        const id_docente = docenteResult[0].id_docente;
        const [rows] = await connection.query(`
          SELECT 
            p.id_proyecto,
            p.titulo,
            p.estado,
            u.nombre AS estudiante
          FROM Proyecto p
          JOIN Estudiante e ON e.id_estudiante = p.id_estudiante
          JOIN Usuario u ON u.id_usuario = e.id_usuario
          WHERE p.id_docente = ?
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