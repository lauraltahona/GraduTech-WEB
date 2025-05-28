import {transporter} from '../shared/configEmail.js'

export class EmailService{
    static async SendEMailPlanEntregaCreado (email,titulo,descripcion){
        try {
            const emailOptions = {
                from: process.env.USER_EMAIL,
                to:email,
                subject:'Se ha creado un plan de entrega. Por favor no responder este correo',
                template:'EmailPlanEntrega',
                context:{
                    titulo,
                    descripcion
                }
            }
            const correo = await transporter.sendMail(emailOptions)
            console.log(correo);
            
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

    static async SendEmailProgramarReunión(email,fecha,hora){   
        console.log('ESTOY EN SERVICE', email, fecha,hora);
        
        try {
            const emailOptions = {
                from: process.env.USER_EMAIL,
                to:email,
                subject:'Le han programado una reunión presencial, por favor no responder este correo',
                template:'EmailRetroalimentacion',
                context:{
                    fecha,
                    hora
                }
            }
            await transporter.sendMail(emailOptions)
        } catch (error) {
            throw new error
        }
    }
    
}