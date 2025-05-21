import { validateProyect } from "../schemas/proyecto.js";
import { ProyectModel } from "../models/proyect-model.js";

export class ProyectController{
    static async createProyect(req,res){
        const result = validateProyect(req.body);
        console.log(req.body);
        
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
}