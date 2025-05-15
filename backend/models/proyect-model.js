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

  static async obtenerProyectosAsignados(id_docente) {
    const connection = await db.getConnection();
    try {
      const [rows] = await connection.query(`
        SELECT 
          p.id_proyecto,
          p.titulo,
          p.estado,
          e.nombre AS estudiante
        FROM Proyecto p
        JOIN Estudiante e ON e.id_estudiante = p.id_estudiante
        JOIN ProyectoDocente pd ON pd.id_proyecto = p.id_proyecto
        WHERE pd.id_docente = ?
      `, [id_docente]);

      return rows;
    } catch (error) {
      throw new Error("Error al obtener proyectos asignados: " + error.message);
    } finally {
      connection.release();
    }
  }
}