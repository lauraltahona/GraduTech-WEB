// import { Student, User, UsersRols } from '../shared/schemas.js';
import Student from '../models/student-model.js';
import User from '../models/user-model.js';
import { UserService } from '../service/user-service.js';


export class StudentRepository{
    
    static async createStudent({ carrera, semestre, usuario}){

        const t = await User.sequelize.transaction();
        try{
            const existingUser = await UserService.findByEmail(usuario.correo);
            const existingStudent = await UserService.findById(usuario.cedula);

            if(existingUser || existingStudent) throw new Error('ALREADY_REGISTERED');

            const user = await UserService.createUser({...usuario, idRol: 1},
                { transaction: t }
            );
            

            const student = await Student.create({
                  carrera,
                  semestre,
                  idUser: user.idUsers,
            }, { transaction: t });
            
            await t.commit();
            return { cedula: usuario.cedula, nombre: usuario.nombre, carrera, semestre };
        } catch(error){
            if (!t.finished){
                await t.rollback();
            }
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