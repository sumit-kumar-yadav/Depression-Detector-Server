const User = require('../../../../engine/models/user');
const { api, apiError } = require('../../../../helpers/format_response');
const { sendRequestAppointmentToDr } = require('../../../../emails/mailers/appointment');


const getRequestAppointment = async (req, res) => {
    try {
        
        const client = req.user;

        const { doctorId } = req.params;

        const doctor = await User.findById(doctorId);

        if (!doctor) throw "Doctor not found";

        sendRequestAppointmentToDr(doctor, client);

        return api("Appointment request sent successfully", res, {});

    } catch (e) {
        console.log(e)
        return apiError(String(e), res, {}, 500);
    }
}


module.exports = {
    getRequestAppointment,
}