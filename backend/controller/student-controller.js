import { StudentModel } from "../models/student-model.js";
import { validateStudent } from "../schemas/estudiante.js";
import bcrypt from 'bcryptjs';

export class StudentController{
    static async createStudent(req,res){
        
        const result = validateStudent(req.body); 
        
        if(!result.success){
            return res.status(400).json({error: `Error con datos del estudiante: ${(result.error.format())}`})
        }

        console.log(req.body);
        
        const {id_estudiante, carrera, semestre, usuario} = result.data;

        try{
            const hashedPass = await bcrypt.hash(usuario.contraseña, 10);

            const estudiante = await StudentModel.createStudent({
                id_estudiante, carrera, semestre, 
                usuario: {
                    ...usuario,
                    contraseña: hashedPass
                }
            })
            res.status(200).json({message: 'Estudiante registrado', estudiante});
        } catch(error){
            console.log(error);
            res.status(500).json({error: 'Error al registrar estudiante'});
            
        }
    }
}