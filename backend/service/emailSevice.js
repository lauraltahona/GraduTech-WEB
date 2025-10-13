import {transporter} from '../shared/configEmail.js'
import 'dotenv/config.js';

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
            
        } catch (error) {
            throw new Error('Error al enviar correo: '+ error.message)
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
            throw new Error('Error al enviar correo: '+ error.message)
        }
    }

    static async SendEmailProgramarReunión(fecha, hora, lugar){ 
        const email = "lauraaltahona01@gmail.com"
        console.log(email, fecha, hora, lugar);
        
        try {
            const emailOptions = {
                from: process.env.USER_EMAIL,
                to:email,
                subject:'Le han programado una reunión presencial, por favor no responder este correo',
                template:'EmailRetroalimentacion',
                context:{
                    fecha,
                    hora,
                    lugar
                }
            }
            
            await transporter.sendMail(emailOptions)
        } catch (error) {
            throw new Error('Error al enviar correo: '+ error.message)
        }
    }
    
}