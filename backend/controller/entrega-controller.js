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
        
        try {
            const entregas = await EntregaModel.obtenerEntregasPorEstudiante(id_usuario);
            res.status(200).json(entregas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener entregas '+ error.message });
        }
    }

    static async subirEntrega(req, res){

        const {id_plan_entrega, id_usuario, ruta_documento, descripcion } = req.body;
        try{
            const result = await EntregaModel.subirEntrega(id_plan_entrega, id_usuario, ruta_documento, descripcion);
            if(!result.success){
                return res.status(500).json({message: 'no se puedo guardar entrega'});
            }
            return res.status(200).json({message: 'Entrega subida con exito'});
        } catch(error){
            console.log('error al registrar entrega', error);
            res.status(500).json({message: 'Error al registrar entrega'+ error.message});
        }
    }

    static async obtenerPlanesEntrega(req, res){
        const {id_proyecto} = req.params;

        try{
            const result = await EntregaModel.obtenerPlanesEntrega(id_proyecto);
            res.status(200).json(result);
        }
        catch (error){
            console.error("Error al obtener entregas por proyecto:", error);
            res.status(500).json({ error: "Error al obtener las entregas." });

        }
    }

    static async obtenerEntregasPorPlan(req, res){
        const {id_plan_entrega} = req.params;
        
        try{
            const result = await EntregaModel.obtenerEntregasPorPlan(id_plan_entrega);
            res.status(200).json(result);
        } catch(error){
            console.error("Error al obtener entregas por plan", error);
            res.status(500).json({ error: "Error al obtener las entregas." });
        }
    }

    static async obtenerFechaLimite(req, res){
        const {id_usuario} = req.params;
        try{
            const fechas = await EntregaModel.obtenerFechaLimite(id_usuario);
            res.status(200).json(fechas);
        } catch(error){
            res.status(400).json({error: 'Error al obtener las fechas limites'});
            console.log('error al obtener fechas', error.message);
        }
    }
}