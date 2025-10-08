// import { Student, User, UsersRols } from '../shared/schemas.js';
import Student from '../models/student-model.js';
import User from '../models/user-model.js';
import { UserService } from '../service/user-service.js';


export class StudentRepository {

    static async createStudent({ carrera, semestre, usuario }) {
        console.log('Creating student in repository with data:', { carrera, semestre, usuario });
        
        const t = await User.sequelize.transaction();
        try {
            const existingUser = await UserService.findByEmail(usuario.correo);
            const existingStudent = await UserService.findById(usuario.cedula);

            if (existingUser || existingStudent) throw new Error('ALREADY_REGISTERED');

            const user = await UserService.createUser({ ...usuario, idRol: 1 },
                { transaction: t }
            );


            const student = await Student.create({
                carrera,
                semestre,
                idUser: user.idUsers,
            }, { transaction: t });

            await t.commit();
            return { cedula: usuario.cedula, nombre: usuario.nombre, carrera, semestre };
        } catch (error) {
            if (!t.finished) {
                await t.rollback();
            }
            throw error;
        }
    }

    static async findbyId(id) {
        const find = await Student.findOne({
            where: { idEstudiante: id }
        })
        return find
    }

    static async getAllStudents() {
        try {
            const students = await Student.findAll({
                include: {
                    model: User,
                    attributes: ['idUsers', 'nombre', 'correo'],
                },
            });

            return students.map(student => ({
                id_estudiante: student.idEstudiante,
                carrera: student.carrera,
                semestre: student.semestre,
                usuario: {
                    id_usuario: student.user.idUsers,
                    nombre: student.user.nombre,
                    correo: student.user.correo,
                },
            }));
        } catch (error) {
            console.error('Error al obtener estudiantes:', error);
            throw error;
        }
    }

    static async getStudentById(idEstudiante) {
        try {
            const student = await Student.findOne({
                where: { idEstudiante },
                include: {
                    model: User,
                    attributes: ['idUsers', 'nombre', 'correo'],
                },
            });

            if (!student) {
                throw new Error('STUDENT_NOT_FOUND');
            }

            return {
                id_estudiante: student.idEstudiante,
                carrera: student.carrera,
                semestre: student.semestre,
                usuario: {
                    id_usuario: student.user.idUsers,
                    nombre: student.user.nombre,
                    correo: student.user.correo,
                },
            };
        } catch (error) {
            console.error('Error al obtener estudiante por ID:', error);
            throw error;
        }
    }

    static async deleteStudent(idEstudiante) {
        console.log('model, ', idEstudiante);

        const t = await Student.sequelize.transaction();
        try {
            const student = await Student.findOne({
                where: { idEstudiante },
                transaction: t,
            });

            if (!student) {
                throw new Error('STUDENT_NOT_FOUND');
            }

            // Primero eliminamos el estudiante
            await Student.destroy({
                where: { idEstudiante },
                transaction: t,
            });

            // Luego eliminamos el usuario relacionado
            await User.destroy({
                where: { idUsers: student.idUser },
                transaction: t,
            });

            await t.commit();
            return { message: 'STUDENT_DELETED' };
        } catch (error) {
            await t.rollback();
            console.error('Error al eliminar estudiante:', error);
            throw error;
        }
    }

}