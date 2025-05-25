import { Project, Student } from "../shared/schemas.js";

 export class ProjectService{
    static async asignarDocenteAProyecto(title, idDocente) {
        console.log('ESTOY EN MODEL:', title, idDocente);
        
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
    
    static async asignarJuradoAProyecto(title, idJurado) {
        console.log('ESTOY EN MODEL:', title, idJurado);
        
        // Validar que el proyecto existe
        const proyecto = await Project.findOne({ where: { title } });
        if (!proyecto) {
            throw new Error("Proyecto no encontrado");
        }

        // Asignar el docente
        proyecto.idJurado = idJurado;

        // Guardar cambios
        await proyecto.save();

        return proyecto;
    }

    static async cambiarEstado(idProyecto, estado){
        const proyecto = await Project.findByPk(idProyecto);
        if (!proyecto) {
            throw new Error("Proyecto no encontrado");
        }
         proyecto.estado = estado;
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

    static async listarProyectosSinJurado() {
        const proyectos = await Project.findAll({
            where: { idJurado: null },
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
