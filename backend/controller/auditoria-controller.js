import { AuditoriaService } from "../service/AuditoriaService.js";

export class AuditoriaController{
    static async getAuditorias(req, res){
        console.log('estoy en controller');
        
        try{
            const auditorias = await AuditoriaService.getAuditorias();
            res.status(200).json(auditorias);
        } catch(error){
            res.status(400).json({error: 'Error al obtener la auditoria'});
            console.log(error);
            
        }
    }
}