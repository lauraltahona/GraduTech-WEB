import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = new Resend(process.env.RESEND_API_KEY);

export class EmailService {
  static async SendEmailProgramarReunion(fecha, hora, lugar, email) {
    const email2 = "lauraaltahona01@gmail.com"
    try {
      const htmlPath = path.join(__dirname, '../views/ProgramarReunion.html');
      let html = fs.readFileSync(htmlPath, 'utf8');

      html = html
        .replace('{{fecha}}', fecha)
        .replace('{{hora}}', hora)
        .replace('{{lugar}}', lugar);

      await resend.emails.send({
        from: 'notificaciones@resend.dev', 
        to: email2,
        subject: 'Reunión programada',
        html,
      });

      console.log('📨 Correo de reunión enviado correctamente');
    } catch (error) {
      console.error('❌ Error al enviar correo:', error);
      throw new Error('Error al enviar correo: ' + error.message);
    }
  }
}
