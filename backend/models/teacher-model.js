import { db } from "../db.js";

export class TeacherModel{
    static async createTeacher({id_docente, profesion, disponibilidad, usuario}){
        const connection = await db.getConnection();

        try{
            await connection.beginTransaction();

            //insertar usuario
            const [userResult] = await connection.query(
                'INSERT INTO Usuario(nombre, correo, contraseña, id_rol) VALUES (?, ?, ?, ?)',
                [usuario.nombre, usuario.correo, usuario.contraseña, 2]
            );
            const id_usuario = userResult.insertId;

            await connection.query(
                'INSERT INTO Docente(id_docente, profesion, disponibilidad, id_usuario) VALUES (?, ?, ?, ?)',
                [id_docente, profesion, disponibilidad, id_usuario]
            )

            await connection.query(
                'INSERT INTO Usuario_Rol(id_usuario, id_rol) VALUES (?, ?)',
                [id_usuario, 2]
            );

            await connection.commit();
            return {id_usuario, id_docente, nombre: usuario.nombre, profesion, disponibilidad}
        } catch(error){
            await connection.rollback();
            throw error
        } finally {
            connection.release();
        }
    }
}