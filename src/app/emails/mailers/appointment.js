const { transporter, renderTemplate } = require('../../engine/config/nodemailer');
const env = require('../../engine/config/env');

const sendRequestAppointmentToDr = (doctor, client) => {

    let htmlString = renderTemplate({doctor, client}, '/appointment/request_appointment.ejs');
    
    transporter.sendMail({
        from: env.smtp.auth.user,
        to: doctor.email,
        subject: "Comfirm new appointment",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log('Email sent to doctor: ' + info.response);
        }
    })
}

module.exports = {
    sendRequestAppointmentToDr,
}