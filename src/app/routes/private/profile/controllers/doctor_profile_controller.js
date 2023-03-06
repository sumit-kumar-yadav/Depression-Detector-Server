const DoctorDetail = require('../../../../engine/models/doctor_details');
const { v4 : uuidv4 } = require('uuid');
const { api, apiError } = require('../../../../helpers/format_response');


const postDoctorDetails = async (req, res) => {
    try {

        const detailsExist = await DoctorDetail.findOne({user: req.user._id});

        if(detailsExist) throw "Doctor details already exist."

        // TODO: Upload avatar


        const doctorData = { 
            uuid: uuidv4(),
            user: req.user._id,
            // avatar,
            address: {
                street: req.body.street, 
                city: req.body.city, 
                pincode: req.body.pincode, 
                state: req.body.state, 
                country: req.body.country
            },
            degree: req.body.degree,  // Arrray
            highest_qualification: req.body.highest_qualification,
            specialist: req.body.specialist,
            experience_in_yrs: req.body.experience_in_yrs,
            per_session_fee: req.body.per_session_fee,
            discount: req.body.discount ? req.body.discount : 0,
            website: req.body.website ? req.body.website : null,
            opening_hours: req.body.opening_hours? req.body.opening_hours : []

        }

        const doctorDetails = await DoctorDetail.create(doctorData);

        return api("Details added successfully", res, doctorDetails);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

const putDoctorDetails = async (req, res) => {
    try {

        // TODO: Update avatar


        const doctorDetails = await DoctorDetail.findOne({user: req.user._id});

        if(!doctorDetails) throw "Doctor details not found.";

        const doctorData = { 
            // avatar,
            address: {
                street: req.body.street ? req.body.street : doctorDetails.address.street, 
                city: req.body.city ? req.body.city : doctorDetails.address.city, 
                pincode: req.body.pincode ? req.body.pincode : doctorDetails.address.pincode, 
                state: req.body.state ? req.body.state : doctorDetails.address.state, 
                country: req.body.country ? req.body.country : doctorDetails.country
            },
            degree: req.body.degree ?  req.body.degree : doctorDetails.degree,  // Arrray
            highest_qualification: req.body.highest_qualification,
            specialist: req.body.specialist,
            experience_in_yrs: req.body.experience_in_yrs,
            per_session_fee: req.body.per_session_fee,
            discount: req.body.discount ? req.body.discount : 0,
            website: req.body.website ? req.body.website : null,
            opening_hours: req.body.opening_hours? req.body.opening_hours : null
        }

        const updatedDoctorDetails = await DoctorDetail.findByIdAndUpdate(doctorDetails.id, doctorData, { new: true });

        return api("Details updated successfully", res, updatedDoctorDetails);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}


module.exports = {
    postDoctorDetails,
    putDoctorDetails
}