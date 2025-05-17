import { validateProyect } from "../schemas/proyecto.js";
import { ProyectModel } from "../models/proyect-model.js";

export class ProyectController{
    static async createProyect(req,res){
        const result = validateProyect(req.body);

        if(!result.success){
            return res.status(401).json({error: 'error con los datos del docente'});
        }

        const {titulo, tipo, ruta_documento, id_estudiante} = result.data;

        try{
            const proyecto = await ProyectModel.createProyect({titulo, tipo, ruta_documento, id_estudiante});
            return res.status(200).json({message: 'Proyecto registrado con exito'})
        } catch(error){
            console.log(error);
            res.status(500).json({message: 'Error al registrar proyecto'})
        }
    }

    static async getProyectosAsignados(req, res) {

        const {id_usuario} = req.params;
        console.log(id_usuario);
        
        try{
            const proyectos = await ProyectModel.obtenerProyectosAsignados(id_usuario);
            console.log(proyectos);
            
            if(proyectos.length === 0){
                return res.status(400).json({message: 'No tienes proyectos todavía'});
            }
            return res.status(200).json(proyectos);
            
        } catch(error){
            console.log(error);
            res.status(400).json({message: `Error con la petición de obtener proyectos asignados ${error.message}`});
        }
    }
}