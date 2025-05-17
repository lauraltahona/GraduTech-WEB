import { EntregaModel } from "../models/entrega-model.js";

export class EntregaController{
    static async crearPlanEntrega(req, res){
        const result = req.body;
        const {id_proyecto, nro_entrega, titulo, descripcion, fecha_limite} = result.data;
        try{
            const plan = await EntregaModel.crearPlanEntrega(id_proyecto, nro_entrega,titulo, descripcion,fecha_limite);
            return res.status(200).json({message: 'Plan de entrega creado con exito'});
        } catch(error){
            console.log(error);
            res.status(500).json({message: 'Error al registrar plan de entrega'});
        }
    }

    static async obtenerEntregasEstudiante(req, res) {
        const {id_usuario} = req.params;
        console.log(id_usuario);
        
        try {
            const entregas = await EntregaModel.obtenerEntregasPorEstudiante(id_usuario);
            res.status(200).json(entregas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener entregas '+ error.message });
        }
    }

    static async subirEntrega(req, res){

        const result = req.body;
        const {id_plan_entrega, id_usuario, ruta_documento, descripcion } = result.data;
        try{
            const result = await EntregaModel.subirEntrega(id_plan_entrega, id_usuario, ruta_documento, descripcion);
            if(!result.success){
                return res.status(500).json({message: 'no se puedo guardar entrega'});
            }
            return res.status(200).json({message: 'Entrega subida con exito'});
        } catch(error){
            res.status(500).json({message: 'Error al registrar entrega'+ error.message});
        }
    }
}