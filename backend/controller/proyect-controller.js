import { validateProyect } from "../schemas/proyecto.js";
import { ProyectModel } from "../models/proyect-model.js";
import { ProjectService } from "../service/proyect-service.js";

export class ProyectController{
    static async createProyect(req,res){
        const result = validateProyect(req.body);
        console.log('Hola estoy en controller', req.body);
        if(!result.success){
            return res.status(401).json({error: 'error con los datos del proyecto'});
        }

        const {title, tipo, rutaDocumento, idEstudiante} = result.data;

        try{
            const proyecto = await ProyectModel.createProyect({title, tipo, rutaDocumento, idEstudiante});
            return res.status(200).json({message: 'Proyecto registrado con exito', proyecto})
        } catch(error){
            console.log(error);
            res.status(500).json({message: 'Error al registrar proyecto'})
        }
    }

    static async getProyectosAsignados(req, res) {
        const {id_usuario} = req.params;

        try{
            const proyectos = await ProyectModel.obtenerProyectosAsignados(id_usuario);
            
            if(proyectos.length === 0){
                return res.status(400).json({message: 'No tienes proyectos todavía'});
            }
            return res.status(200).json(proyectos);
            
        } catch(error){
            console.log(error);
            res.status(400).json({message: `Error con la petición de obtener proyectos asignados ${error.message}`});
        }
    }

    static async obtenerProyectos(req, res){
        const {id_usuario} = req.params;
        
        try{
            const proyecto = await ProyectModel.obtenerProyecto(id_usuario);
            res.status(200).json(proyecto);
        } catch (error){
            console.log(error);
            res.status(400).json({message: `Error con la petición de obtener proyecto ${error.message}`});
        }
    }

    static async asignarDocente(req, res) {
        const { title, idDocente } = req.body;

        console.log('ESTOY EN CONTROLLER:', title, idDocente);
        try {
            const proyectoActualizado = await ProjectService.asignarDocenteAProyecto(title, idDocente);
            console.log(proyectoActualizado);
            
            res.status(200).json({
            mensaje: "Docente asignado correctamente",
            proyecto: proyectoActualizado
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async obtenerProyectosSinDocente(req, res) {
        try {
            const lista = await ProjectService.listarProyectosSinDocente();
            console.log(lista);
            
            res.status(200).json(lista);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async asignarJurado(req, res) {
        const { title, idJurado } = req.body;

        console.log('ESTOY EN CONTROLLER:', title, idJurado);
        try {
            const proyectoActualizado = await ProjectService.asignarJuradoAProyecto(title, idJurado);
            console.log(proyectoActualizado);
            
            res.status(200).json({
            mensaje: "Jurado asignado correctamente",
            proyecto: proyectoActualizado
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async obtenerProyectosSinJurado(req, res) {
        try {
            const lista = await ProjectService.listarProyectosSinJurado();
            console.log(lista);
            
            res.status(200).json(lista);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async cambiarEstado(req, res){
        const {idProyecto, estado} = req.body
        try{
            const proyecto = await ProjectService.cambiarEstado(idProyecto, estado);
            res.status(200).json({message: 'Proyecto actualizado con exito', proyecto});
        } catch(error){
            res.status(500).json({ error: error.message });
        }
    }
}