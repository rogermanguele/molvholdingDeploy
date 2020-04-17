const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3000;
const path = require('path');

const app = express();

//Pagina estatica
app.use(express.static('public'));

//view engine
app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'handlebars');



//bodyParser midleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', {
        layout: 'main'
    });
});

//Email sending functionalities for MolV Contact Form
app.post('/send', (req, res) => {
    const output = `
        <h3>Detalhes de contacto</h3>
        <ul>
            <li>Nome: ${req.body.nome}
            <li>E-mail: ${req.body.email}
            <li>Telefone: ${req.body.telefone}
        </ul>
        <h3>Mensagem</h3>
        <p> ${req.body.mensagem}</p>
    `;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'rogermanguele@gmail.com', // generated ethereal user
            pass: 'babulayza' // generated ethereal password
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: '"Pedido de info via Site" <rogermanguele@gmail.com>', // sender address
        to: "comercial@molvholding.co.mz", // list of receivers
        subject: "MOLV CONTACT FORM", // Subject line
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Mensagem enviada: %s', info.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('index', {
            msg: 'Mensagem enviada',
            layout: 'main'
        })
    });


});

//Router to send resquests to Molv Holdig Staff
app.post('/sendServiceRequest', (req, res) => {
    const output = `
        <h3>Detalhes de contacto</h3>
        <ul>
            <li>Nome: ${req.body.nome}
            <li>E-mail: ${req.body.email}
            <li>Telefone: ${req.body.telefone}
            <li>Empresa:${req.body.empresa}
            <li>Area atuação: ${req.body.area}
            <li>Endereço: ${req.body.adress}
            
        </ul>
        <h3>Mensagem</h3>
        <p> ${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'rogermanguele@gmail.com', // generated ethereal user
            pass: 'babulayza' // generated ethereal password
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: '"Pedido via Site" <rogermanguele@gmail.com>', // sender address
        to: "comercial@molvholding.co.mz", // list of receivers
        subject: "Solicitação de serviço", // Subject line
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Mensagem enviada: %s', info.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('index', {
            msg: 'Mensagem enviada',
            layout: 'main'
        })
    });


});



app.listen(port, () =>
    console.log('Server launched in port:', port));