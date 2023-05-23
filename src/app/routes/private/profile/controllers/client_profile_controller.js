const ClientDetail = require('../../../../engine/models/client_details');
const UserDetail = require('../../../../engine/models/user_details');
const ClientHealth = require('../../../../engine/models/client_health');
const { v4 : uuidv4 } = require('uuid');
const { api, apiError } = require('../../../../helpers/format_response');
const { processBufferImage } = require('../../../../helpers/upload_helper');


const postClientDetails = async (req, res) => {
    try {
        const { street, city, pincode, state, country, latitude, longitude, dob } = req.body;

        const detailsExist = await UserDetail.findOne({user: req.user._id});

        if(detailsExist) throw "Your details already exist."

        const clientData = { 
            uuid: uuidv4(),
            user: req.user._id,
            dob: dob ? new Date(dob) : null,   // dob can be '1990-03-13'
            account_type : 'public',
            address: {
                street, 
                city, 
                pincode, 
                state, 
                country
            },
            location: (latitude && longitude) ? {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            }: {
                type: 'Point',
                coordinates: [0, 0]
            },
            is_location_turned_on: (latitude && longitude) ? true : false
        }

        // If image is present
        if(req.file){
            clientData.avatar = await processBufferImage(req.file.buffer);
        }

        const clientDetails = await ClientDetail.create(clientData);

        await ClientHealth.create({user: req.user._id});

        await UserDetail.create({
            user: req.user._id,
            role: "client",
            user_details: clientDetails._id,
            onModel: 'ClientDetail'
        })

        return api("Details added successfully", res, clientDetails);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

const putClientDetails = async (req, res) => {
    try {
        const { account_type, street, city, pincode, state, country, latitude, longitude, dob } = req.body;

        const clientDetails = await ClientDetail.findOne({user: req.user._id});

        if(!clientDetails) throw "Client details not found.";

        const clientData = { 
            dob: dob ? new Date(dob) : clientDetails.dob,
            account_type: account_type || clientDetails.account_type,
            address: {
                street: street || clientDetails.address.street, 
                city: city || clientDetails.address.city, 
                pincode: pincode || clientDetails.address.pincode, 
                state : state || clientDetails.address.state, 
                country: country || clientDetails.address.country
            },
            location: (latitude && longitude) ? {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            }   : clientDetails.location,
            is_location_turned_on: (latitude && longitude) ? true : false,

        }

        // If image is present
        if(req.file){
            console.log("Image updated successfully");
            clientData.avatar = await processBufferImage(req.file.buffer);
        }

        const updatedClientDetails = await ClientDetail.findByIdAndUpdate(clientDetails.id, clientData, { new: true });

        return api("Details updated successfully", res, updatedClientDetails, 201);

    } catch (e) {
        console.log(e)
        return apiError(String(e), res, {}, 500);
    }
}


module.exports = {
    postClientDetails,
    putClientDetails
}