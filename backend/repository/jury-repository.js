import Jury from "../models/jury-model.js";
import { UserService } from "../service/user-service.js";
export class JuryRepository {
  static async createJury({ carrera, usuario }) {
    const t = await Jury.sequelize.transaction();
    try {
      const existingUser = await UserService.findByEmail(usuario.correo);
      const existingJury = await UserService.findById(usuario.cedula);
      if (existingUser || existingJury) throw new Error('ALREADY_REGISTERED');

      usuario.idRol = 3; //rol Jurado
      const user = await UserService.createUser(usuario);

      const jury = Jury.create({
        carrera: carrera,
        idUser: user.idUsers,
      });

      await t.commit();
      return { cedula: user.cedula, nombre: user.nombre, carrera }

    } catch (error) {
      if (!t.finished) {
        await t.rollback();
      }
      throw error;
    }
  }

  static async getAllJurys() {
    const jurys = await Jury.findAll({
      include: {
        model: User,
        attributes: ['idUsers', 'nombre', 'correo'],
      },
    });

    return jurys.map(t => ({
      id_jurado: t.idJurado,
      carrera: t.carrera,
      usuario: {
        id_usuario: t.user.idUsers,
        nombre: t.user.nombre,
        correo: t.user.correo,
      },
    }));
  }

  static async getJuradoById(idJurado) {
    try {
      const jurado = await Jury.findOne({
        where: { idJurado },
        include: {
          model: User,
          attributes: ['nombre', 'correo']
        }
      });

      if (!jurado) {
        return { message: 'Jurado no encontrado' };
      }

      return jurado;
    } catch (error) {
      console.error('Error al obtener el jurado:', error);
      return { message: 'Error interno del servidor' };
    }
  }
}