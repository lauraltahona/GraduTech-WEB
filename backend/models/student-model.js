import { db } from '../db.js'
import { Rol, Student, User, UsersRols } from '../shared/schemas.js';
import { UserModel } from './user-model.js';


export class StudentModel{
    
    static async createStudent({id_estudiante, carrera, semestre, usuario}){
        const t = await User.sequelize.transaction();
        try{
            
            const resultFindByEmail = await UserModel.findbyEmail(usuario.correo) //--> busca el usuario por correo

            if(resultFindByEmail) throw new Error('EMAIL_ALREADY_REGISTERED');

            const user = await User.create({
                nombre:usuario.nombre ,
                correo: usuario.correo,
                contraseña: usuario.contraseña,
                idRol:1
            })

            const resultFindById = await this.findbyId(id_estudiante) // --> busca el estudiante
            if(resultFindById) throw new Error('STUDENT_ALREADY_REGISTERED');

            console.log(user.idUsers);// --> aqui se recupera el id de las cosas

            const student = await Student.create({
                  idEstudiante:id_estudiante,
                  carrera,
                  semestre,
                  idUser: user.idUsers
            })

            await UsersRols.create({
                idRols: 1,
                idUsersRol:user.idUsers
            })
            await t.commit();
            return { id_estudiante, nombre: usuario.nombre, carrera, semestre };
        } catch(error){
            await t.rollback();
            throw error;
        } 
    } 

    static async findbyId (id){
        const find = await Student.findOne({
            where:{idEstudiante:id}
        })
        return find
    }
}