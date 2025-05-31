import { Teacher, User } from '../shared/schemas.js';

export class TeacherService{
    static async getAllTeachers() {
        const teachers = await Teacher.findAll({
            include: {
            model: User,
            attributes: ['idUsers', 'nombre', 'correo'],
            },
        });

        return teachers.map(t => ({
            id_docente: t.idDocente,
            profesion: t.profesion,
            disponibilidad: t.disponibilidad,
            carrera: t.carrera,
            usuario: {
            id_usuario: t.user.idUsers,
            nombre: t.user.nombre,
            correo: t.user.correo,
            },
        }));
    }

    static async getTeacherById(idDocente) {
        const teacher = await Teacher.findOne({
            where: { idDocente },
            include: {
            model: User,
            attributes: ['idUsers', 'nombre', 'correo'],
            },
        });

        if (!teacher) throw new Error('TEACHER_NOT_FOUND');

        return {
            id_docente: teacher.idDocente,
            profesion: teacher.profesion,
            disponibilidad: teacher.disponibilidad,
            carrera: teacher.carrera,
            usuario: {
            id_usuario: teacher.user.idUsers,
            nombre: teacher.user.nombre,
            correo: teacher.user.correo,
            },
        };
    }

    static async deleteTeacher(idDocente) {
        const t = await Teacher.sequelize.transaction();

        try {
            const teacher = await Teacher.findOne({
            where: { idDocente },
            transaction: t,
            });

            if (!teacher) throw new Error('TEACHER_NOT_FOUND');

            const userId = teacher.idUser;

            // Borrar relaciones en UsersRols
            await UsersRols.destroy({
            where: { idUsersRol: userId },
            transaction: t,
            });

            // Borrar teacher
            await Teacher.destroy({
            where: { idDocente },
            transaction: t,
            });

            // Borrar usuario
            await User.destroy({
            where: { idUsers: userId },
            transaction: t,
            });

            await t.commit();

            return { message: 'TEACHER_DELETED_SUCCESSFULLY' };
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }



    static async listarDocentesDisponibles() {
        const docentes = await Teacher.findAll({
            where: { disponibilidad: 'DISPONIBLE' },
        });
        console.log(docentes);
        
        return docentes.map(d => ({
            id: d.idDocente,
            carrera: d.carrera,
            profesion: d.profesion,
        }));
    }
}