import { TeacherModel } from "../models/teacher-model.js";
import { validateTeacher } from "../schemas/docente.js";
import bcrypt, { hashSync } from "bcryptjs";

export class TeacherController{
    static async createTeacher(req, res){
        const resultTeacher = validateTeacher(req.body);
        console.log(req.body);
        

        if(!resultTeacher.success){
            return res.status(400).json({message: 'Datos invalidos', error: resultTeacher.error.format()});
        }

        const {id_docente, profesion, disponibilidad, carrera, usuario} = resultTeacher.data;
        console.log(resultTeacher.data);
        
        try{
            const hashedPass = await bcrypt.hash(usuario.contraseña, 10);
            
            const docente = await TeacherModel.createTeacher(
                {id_docente, profesion, disponibilidad, carrera,
                usuario:{
                    ...usuario,
                    contraseña: hashedPass
                }
            })
            return res.status(200).json({message: 'Docente registrado', docente})
        } catch(error){
            console.log(error);
            res.status(500).json({message: 'Error al registrar docente'})
        }

    }
}