const { transporter, renderTemplate } = require('../../engine/config/nodemailer');

const sendOtp = (subject, otp, receiver) => {

    let htmlString = renderTemplate({otp}, '/otp/verify_new_user.ejs');

    transporter.sendMail({
        from: 'dummyemail@gmail.com',
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