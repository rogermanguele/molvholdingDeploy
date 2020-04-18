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

//Thnks for your email
app.get('/thank-you', (req, res)=>{
    res.render('thankyou', {layout:'thanks'} );
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
    const email =` ${req.body.email}`;
    let transporter = nodemailer.createTransport({
        host: "host02.ciuem.mz",
        //port: 25,
        //secure: true, // true for 465, false for other ports
        auth: {
            user: 'comercial@molvholding.co.mz', // generated ethereal user
            pass: 'X0T4KSLg929a' // generated ethereal password
        }
    });
    //var email=${req.body.email},
    // send mail with defined transport object
    let mailOptions = {
       
        from: 'De Manguele '+ email, // sender address
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

        res.redirect('/thank-you');
        
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
        host: "host02.ciuem.mz",
        //port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'comercial@molvholding.co.mz', // generated ethereal user
            pass: 'X0T4KSLg929a' // generated ethereal password
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        const :email = `${req.body.email}`,
        from:email, // sender address
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

        res.redirect('/thank-kyou')
    });


});



app.listen(port, () =>
    console.log('Server launched in port:', port));