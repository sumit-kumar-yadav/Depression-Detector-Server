const User = require('../../../../engine/models/user');
const Appointment = require('../../../../engine/models/appointment');
const { api, apiError } = require('../../../../helpers/format_response');
const { sendRequestAppointmentToDr, sendAppointmentStatusToClient, sendAppointmentStatusToDr } = require('../../../../emails/mailers/appointment');

const checkExpiredAppointments = async (req) => {
    try {
        const clientTimezoneOffset = req.headers['timezone-offset'];
        const currentDate = new Date();
        let adjustedCurrentDate = currentDate;

        if (clientTimezoneOffset != currentDate.getTimezoneOffset()) {
            // Calculate the adjusted current date based on the client's timezone offset
            adjustedCurrentDate = new Date(currentDate.getTime() + (clientTimezoneOffset * 60000)); // Multiply by 60000 to convert minutes to milliseconds
        }

        const expiredAppointments = await Appointment.find({
            $and: [
                { appointment_date: { $lt: adjustedCurrentDate } },
                { $or: [
                    { appointment_status: 'pending' },
                    { appointment_status: 'accepted' }
                ] }
            ]
        });

        if(expiredAppointments && expiredAppointments.length > 0){
            await Promise.all(expiredAppointments.forEach(async (appointment) => {
                appointment.appointment_status = 'expired';
                await appointment.save();
            }))
        }

    } catch (e) {
        console.log(e);
    }
}

// client api
const getRequestAppointment = async (req, res) => {
    try {
        
        const client = req.user;

        const { doctorId } = req.params;

        const doctor = await User.findById(doctorId);

        if (!doctor) throw "Doctor not found";

        await checkExpiredAppointments(req);

        // If appointment is already accepted, then return 
        let upcomingAppointment = await Appointment.findOne({
            client: client._id,
            doctor: doctor._id,
            appointment_status: 'accepted'
        });

        if (upcomingAppointment) throw "Appoint is already booked and it's acccepted.";

        let data = {
            client: client._id,
            doctor: doctor._id,
            appointment_status: 'pending'
        }

        let pendingAppointment = await Appointment.findOne(data);

        if(!pendingAppointment){
            pendingAppointment = await Appointment.create(data);
        }

        sendRequestAppointmentToDr(doctor, client);

        return api("Appointment request sent successfully", res, pendingAppointment);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

// doctor api
const putPendingAppointment = async (req, res) => {
    try {
        const { appointment_status, appointment_date, appointment_notes, appointment_description } = req.body;

        const { clientId } = req.params;

        const appointment = await Appointment.findOne({
            client: clientId,
            doctor: req.user._id,
            appointment_status: "pending",
        });

        if(!appointment) throw "No pending appointment found.";

        appointment.appointment_status = appointment_status; // accepted, rejected
        appointment.appointment_notes = appointment_notes;

        if(appointment_status == 'accepted') {
            if(!appointment_date || !appointment_description) throw "Both appointment date and description are required to accept appointment"
            appointment.appointment_date = new Date(appointment_date);
            appointment.appointment_description = appointment_description;
        }

        await appointment.save();

        const doctor = req.user;
        const client = await User.findById(clientId);
        sendAppointmentStatusToClient(doctor, client, appointment.appointment_status);

        return api(`Appointment ${appointment_status}`, res, appointment);

    } catch (e) {
        console.log(e);
        return apiError(String(e), res, {}, 500);
    }
}

// doctor api 
const putAcceptedAppointment = async (req, res) => {
    try {
        const { appointment_status } = req.body;
        const { clientId } = req.params;

        const appointment = await Appointment.findOne({
            client: clientId,
            doctor: req.user._id,
            appointment_status: "accepted"
        });

        if(!appointment) throw "Appointment is not accepted yet to proceed further."

        appointment.appointment_status = appointment_status; // rejected, completed

        await appointment.save();

        const doctor = req.user;
        const client = await User.findById(clientId);
        sendAppointmentStatusToClient(doctor, client, appointment.appointment_status);

        return api(`Appointment ${appointment_status}`, res, appointment);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

// doctor api 
const postGetAppointments = async (req, res) => {
    try {

        const { appointment_status } = req.body;

        checkExpiredAppointments(req);

        let appointmentData = {
            doctor: req.user._id,
        }

        if(appointment_status) appointmentData.appointment_status = appointment_status;

        const appointment = await Appointment.find(appointmentData)
                                .populate('client');

        return api("Appointments", res, appointment);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

// client Api
const putCancelAppointment = async (req, res) => {
    try {
        
        const { doctorId } = req.params;

        const appointment = await Appointment.findOne({
            client: req.user._id,
            doctor: doctorId,
            appointment_status: {
                $in: ['accepted', 'pending']
            }
        });

        if(!appointment) throw "No accepted or pending appointment found";

        appointment.appointment_status = "cancelled-by-client";

        await appointment.save();

        const client = req.user;
        const doctor = await User.findById(doctorId);
        sendAppointmentStatusToDr(doctor, client, appointment.appointment_status);

        return api("Appointment is cancelled.", res, appointment);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}


module.exports = {
    getRequestAppointment,
    putPendingAppointment,
    putAcceptedAppointment,
    postGetAppointments,
    putCancelAppointment
}