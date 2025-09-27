// import { Teacher, User, UsersRols } from '../shared/schemas.js';
import Teacher from '../models/teacher-model.js';
import { UserService } from '../service/user-service.js';
import User from '../models/user-model.js';

export class TeacherRepository {
  static async createTeacher({ profesion, carrera, usuario }) {
    const t = await User.sequelize.transaction();
    try {
      // Verificar si el correo ya está registrado
      const existingUser = await UserService.findByEmail(usuario.correo) ;
      const existingTeacher = await UserService.findById(usuario.cedula);

      if (existingUser) {
        throw new Error('EMAIL_ALREADY_REGISTERED');
      }

      if (existingTeacher) {throw new Error('TEACHER_ALREADY_REGISTERED'); }
      
      // Crear usuario
      usuario.idRol = 2;
       const user = await UserService.createUser(usuario);

      // Crear docente
      const disponibilidad = 'DISPONIBLE';
      const teacher = await Teacher.create(
        {
          profesion,
          disponibilidad,
          carrera,
          idUser: user.idUsers,
        }
      );

      await t.commit();
      
      return {
        id_usuario: user.idUsers,
        cedula: usuario.cedula,
        nombre: usuario.nombre,
        profesion,
        disponibilidad,
        carrera,
      };
    } catch (error) {
      if (!t.finished){
        await t.rollback();
      }
      throw error;
    }
  }
}
