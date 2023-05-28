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

const sendAppointmentStatusToClient = (doctor, client, status) => {
    let htmlString = renderTemplate({doctor, client, status}, '/appointment/client_appointment_status.ejs');

    transporter.sendMail({
        from: env.smtp.auth.user,
        to: client.email,
        subject: "Appointment status update",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log('Email sent to client: ' + info.response);
        }
    })
}

const sendAppointmentStatusToDr = (doctor, client, status) => {
    let htmlString = renderTemplate({doctor, client, status}, '/appointment/doctor_appointment_status.ejs');

    transporter.sendMail({
        from: env.smtp.auth.user,
        to: doctor.email,
        subject: "Appointment status update",
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
    sendAppointmentStatusToClient,
    sendAppointmentStatusToDr
}