import bcrypt from "bcryptjs";
import Rol from "../models/rol-model.js";
import User from "../models/user-model.js";
export class UserRepository{

  static async createUser({ nombre, correo, password, cedula, idRol }, options = {}) {
    const user = await User.create({
      cedula,
      nombre,
      correo,
      password,
      idRol    
    }, options);
    return user;
  }
  
  static async login({ correo, password }) {
    try {

      const user = await User.findOne({
        where: { correo },
        include: [{ model: Rol, attributes: ['nombreRol'] }]
      });      
      console.log(user.toJSON());
      if (!user) {
        throw new Error("El correo no existe");
      }
      
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Contraseña incorrecta");
      }

      const rol = user.role?.nombreRol;

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

  static async findbyId(id) {
    return await User.findOne({where: {cedula: id} });
  }
}