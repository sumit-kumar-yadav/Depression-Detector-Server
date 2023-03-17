const DoctorDetail = require('../../../../engine/models/doctor_details');
const { v4 : uuidv4 } = require('uuid');
const { api, apiError } = require('../../../../helpers/format_response');
const { processBufferImage } = require('../../../../helpers/upload_helper');


const postDoctorDetails = async (req, res) => {
    try {
        const { street, city, pincode, state, country, dob, avatar } = req.body;

        const detailsExist = await DoctorDetail.findOne({user: req.user._id});

        if(detailsExist) throw "Doctor details already exist."


        const doctorData = { 
            uuid: uuidv4(),
            user: req.user._id,
            dob: dob ? new Date(dob) : null,   // dob can be '1990-03-13'
            address: {
                street, 
                city, 
                pincode, 
                state, 
                country
            },
            degree: req.body.degree,  // Arrray
            highest_qualification: req.body.highest_qualification,
            specialist: req.body.specialist,
            experience_in_yrs: req.body.experience_in_yrs,
            per_session_fee: req.body.per_session_fee,
            discount: req.body.discount || 0,
            website: req.body.website || null,
            off_days: req.body.off_days || [],

        }

        // If image is present
        if(req.file){
            doctorData.avatar = await processBufferImage(req.file.buffer);
        }

        const doctorDetails = await DoctorDetail.create(doctorData);

        return api("Details added successfully", res, doctorDetails);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

const putDoctorDetails = async (req, res) => {
    try {

        const doctorDetails = await DoctorDetail.findOne({user: req.user._id});

        if(!doctorDetails) throw "Doctor details not found.";

        const doctorData = { 
            dob: dob ? new Date(dob) : doctorDetails.dob,
            address: {
                street: req.body.street || doctorDetails.address.street, 
                city: req.body.city || doctorDetails.address.city, 
                pincode: req.body.pincode || doctorDetails.address.pincode, 
                state: req.body.state || doctorDetails.address.state, 
                country: req.body.country || doctorDetails.country
            },
            degree: req.body.degree || doctorDetails.degree,  // Arrray
            highest_qualification: req.body.highest_qualification,
            specialist: req.body.specialist,
            experience_in_yrs: req.body.experience_in_yrs,
            per_session_fee: req.body.per_session_fee,
            discount: req.body.discount ? req.body.discount : 0,
            website: req.body.website ? req.body.website : null,
            off_days: req.body.off_days || doctorDetails.off_days,

        }

        // If image is present
        if(req.file){
            doctorData.avatar = await processBufferImage(req.file.buffer);
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