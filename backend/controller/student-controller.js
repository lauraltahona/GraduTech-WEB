import { validateStudent } from "../schemas/estudiante.js";
import { EmailService } from "../service/emailSevice.js";
import { StudentService } from "../service/student-service.js";


export class StudentController{
    static async createStudent(req,res){
        console.log(req.body);
        
        const result = validateStudent(req.body); 
        
        if(!result.success){
            return res.status(400).json({error: `Error con datos del estudiante: ${(result.error.format())}`})
        }
        
        const { carrera, semestre, usuario} = result.data;

        try{

            const estudiante = await StudentService.createStudent({
                carrera, semestre, usuario
            })
            res.status(200).json({message: 'Estudiante registrado', estudiante});
        } catch(error){
            console.log(error);
            res.status(500).json({error: 'Error al registrar estudiante'});
            
        }
    }

    static async getAllStudents(req, res){
        try{
            const students = await StudentService.getAllStudents();
            return res.status(200).json(students);
        } catch(error){
            console.log(error);
            res.status(500).json({error: 'Error al registrar estudiante'});
        }
    }

    static async getStudentById(req, res){
        const {idEstudiante} = req.params;
        console.log(idEstudiante);
        
        try{
            const student = await StudentService.getStudentById(idEstudiante);
            console.log(student);
            
            return res.status(200).json(student);
        } catch (error){
            console.log(error);
            res.status(400).json({error: 'Error al encontrar estudiante'});
        }
    }

    static async deleteStudent(req, res){
        const {idEstudiante} = req.params;
        console.log(idEstudiante);
        
        try{
            const message = await StudentService.deleteStudent(idEstudiante);
            return res.status(200).json(message);
        } catch (error){
            console.log(error);
            res.status(400).json({error: 'Error al eliminar estudiante'});
        }
    }
}