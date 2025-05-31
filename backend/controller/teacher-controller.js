import { TeacherModel } from "../models/teacher-model.js";
import { validateTeacher } from "../schemas/docente.js";
import bcrypt, { hashSync } from "bcryptjs";
import { TeacherService } from "../service/teacher-service.js";

export class TeacherController{
    static async createTeacher(req, res){
        const resultTeacher = validateTeacher(req.body);
        console.log(req.body);
        

        if(!resultTeacher.success){
            return res.status(400).json({message: 'Datos invalidos', error: resultTeacher.error.format()});
        }

        const {id_docente, profesion, carrera, usuario} = resultTeacher.data;
        console.log(resultTeacher.data);
        
        try{
            const hashedPass = await bcrypt.hash(usuario.contraseña, 10);
            
            const docente = await TeacherModel.createTeacher(
                {id_docente, profesion, carrera,
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

    static async obtenerDocentesDisponibles(req, res) {
        try {
            const lista = await TeacherService.listarDocentesDisponibles();
            console.log(lista);
            
            res.status(200).json(lista);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllTeacher(req, res){
        try{
            const teachers = await TeacherService.getAllTeachers();
            return res.status(200).json(teachers);
        } catch(error){
            console.log(error);
            res.status(500).json({error: 'Error al obtener docentes'});
        }
    }

    static async getTeacherById(req, res){
        const {idDocente} = req.params;
        console.log(idDocente);
        
        try{
            const teacher = await TeacherService.getTeacherById(idDocente);
            console.log(teacher);
            return res.status(200).json(teacher);
        } catch (error){
            console.log(error);
            res.status(400).json({error: 'Error al encontrar docente'});
        }
    }

    static async deleteTeacher(req, res){
        const {idDocente} = req.params;
        console.log(idDocente);
        
        try{
            const message = await StudentService.deleteStudent(idDocente);
            return res.status(200).json(message);
        } catch (error){
            console.log(error);
            res.status(400).json({error: 'Error al eliminar estudiante'});
        }
    }
}