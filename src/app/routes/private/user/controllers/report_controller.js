const Report = require('../../../../engine/models/report');
const Appointment = require('../../../../engine/models/appointment');
const User = require('../../../../engine/models/user');
const { api, apiError } = require('../../../../helpers/format_response');
const { processBufferImage } = require('../../../../helpers/upload_helper');
const { sendReportToClient } = require('../../../../emails/mailers/report');


const postReport = async (req, res) => {
    try {

        const { appointmentId } = req.params;
        const { description, suggestion } = req.body;

        if(!req.file) throw "Please upload the report image";

        const appointment = await Appointment.findById(appointmentId);

        if(!appointment) throw "Appointment not found";
        if(appointment.appointment_status != "completed") throw "Appointment is not completed to generate the report";
        if(appointment.doctor.toString() != req.user._id.toString()) throw "You are not autherized to create this report";

        const reportIsAvailable = await Report.findOne({
            client: appointment.client,
            doctor: appointment.doctor,
            appointment: appointmentId,
        });

        if(reportIsAvailable) throw "Report is already created for this appointment";

        const reportData = {
            client: appointment.client,
            doctor: appointment.doctor,
            appointment: appointmentId,
            description,
            suggestion,
            file: await processBufferImage(req.file.buffer)
        }

        const report = await Report.create(reportData);
        const client = await User.findById(appointment.client);
        const doctor = req.user;

        sendReportToClient(doctor, client, report);

        return api("Report created successfully", res, report);
        
    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}


module.exports = {
    postReport,
}