import bcrypt from "bcryptjs";
import { User, Rol, UsersRols } from "../shared/schemas.js";

export class UserModel {

  static async login({ correo, contraseña }) {
    try {
      // Buscar usuario con su rol
      const user = await User.findOne({
        where: { correo },
        include: [{ model: Rol, attributes: ['nombreRol'] }]
      });

      if (!user) {
        throw new Error("El correo no existe");
      }

      // Verificar contraseña
      const isValid = await bcrypt.compare(contraseña, user.contraseña);
      if (!isValid) {
        throw new Error("Contraseña incorrecta");
      }

      // Acceder al nombre del rol
      const rol = user.rol?.nombreRol;

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


  static async findbyEmail(correo) {
    return await User.findOne({ where: { correo } });
  }
}