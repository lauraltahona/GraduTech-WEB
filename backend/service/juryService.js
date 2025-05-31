import { Jury, User, UsersRols } from '../shared/schemas.js';

export class JuryService {
  static async createJury({idJurado, carrera, usuario}) {
    console.log('estoy en modelo', idJurado, carrera, usuario);
    
    const t = await User.sequelize.transaction();
    try {
      const existingUser = await User.findOne({
        where: { correo: usuario.correo },
        transaction: t,
      });

      if (existingUser) {
        throw new Error('EMAIL_ALREADY_REGISTERED');
      }

      // Crear usuario
      const user = await User.create(
        {
          nombre: usuario.nombre,
          correo: usuario.correo,
          contraseña: usuario.contraseña,
          idRol: 3,
        },
        { transaction: t }
      );

      console.log('Usuario creado:', user?.toJSON?.());

      // Crear jurado
      const jury = await Jury.create(
        {
          idUser: user.idUsers,
          idJurado,
          carrera,
        },
        { transaction: t }
      );

      // Asociar rol de jurado
      await UsersRols.create(
        {
          idUsersRol: user.idUsers,
          idRols: 3, 
        },
        { transaction: t }
      );

      await t.commit();

      return {
        id_usuario: user.idUsers,
        id_jurado: jury.idJurado,
        nombre: usuario.nombre,
        carrera,
      };
    } catch (error) {
      await t.rollback();
      console.log(error);
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
          attributes: ['nombre', 'correo'] // Puedes agregar más atributos si lo necesitas
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
