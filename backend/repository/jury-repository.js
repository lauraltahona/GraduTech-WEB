import { use } from "react";
import Jury from "../models/jury-model.js";
import { UserService } from "../service/user-service.js";
export class JuryRepository {
    async createJury({ carrera, usuario }) {
        const t = await Jury.sequelize.transaction();
        try{
            const existingUser = await UserService.findByEmail(usuario.correo);
            const existingJury = await UserService.findById(usuario.cedula);
            if(existingUser || existingJury) throw new Error('ALREADY_REGISTERED');

            usuario.idRol = 3;
            const user = await UserService.createUser(usuario);

            const jury = Jury.create({
                carrera: carrera,
                idUser: user.idUsers,
            });

            await t.commit();
            return { cedula: user.cedula, nombre: user.nombre, carrera}

        } catch (error){
            if (!t.finished){
                await t.rollback();
            }
            throw error;
        }
    }
}