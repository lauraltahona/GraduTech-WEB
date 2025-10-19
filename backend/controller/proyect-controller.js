import { validateProyect, validateUpdateProyect } from "../schemas/proyecto.js";
import { ProjectService } from "../service/proyect-service.js";

export class ProyectController{
    static async createProyect(req,res){
        //llama la función de validación
        const result = validateProyect(req.body);

        if(!result.success){
            return res.status(401).json({error: 'error con los datos del proyecto'});
        }

        const {title, tipo, rutaDocumento, idEstudiante, descripcion} = result.data;
        
        try{
            //llama la función de creación del proyecto
            const proyecto = await ProjectService.createProject({title, tipo, rutaDocumento, idEstudiante, descripcion});
            return res.status(200).json({message: 'Proyecto registrado con exito', proyecto})
        } catch(error){
            console.log(error);
            res.status(500).json({message: 'Error al registrar proyecto'})
        }
    }

    static async updateProyect(req, res){
        const {idProyecto} = req.params;
        const newProject = validateUpdateProyect(req.body);
        if(!newProject.success){
            return res.status(401).json({error: 'error con los datos del proyecto'});
        }

        const {title, rutaDocumento, descripcion} = newProject.data;
        try{
            const project = await ProjectService.updateProject(idProyecto, title, rutaDocumento, descripcion);
            return res.status(200).json({message: 'Proyecto actualizado con exito', project})
        } catch(error){
            res.status(500).json({message: 'Error al actualizar proyecto' + error.message})
        }
    }

    
    static async getProyectosAsignados(req, res) {
        const {id_usuario} = req.params;

        try{
            const proyectos = await ProjectService.obtenerProyectosAsignados(id_usuario);
            
            if(proyectos.length === 0){
                return res.status(400).json({message: 'No tienes proyectos todavía'});
            }
            return res.status(200).json(proyectos);
            
        } catch(error){
            console.log(error);
            res.status(400).json({message: `Error con la petición de obtener proyectos asignados ${error.message}`});
        }
    }

    static async getProyectosAsignadosJurado(req, res) {
        const {id_usuario} = req.params;
        console.log(id_usuario);
        
        try{
            const proyectos = await ProjectService.obtenerProyectosAsignadosJurados(id_usuario);
            
            if(proyectos.length === 0){
                return res.status(200).json([]);
            }
            return res.status(200).json(proyectos);
            
        } catch(error){
            console.log(error);
            res.status(400).json({message: `Error con la petición de obtener proyectos asignados ${error.message}`});
        }
    }

    static async mostrarProyectosPorTipo(req,res){
        const tipo = req.query.tipo;
        console.log(tipo);

        try{
            const proyectos = await ProjectService.mostrarProyectosPorTipo(tipo);
            res.status(200).json(proyectos);
        } catch (error){
            res.status(401).json({error: `Error con la petición de obtener proyectos asignados ${error.message}`});
        }
    }
    static async obtenerProyectos(req, res){
        const {id_usuario} = req.params;
        
        try{
            const proyecto = await ProjectService.obtenerProyecto(id_usuario);
            res.status(200).json(proyecto);
        } catch (error){
            console.log(error);
            res.status(400).json({message: `Error con la petición de obtener proyecto ${error.message}`});
        }
    }

    static async asignarDocente(req, res) {
        const { title, idDocente } = req.body;

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

    static async autorizacionRepositorio(req, res){
        const {idProyecto, autorizacion_repositorio} = req.body
        console.log('estoy en controller', req.body);
        
        try{
            const proyecto = await ProjectService.autorizacionRepositorio(idProyecto, autorizacion_repositorio);
            res.status(200).json({message: 'Proyecto aprobado para el repositorio con exito', proyecto});
        } catch(error){
            res.status(500).json({ error: error.message });
        }
    }
}