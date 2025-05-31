import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import { fileURLToPath } from 'url';

// Reemplazo de __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const transporter = nodemailer.createTransport({
    service:process.env.SERVICE_EMAIL,
    secure:true,
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.PASSWORD_EMAIL
    }
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