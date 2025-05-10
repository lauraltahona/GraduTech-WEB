import { db } from '../db.js'

export class StudentModel{
    static async createStudent({id_estudiante, carrera, semestre, usuario}){
        const connection = await db.getConnection();
    
        try{
            await connection.beginTransaction();
            //insertar usuario
            const [userResult] = await connection.query(
                'INSERT INTO Usuario(nombre, correo, contraseña, id_rol) VALUES (?, ?, ?, ?)',
                [usuario.nombre, usuario.correo, usuario.contraseña, 1] //1 es el id de rol de estudiante
            );
            const id_usuario = userResult.insertId; //insertId devuelve el id que sql generó
    
            //insertar estudiante
            await connection.query(
                'INSERT INTO Estudiante(id_estudiante, carrera, semestre, id_usuario)  VALUES (?, ?, ?, ?)',
                [id_estudiante, carrera, semestre, id_usuario]
            );
    
            //insertar usuario_rol
            await connection.query(
                'INSERT INTO Usuario_Rol(id_usuario, id_rol) VALUES (?, ?)',
                [id_usuario, 1]
            )
    
            await connection.commit();
            return { id_usuario, id_estudiante, nombre: usuario.nombre, carrera, semestre };
        } catch(error){
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}