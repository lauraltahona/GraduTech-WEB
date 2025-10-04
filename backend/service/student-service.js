import Student from "../models/student-model.js";
import User from "../models/user-model.js";
import {StudentRepository} from "../repository/student-repository.js";

export class StudentService{
    static async createStudent({carrera, semestre, usuario}) {
        const student = await StudentRepository.createStudent({carrera, semestre, usuario});
        return student;
    }
    
    static async getAllStudents() {
        const students = await StudentRepository.getAllStudents();
        return students;
    }

    static async getStudentById(idEstudiante) {
        const student =  StudentRepository.getStudentById(idEstudiante);
        return student;
    }

    static async deleteStudent(idEstudiante) {
        const message = await StudentRepository.deleteStudent(idEstudiante);
        return message;
    }
}