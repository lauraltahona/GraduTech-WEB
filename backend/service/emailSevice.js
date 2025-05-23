import {transporter} from '../shared/configEmail.js'

export class EmailService{
    static async SendEMailPlanEntregaCreado (email,nombre,titulo){
        try {
            const emailOptions = {
                from: process.env.USER_EMAIL,
                to:email,
                subject:'Se ha creado un plan de entrega. Por favor no responder este correo',
                template:'EmailPlanEntrega',
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

    static async SendEmailEntregaCreada(email,nombre,titulo){
        try {
            const emailOptions = {
                from: process.env.USER_EMAIL,
                to:email,
                subject:'Se ha subido una entrega del proyecto. Por favor no responder este correo',
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

    static async SendEmailRetroalimentacionCreada(email,nombre,titulo){
        try {
            const emailOptions = {
                from: process.env.USER_EMAIL,
                to:email,
                subject:'Se ha subido una entrega del proyecto. Por favor no responder este correo',
                template:'EmailRetroalimentacion',
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
    
}