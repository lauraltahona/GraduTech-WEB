import { db } from "../db.js";

export class EntregaModel{
    static async crearPlanEntrega(id_proyecto, nro_entrega, titulo, descripcion, fecha_limite ) {
        
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
        return rows;
    }

    static async subirEntrega(id_plan_entrega, id_usuario, ruta_documento, descripcion ) {

        const connection = await db.getConnection();

        const [studentResult] = await connection.query(
            `SELECT id_estudiante FROM Estudiante WHERE id_usuario = ?`,
            [id_usuario]
        );

        if (studentResult.length === 0) {
            throw new Error("No se encontró un estudiante con ese usuario.");
        }

        const id_estudiante = studentResult[0].id_estudiante;

        try {
            await connection.beginTransaction();
            
            const [planResult] = await connection.query(
                `SELECT fecha_limite FROM PlanEntrega WHERE id_plan_entrega = ?`,
                [id_plan_entrega]
            );

            if (planResult.length === 0) {
                throw new Error("No se encontró el plan de entrega.");
            }

            const fecha_limite = new Date(planResult[0].fecha_limite);

            // 3. Validar fecha límite
            const dateNow = new Date();
            if (dateNow > fecha_limite) {
                throw new Error('La fecha límite expiró.');
            }

            // 5. Insertar entrega
            await connection.query(
                `INSERT INTO Entrega(id_plan_entrega, id_estudiante, fecha_envio, ruta_documento, descripcion) 
                VALUES (?, ?, NOW(), ?, ?)`,
                [id_plan_entrega, id_estudiante, ruta_documento, descripcion]
            );

            await connection.commit();
            return { success: true };
        } catch (error) {
            await connection.rollback();
            throw new Error("Error al registrar entrega: " + error.message);
        } finally {
            connection.release();
        }
    }


    static async obtenerPlanesEntrega(id_proyecto){
        const connection = await db.getConnection();
        try {
        const [rows] = await connection.query(
            "SELECT * FROM PlanEntrega WHERE id_proyecto = ?",
            [id_proyecto]
        );
        await connection.commit();
        return rows;
        } catch (error) {
            console.error("Error al obtener entregas por proyecto:", error);
        }
    }

    static async obtenerEntregasPorPlan(id_plan_entrega) {
        const connection = await db.getConnection();
        try{
            const [rows] = await connection.query(`
                SELECT E.id_entrega, E.fecha_envio, E.ruta_documento, E.descripcion, E.id_estudiante
                FROM Entrega E
                JOIN PlanEntrega PE ON E.id_plan_entrega = PE.id_plan_entrega
                WHERE PE.id_plan_entrega = ?`, [id_plan_entrega]
            );

            await connection.commit();
            return rows;
        } catch(error){
            console.log('Error al obtener consulta de entregas', error);
        }
        
    }
    static async obtenerFechaLimite(id_usuario){
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
            const [fechas] = await connection.query(`
                SELECT pe.fecha_limite, pe.titulo 
                FROM PlanEntrega pe
                INNER JOIN Proyecto p ON pe.id_proyecto = p.id_proyecto
                WHERE p.id_estudiante = ?`, [id_estudiante]
            );
            await connection.commit();
            return fechas;
        } catch(error){
            console.log('Error en conslta de fecha', error);
            
        }
    } 
}