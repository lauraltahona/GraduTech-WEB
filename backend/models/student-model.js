import { db } from '../db.js'
import { Rol, Student, User, UsersRols } from '../shared/schemas.js';

export class StudentModel{
    static async createStudent({id_estudiante, carrera, semestre, usuario}){
        const connection = await db.getConnection();
    
        try{
            // await connection.beginTransaction();

            // const [existingUser] = await connection.query(
            //     'SELECT correo FROM Usuario WHERE correo = ?', [usuario.correo]
            // );
            // const [existingStudent] = await connection.query(
            //     'SELECT id_estudiante FROM Estudiante WHERE id_estudiante = ?', [id_estudiante]
            // );

            // if(existingStudent.length > 0){
            //     throw new Error('STUDENT_ALREADY_REGISTERED');
            // }
            // if(existingUser.length > 0){
            //     throw new Error('EMAIL_ALREADY_REGISTERED');
            // }

            const rol = await Rol.create({
                nombreRol:"Administrador"
            })
            
            
            const resultFindByEmail = await this.findbyEmail(usuario.correo) //--> busca el usuario por correo

            if(resultFindByEmail) throw new Error('EMAIL_ALREADY_REGISTERED');

            // //insertar usuario
            // const [userResult] = await connection.query(
            //     'INSERT INTO Usuario(nombre, correo, contraseña, id_rol) VALUES (?, ?, ?, ?)',
            //     [usuario.nombre, usuario.correo, usuario.contraseña, 1] //1 es el id de rol de estudiante
            // );
            const user = await User.create({
                nombre:usuario.nombre ,
                correo: usuario.correo,
                contraseña: usuario.contraseña,
                idRol:1
            })

            const resultFindById = await this.findbyId(id_estudiante) // --> busca el estudiante
            if(resultFindById) throw new Error('STUDENT_ALREADY_REGISTERED');

            console.log(user.idUsers);// --> aqui se recupera el id de las cosas

            // //insertar estudiante
            // await connection.query(
            //     'INSERT INTO Estudiante(id_estudiante, carrera, semestre, id_usuario)  VALUES (?, ?, ?, ?)',
            //     [id_estudiante, carrera, semestre, id_usuario]
            // );
            const student = await Student.create({
                  idEstudiante:id_estudiante,
                  carrera,
                  semestre,
                  idUser: user.idUsers
            })

            // //insertar usuario_rol
            // await connection.query(
            //     'INSERT INTO Usuario_Rol(id_usuario, id_rol) VALUES (?, ?)',
            //     [id_usuario, 1]
            // )
            await UsersRols.create({
                idRols:1,
                idUsersRol:user.idUsers
            })

            return { id_estudiante, nombre: usuario.nombre, carrera, semestre };
        } catch(error){
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async findbyEmail (correo){
        const find = await User.findOne({
            where:{ correo }
        })
        return find
    }

    static async findbyId (id){
        const find = await Student.findOne({
            where:{idEstudiante:id}
        })
        return find
    }
}