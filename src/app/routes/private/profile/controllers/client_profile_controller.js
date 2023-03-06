const ClientDetail = require('../../../../engine/models/client_details');
const { v4 : uuidv4 } = require('uuid');
const { api, apiError } = require('../../../../helpers/format_response');


const postClientDetails = async (req, res) => {
    try {
        const { street, city, pincode, state, country } = req.body;

        const detailsExist = await ClientDetail.findOne({user: req.user._id});

        if(detailsExist) throw "Client details already exist."

        // TODO: Upload avatar


        const clientData = { 
            uuid: uuidv4(),
            user: req.user._id,
            // avatar,
            account_type : 'public',
            address: {
                street, 
                city, 
                pincode, 
                state, 
                country
            } 
        }

        const clientDetails = await ClientDetail.create(clientData);

        return api("Details added successfully", res, clientDetails);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

const putClientDetails = async (req, res) => {
    try {
        const { account_type, street, city, pincode, state, country } = req.body;

        // TODO: Update avatar


        const clientDetails = await ClientDetail.findOne({user: req.user._id});

        if(!clientDetails) throw "Client details not found.";

        const clientData = { 
            // avatar,
            account_type: account_type ? account_type : clientDetails.account_type,
            address: {
                street: street ? street : clientDetails.address.street, 
                city: city ? city : clientDetails.address.city, 
                pincode: pincode ? pincode : clientDetails.address.pincode, 
                state : state ? state : clientDetails.address.state, 
                country: country ? country : clientDetails.address.country
            }
        }

        const updatedClientDetails = await ClientDetail.findByIdAndUpdate(clientDetails.id, clientData, { new: true });

        return api("Details added successfully", res, updatedClientDetails);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}


module.exports = {
    postClientDetails,
    putClientDetails
}