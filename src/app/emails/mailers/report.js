const { transporter, renderTemplate } = require('../../engine/config/nodemailer');
const env = require('../../engine/config/env');

const sendReportToClient = (doctor, client, report) => {

    let htmlString = renderTemplate({doctor, client, report}, '/report/client_report.ejs');
    
    transporter.sendMail({
        from: env.smtp.auth.user,
        to: client.email,
        subject: "Mental Health Report",
        html: htmlString,
        attachments: [{
            filename: 'report.jpg',
            content: report.file, // Attach the buffer directly
            cid: 'report', // Use the same unique identifier as in the HTML image source
            contentDisposition: 'attachment',
        }]
    }, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log('Email sent to client: ' + info.response);
        }
    })
}

module.exports = {
    sendReportToClient,
}