// import { Teacher, User, UsersRols } from '../shared/schemas.js';
import Teacher from '../models/teacher-model.js';
import { UserService } from '../service/user-service.js';
import User from '../models/user-model.js';

export class TeacherRepository {
  static async createTeacher({ profesion, carrera, usuario }) {
    const t = await User.sequelize.transaction();
    try {
      // Verificar si el correo ya está registrado
      const existingUser = await UserService.findByEmail(usuario.correo);
      const existingTeacher = await UserService.findById(usuario.cedula);

      if (existingUser) {
        throw new Error('EMAIL_ALREADY_REGISTERED');
      }

      if (existingTeacher) { throw new Error('TEACHER_ALREADY_REGISTERED'); }

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
      if (!t.finished) {
        await t.rollback();
      }
      throw error;
    }
  }

  static async getAllTeachers() {
    const teachers = await Teacher.findAll({
      include: {
        model: User,
        attributes: ['idUsers', 'nombre', 'correo'],
      },
    });

    return teachers.map(t => ({
      id_docente: t.idDocente,
      profesion: t.profesion,
      disponibilidad: t.disponibilidad,
      carrera: t.carrera,
      usuario: {
        id_usuario: t.user.idUsers,
        nombre: t.user.nombre,
        correo: t.user.correo,
      },
    }));
  }

  static async getTeacherById(idDocente) {
    const teacher = await Teacher.findOne({
      where: { idDocente },
      include: {
        model: User,
        attributes: ['idUsers', 'nombre', 'correo'],
      },
    });

    if (!teacher) throw new Error('TEACHER_NOT_FOUND');

    return {
      id_docente: teacher.idDocente,
      profesion: teacher.profesion,
      disponibilidad: teacher.disponibilidad,
      carrera: teacher.carrera,
      usuario: {
        id_usuario: teacher.user.idUsers,
        nombre: teacher.user.nombre,
        correo: teacher.user.correo,
      },
    };
  }

  static async deleteTeacher(idDocente) {
    const t = await Teacher.sequelize.transaction();

    try {
      const teacher = await Teacher.findOne({
        where: { idDocente },
        transaction: t,
      });

      if (!teacher) throw new Error('TEACHER_NOT_FOUND');

      const userId = teacher.idUser;

      // Borrar teacher
      await Teacher.destroy({
        where: { idDocente },
        transaction: t,
      });

      // Borrar usuario
      await User.destroy({
        where: { idUsers: userId },
        transaction: t,
      });

      await t.commit();

      return { message: 'TEACHER_DELETED_SUCCESSFULLY' };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }



  static async listarDocentesDisponibles() {
    const docentes = await Teacher.findAll({
      where: { disponibilidad: 'DISPONIBLE' },
      include: [{model: User, attributes: ['nombre', 'cedula']}]
    });

    return docentes.map(d => ({
      id: d.idDocente,
      carrera: d.carrera,
      profesion: d.profesion,
      nombre: d.user.nombre,
      cedula: d.user.cedula
    }));
  }
}
