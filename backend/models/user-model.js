import { db } from "../db.js";
import bcrypt from "bcryptjs";

export class UserModel{
    static async login({correo, contraseña}){
        const connection = await db.getConnection();
        try{

            await connection.beginTransaction();

            const [rows] = await connection.query(
                'SELECT * FROM Usuario WHERE correo = ?', [correo]
            );
            const user = rows[0];

            if(!user) { throw new Error('El correo no existe'); }

            const isValid = await bcrypt.compare(contraseña, user.contraseña); 
            if(!isValid) throw new Error('Contraseña incorrecta');

            const [roles] = await connection.query(
                `SELECT r.nombre_rol FROM Usuario_Rol ur JOIN Rol r ON ur.id_rol = r.id_rol WHERE ur.id_usuario = ?`, 
                [user.id_usuario]
            );

            return {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                correo: user.correo,
                rol: roles.length ? roles[0].nombre_rol : null
            }
            
        } catch(error){
            throw error;
        } finally{
            connection.release();
        }
    }
    static async find (){
        
    }
}