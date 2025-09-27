import { UserRepository } from "../repository/user-repository-postgre.js";
import bcrypt from 'bcryptjs';

export class UserService{
    static async login({correo, contraseña}){
        const user = await UserRepository.login({correo, contraseña});
        return user;
    }

    static async findByEmail(correo){
        return await UserRepository.findbyEmail(correo);
    }

    static async createUser({nombre, correo, password, cedula, idRol}){
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserRepository.createUser({nombre, correo, password: hashedPassword, cedula, idRol});
        return user;
    }

    static async findById(id){
        return await UserRepository.findbyId(id);
    }
}