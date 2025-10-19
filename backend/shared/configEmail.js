import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config.js';
import dns from 'dns'

// 🔧 Evita resolución IPv6 errónea
dns.setDefaultResultOrder('ipv4first')

// Reemplazo de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para 465
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
  tls: {
    rejectUnauthorized: false, // 👈 evita errores de certificados en Windows
  },
})

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "views/",
      defaultLayout: "",
    },
    viewPath: path.join(__dirname, '..', 'views'),
  })
)
