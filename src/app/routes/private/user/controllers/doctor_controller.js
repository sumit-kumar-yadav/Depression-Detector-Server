const DoctorDetail = require('../../../../engine/models/doctor_details');
const User = require('../../../../engine/models/user');
const UserDetail = require('../../../../engine/models/user_details');
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

const getAllDoctors = async (req, res) => {
    try {
        
        const userDetails = await UserDetail.find({role: 'doctor'})
                                .populate('user_details');

        const doctors = await Promise.all(userDetails.map(async (userDetail)=>{
            let user = await User.findById(userDetail.user);
            user = user.toJSON();
            user.role = userDetail.role;
            user.details = userDetail.user_details;
            return user;
        }))

        return api("All doctors fetched successfully", res, doctors);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}


module.exports = {
    getNearByDoctors,
    getAllDoctors,
}