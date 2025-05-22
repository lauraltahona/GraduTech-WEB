import { Teacher } from '../shared/schemas.js';

export class TeacherService{
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