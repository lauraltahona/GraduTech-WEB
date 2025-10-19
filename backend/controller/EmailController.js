import { EmailService } from "../service/emailSevice.js";

export class EmailController{
    static async programarReunión(req,res){
        const {correo, fecha, hora, lugar} = req.body;
        console.log('ESTOY EN CONTROLLER', req.body);
        
        try{
            await EmailService.SendEmailProgramarReunión(fecha, hora, lugar);
            res.status(200).json({message: 'Reunión programada'});
        } catch (error){
            res.status(500).json({error: 'No se pudo programar la reunión'});
            console.log(error);
        }
    }
}