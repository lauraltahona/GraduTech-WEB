import { transporter } from './shared/configEmail.js'
import 'dotenv/config.js';

async function test() {
  try {
    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: "lauraaltahona01@gmail.com",
      subject: "Prueba directa desde Node.js",
      text: "Hola Lau, esto es una prueba de conexión SMTP 🚀",
    })
    console.log("✅ Correo enviado:", info.response)
  } catch (err) {
    console.error("❌ Error:", err)
  }
}

test()
