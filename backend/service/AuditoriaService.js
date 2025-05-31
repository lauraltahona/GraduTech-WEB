import { db } from "../db.js";

export class AuditoriaService{
    static async getAuditorias() {
        const connection = await db.getConnection();
        try {
            const [rows] = await connection.query(`
                SELECT * FROM auditoria_entregas
            `);
            await connection.commit();
            return rows;
        } catch (error) {
            throw new Error("Error al obtener auditoría de entregas: " + error.message);
        } finally {
            connection.release();
        }
    }

    
}