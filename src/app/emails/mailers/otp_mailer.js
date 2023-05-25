const { transporter, renderTemplate } = require('../../engine/config/nodemailer');
const env = require('../../engine/config/env');

const sendOtp = (subject, otp, receiver) => {

    let htmlString = renderTemplate({otp}, '/otp/verify_new_user.ejs');

    transporter.sendMail({
        from: env.smtp.auth.user,
        to: receiver,
        subject: subject,
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = {
    sendOtp,
    
}