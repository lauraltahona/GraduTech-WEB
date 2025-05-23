import {transporter} from '../shared/configEmail.js'
import path from "path"

export class EmailService{
    static async SendEMailPlanEntregaCreado (email,nombre,titulo){
        try {
            const emailOptions = {
                from: process.env.USER_EMAIL,
                to:email,
                subject:'Se ha creado un plan de entrega. Por favor no responder este correo',
                template:'EmailEntrega',
                context:{
                    nombre,
                    titulo
                }
            }
            await transporter.sendMail(emailOptions)
            
        } catch (error) {
            throw new error
        }
    }

    static SendEmailEntregaCreada(){
        try {
            
        } catch (error) {
            
        }
    }

    static SendEmailRetroalimentacionCreada(){

    }
    
}