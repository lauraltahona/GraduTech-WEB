import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host:'smtp.office362.com',
    port:387,
    secure:false,
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.PASSWORD_EMAIL
    },
    tls:{
        ciphers:'SSLv3'
    }

})