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

            return existingUser;
            
        }
    }
}