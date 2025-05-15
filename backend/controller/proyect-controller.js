import { validateProyect } from "../schemas/proyecto.js";
import { ProyectModel } from "../models/proyect-model.js";

export class ProyectController{
    static async createProyect(req,res){
        const result = validateProyect(req.body);

        if(!result.success){
            res.status(401).json({error: 'error con los datos del docente'});
        }

        const {titulo, tipo, ruta_documento, id_estudiante} = result.data;

        try{
            const proyecto = await ProyectModel.createProyect({titulo, tipo, ruta_documento, id_estudiante});
            res.status(200).json({message: 'Proyecto registrado con exito'})
        } catch(error){
            console.log(error);
            res.status(500).json({message: 'Error al registrar proyecto'})
        }
    }

    static async getProyectosAsignados(req, res) {
        const user = req.session.user;

        if (!user) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        if (user.rol !== 'docente') {
            return res.status(403).json({ message: 'Acceso denegado, no eres docente' });
        }

        // Simulación: supón que este docente tiene proyectos
        const proyectos = [
            { id: 1, titulo: 'Sistema de inventario', docente_id: 1 },
            { id: 2, titulo: 'App de mensajería', docente_id: 1 }
        ];

        // Filtramos solo los que pertenecen al docente autenticado
        const misProyectos = proyectos.filter(p => p.docente_id === user.id_usuario);

        res.json({ proyectos: misProyectos });
    }
}