import { validateJury } from "../schemas/jurado.js";
import { JuryService } from "../service/juryService.js";
import bcrypt from "bcryptjs";

export class JuryController{
    static async createJury(req, res){
        console.log('estoy en modelo', req.body);
        const result = validateJury(req.body);
        if(!result.success){
            return res.status(400).json({error: `Error con datos del estudiante: ${(result.error.format())}`})
        }
        const {idJurado, carrera, usuario} = result.data;
        try{
            const hashedPass = await bcrypt.hash(usuario.contraseña, 10);
                    
            const jurado = await JuryService.createJury(
                {idJurado, carrera,
                    usuario:{
                    ...usuario,
                    contraseña: hashedPass
                }
            })
            return res.status(200).json({message: 'Jurado registrado', jurado});
        } catch(error){
            console.log(error);
            res.status(500).json({message: 'Error al registrar jurado'})
        }
        

    }
}