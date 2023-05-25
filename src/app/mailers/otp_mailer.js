const nodeMailer = require('../engine/config/nodemailer');

const sendOtp = (subject, otp) => {
    nodeMailer.transporter.sendMail({
        from: 'dummyemail@gmail.com',
        to: 'dummyreceiveremail@gmail.com',
        subject: subject,
        text: `This is your OTP - ${otp}`
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