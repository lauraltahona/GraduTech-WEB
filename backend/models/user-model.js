import bcrypt from "bcryptjs";
import { User, Rol, UsersRols } from "../shared/schemas.js";

export class UserModel {
  static async login({ correo, contraseña }) {
    try {
      // Buscar usuario por correo
      const user = await User.findOne({ where: { correo } });
      
      if (!user) {
        throw new Error("El correo no existe");
      }
      // Verificar contraseña
      const isValid = await bcrypt.compare(contraseña, user.contraseña);
      if (!isValid) {
        throw new Error("Contraseña incorrecta");
      }


      // Obtener el rol (usando asociación con tabla intermedia si estás usando UsersRols)
      const roles = await UsersRols.findAll({
        where: { idUsersRol: user.idUsers },
        include: [{ model: Rol, attributes: ["nombreRol"] }]
      });
      console.log(roles);
      

      const rol = roles.length ? roles[0].rol.nombreRol : null;
      console.log(rol);
      
      return {
        id_usuario: user.idUsers,
        nombre: user.nombre,
        correo: user.correo,
        rol
      };
    } catch (error) {
      throw error;
    }
  }

  static async find() {
    return await User.findAll({
      include: [
        {
          model: UsersRols,
          include: [{ model: Rol }]
        }
      ]
    });
  }

  static async findbyEmail(correo) {
    return await User.findOne({ where: { correo } });
  }
}