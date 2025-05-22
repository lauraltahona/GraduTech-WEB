import { Project, Student } from "../shared/schemas.js";

 export class ProjectService{
    async asignarDocenteAProyecto(title, idDocente) {
        // Validar que el proyecto existe
        const proyecto = await Project.findOne({ where: { title } });
        if (!proyecto) {
            throw new Error("Proyecto no encontrado");
        }

        // Asignar el docente
        proyecto.idDocente = idDocente;

        // Guardar cambios
        await proyecto.save();

        return proyecto;
    }

    static async listarProyectosSinDocente() {
        const proyectos = await Project.findAll({
            where: { idDocente: null },
            include: [{ model: Student }],
        });
        console.log(proyectos);
        
        return proyectos.map(p => ({
            id: p.idProyecto,
            title: p.title,
            carrera: p.student?.carrera,
        }));
    }
 }
