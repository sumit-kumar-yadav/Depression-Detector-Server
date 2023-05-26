const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const env = require('./env');


const transporter = nodemailer.createTransport(env.smtp);

const renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../../emails/templates', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template', err); return}

         mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter,
    renderTemplate,
    
}