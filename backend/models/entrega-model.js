import { db } from "../db.js";

export class EntregaModel{
    static async crearPlanEntrega({ id_proyecto, nro_entrega, titulo, descripcion, fecha_limite }) {
        const connection = await db.getConnection();
        try{
            await connection.beginTransaction();
            await connection.query(
            `INSERT INTO PlanEntrega (id_proyecto, nro_entrega, titulo, descripcion, fecha_limite) VALUES (?, ?, ?, ?, ?)`,
            [id_proyecto, nro_entrega, titulo, descripcion, fecha_limite]);

            await connection.commit();
            return {id_proyecto, nro_entrega, titulo, descripcion, fecha_limite}
        } catch(error){
            await connection.rollback();
            throw new Error('Error al registrar plan de entrega' + error)
        } finally {
            connection.release();
        }
    }

    static async obtenerPlanesPorProyecto(id_proyecto) {
        const sql = `SELECT * FROM PlanEntrega WHERE id_proyecto = ?`;
        const [result] = await db.execute(sql, [id_proyecto]);
        return result;
    }

    static async obtenerEntregasPorEstudiante(id_usuario) {
        const connection = await db.getConnection();

        const [studentResult] = await connection.query(
        `SELECT id_estudiante FROM Estudiante WHERE id_usuario = ?`, 
        [id_usuario]
        );

        if (studentResult.length === 0) {
            throw new Error("No se encontró un estudiante con ese usuario.");
        }
        const id_estudiante = studentResult[0].id_estudiante;
        
        const [rows] = await connection.query(`
            SELECT 
            pe.id_plan_entrega, 
            pe.nro_entrega, 
            pe.titulo, 
            pe.descripcion, 
            pe.fecha_limite
            FROM PlanEntrega pe
            JOIN Proyecto p ON pe.id_proyecto = p.id_proyecto
            WHERE p.id_estudiante = ?`, [id_estudiante]
        );
        await connection.commit();
        console.log(rows);
        
        return rows;
    }

    static async subirEntrega({id_plan_entrega, id_usuario, ruta_documento, descripcion}){
        const connection = db.getConnection();
        const [studentResult] = await connection.query(
            `SELECT id_estudiante FROM Estudiante WHERE id_usuario = ?`, 
            [id_usuario]
            );

        if (studentResult.length === 0) {
            throw new Error("No se encontró un estudiante con ese usuario.");
        }
        const id_estudiante = studentResult[0].id_estudiante;


        try{
            await connection.beginTransaction();

            const [[{ fecha_limite }]] = await connection.query(
                `SELECT fecha_limite FROM PlanEntrega WHERE id_plan_entrega = ?`,
                [id_plan_entrega]
            );  
            

            const dateNow = new Date();
            const limite = fecha_limite;

            if(dateNow > limite){
                throw new Error('La fecha limite expiró');
            }

            await connection.query(
                `INSERT INTO Entrega(id_plan_entrega, id_estudiante, fecha_envio, ruta_documento, descripcion) VALUES (?, ?, NOW(), ?, ?)`,
                [id_plan_entrega, id_estudiante, ruta_documento, descripcion]
            );

            await connection.commit();
            return { success: true };
        } catch(error){
            await connection.rollback();
            throw new Error("Error al registrar entrega" + error);
        } finally {
            connection.release();
        }
    }

}