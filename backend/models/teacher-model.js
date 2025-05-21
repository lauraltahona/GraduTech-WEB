import { Teacher, User, UsersRols } from '../shared/schemas.js';
import { UserModel } from './user-model.js';

export class TeacherModel {
  static async createTeacher({ id_docente, profesion, disponibilidad, carrera, usuario }) {
    const t = await User.sequelize.transaction();

    try {
      // Verificar si el correo ya está registrado
      const existingUser = await User.findOne({
        where: { correo: usuario.correo },
        transaction: t,
      });

      if (existingUser) {
        throw new Error('EMAIL_ALREADY_REGISTERED');
      }

      // Verificar si el docente ya existe
      const existingTeacher = await Teacher.findOne({
        where: { idDocente: id_docente },
        transaction: t,
      });

      if (existingTeacher) {
        throw new Error('TEACHER_ALREADY_REGISTERED');
      }

      // Crear usuario
      const user = await User.create(
        {
          nombre: usuario.nombre,
          correo: usuario.correo,
          contraseña: usuario.contraseña,
          idRol: 2,
        },
        { transaction: t }
      );
      console.log('Usuario creado:', user?.toJSON?.());
      // Crear docente
      const teacher = await Teacher.create(
        {
          idDocente: id_docente,
          profesion,
          disponibilidad,
          idUser: user.idUsers,
          carrera,
        },
        { transaction: t }
      );

      // Asociar rol
      await UsersRols.create(
        {
          idUsersRol: user.idUsers,
          idRols: 2,
        },
        { transaction: t }
      );

      await t.commit();
      console.log(teacher);
      
      return {
        id_usuario: user.idUsers,
        id_docente: id_docente,
        nombre: usuario.nombre,
        profesion,
        disponibilidad,
      };
    } catch (error) {
      await t.rollback();
      console.log(error);
      throw error;
    }
  }
}
