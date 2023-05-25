const { transporter, renderTemplate } = require('../../engine/config/nodemailer');
const env = require('../../engine/config/env');

const sendAuthOtp = (otp, receiverEmail) => {

    let htmlString = renderTemplate({otp}, '/otp/verify_new_user.ejs');

    transporter.sendMail({
        from: env.smtp.auth.user,
        to: receiverEmail,
        subject: "Verify your email",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log('Email sent: ' + info.response);
        }
    })
}

const sendOtp = (otp, user) => {

    let htmlString = renderTemplate({otp, user}, '/otp/forgot_password.ejs');

    transporter.sendMail({
        from: env.smtp.auth.user,
        to: user.email,
        subject: "Reset your password",
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
    sendAuthOtp,
    sendOtp,
}