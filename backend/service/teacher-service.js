import Teacher from '../models/teacher-model.js';
import User from '../models/user-model.js';
import { TeacherRepository } from '../repository/teacher-repository.js';

export class TeacherService{
    static async createTeacher({ profesion, carrera, usuario }) {
        const teacher = await TeacherRepository.createTeacher({ profesion, carrera, usuario });
        return teacher;
    }
    
    static async getAllTeachers() {
        const teachers = await TeacherRepository.getAllTeachers();
        return teachers;
    }

    static async getTeacherById(idDocente) {
        const teacher = await TeacherRepository.getTeacherById(idDocente);
        return teacher;
    }

    static async deleteTeacher(idDocente) {
        const message = await TeacherRepository.deleteTeacher(idDocente);
        return message;
    }


    static async listarDocentesDisponibles() {
        const teachers = await TeacherRepository.listarDocentesDisponibles();
        return teachers;
    }
}