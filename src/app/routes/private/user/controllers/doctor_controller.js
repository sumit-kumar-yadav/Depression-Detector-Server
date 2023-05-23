const DoctorDetail = require('../../../../engine/models/doctor_details');
const { api, apiError } = require('../../../../helpers/format_response');


const getNearByDoctors = async (req, res) => {
    try {
        const { latitude, longitude, range } = req.query;

        let doctorDetails = await DoctorDetail.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)] // Specify the coordinates of the reference point
                    },
                    $maxDistance: range // Specify the maximum distance in meters
                }
            }
        }).populate('user')

        return api("All the avaiable nearby doctors.", res, doctorDetails);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}




module.exports = {
    getNearByDoctors,
}