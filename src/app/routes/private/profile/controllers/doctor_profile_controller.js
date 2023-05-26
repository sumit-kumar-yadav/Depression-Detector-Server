const DoctorDetail = require('../../../../engine/models/doctor_details');
const UserDetail = require('../../../../engine/models/user_details');
const { v4 : uuidv4 } = require('uuid');
const { api, apiError } = require('../../../../helpers/format_response');
const { processBufferImage } = require('../../../../helpers/upload_helper');


const postDoctorDetails = async (req, res) => {
    try {
        const { street, city, pincode, state, country, latitude, longitude, dob } = req.body;

        const detailsExist = await UserDetail.findOne({user: req.user._id});

        if(detailsExist) throw "Your details already exist."


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
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },
            degree: req.body.degree,  // Arrray
            highest_qualification: req.body.highest_qualification,
            specialist: req.body.specialist,
            experience_in_yrs: req.body.experience_in_yrs,
            per_session_fee: req.body.per_session_fee,
            discount: req.body.discount || 0,
            website: req.body.website || null,
            off_days: req.body.off_days || [],  // Arrray

        }

        // If image is present
        if(req.file){
            doctorData.avatar = await processBufferImage(req.file.buffer);
        }

        const doctorDetails = await DoctorDetail.create(doctorData);

        await UserDetail.create({
            user: req.user._id,
            role: "doctor",
            user_details: doctorDetails._id,
            onModel: 'DoctorDetail'
        })

        return api("Details added successfully", res, doctorDetails);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

const putDoctorDetails = async (req, res) => {
    try {

        const { latitude, longitude } = req.body;
        const doctorDetails = await DoctorDetail.findOne({user: req.user._id});

        if(!doctorDetails) throw "Doctor details not found.";

        const doctorData = { 
            dob: req.body.dob ? new Date(req.body.dob) : doctorDetails.dob,
            address: {
                street: req.body.street || doctorDetails.address.street, 
                city: req.body.city || doctorDetails.address.city, 
                pincode: req.body.pincode || doctorDetails.address.pincode, 
                state: req.body.state || doctorDetails.address.state, 
                country: req.body.country || doctorDetails.country
            },
            location: (latitude && longitude) ? {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            }   : clientDetails.location,
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
    putDoctorDetails,
}