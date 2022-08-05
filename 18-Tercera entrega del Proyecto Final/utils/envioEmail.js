const {createTransport} = require('nodemailer')
require('dotenv').config();
const {createLogger} = require("../utils/logWinston")
const logger = createLogger('PROD')

const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_ADMINISTRADOR,
        pass: process.env.EMAIL_PASSWORD
    }
});

const enviarEmailAdministrador = async (subject, html) => {

    const mailOptions = {
        from: process.env.EMAIL_ADMINISTRADOR,
        to: process.env.EMAIL_ADMINISTRADOR,
        subject: subject,
        html: `<h1>${subject} de ${html.name}</h1>
        <p>Edad: ${html.edad}</p>
        <p>Direccion: ${html.direccion}</p>
        <p>Tel: ${html.telefono}</p>
        <p>Email: ${html.username}</p>
        `,
        attachments: [
            {
                path: 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/23/posts/28195/image/gmail-vs-outlook-best-free-email-service-provider.jpg'
            }
        ]
     }
    
    transporter.sendMail(mailOptions)
    .then(info => logger.log('info', `Se envio el email de confirmacion al Administrador satifactoriamente!`))
    .catch(err => logger.log('error', `No se pudo enviar el email de confiramcion al Administrador!`))

}

const enviarEmailAdministradorPedido = async (subject, productos) => {

    const mailOptions = {
        from: process.env.EMAIL_ADMINISTRADOR,
        to: process.env.EMAIL_ADMINISTRADOR,
        subject: subject,
        html: `<h1>${subject}</h1>
        <h3>Productos Comprados</h3>
        <tr>
            <td>Código</td>
            <td>Producto</td>
            <td>Precio</td>
        </tr>
        ${productos.forEach(element => {
            `<tr>
                <td>${element.code}</td>
                <td>${element.title}</td>
                <td>${element.price}</td>
            </tr>`
        })}
        `
        ,
        attachments: [
            {
                path: 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/23/posts/28195/image/gmail-vs-outlook-best-free-email-service-provider.jpg'
            }
        ]
     }
    
    transporter.sendMail(mailOptions)
    .then(info => logger.log('info', `Se envio el email de confirmacion al Administrador satifactoriamente!`))
    .catch(err => logger.log('error', `No se pudo enviar el email de confiramcion al Administrador!`))

}

module.exports = {enviarEmailAdministrador, enviarEmailAdministradorPedido}