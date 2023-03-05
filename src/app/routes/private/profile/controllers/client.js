const ClientDetail = require('../../../../engine/models/client_details');
const { v4 : uuidv4 } = require('uuid');


const postClientDetails = async (req, res) => {
    try {
        const { street, city, pincode, state, country } = req.body;

        // TODO: Upload avatar


        const clientData = { 
            uuid: uuidv4(),
            user: req.user.id,
            // avatar,
            account_type : 'public',
            street, 
            city, 
            pincode, 
            state, 
            country 
        }

        const clientDetails = await ClientDetail.create(clientData);

        return api("Details added successfully", res, clientDetails);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

const putClientDetails = async (req, res) => {
    try {
        const { street, city, pincode, state, country } = req.body;

        // TODO: Update avatar


        const clientDetails = await ClientDetail.findById({user: req.user.id});

        if(!clientDetails) throw "Client details not found.";

        const clientData = { 
            // avatar,
            account_type: account_type ? account_type : clientDetails.account_type,
            street: street ? street : clientDetails.street, 
            city: city ? city : clientDetails.city, 
            pincode: pincode ? pincode : clientDetails.pincode, 
            state : state ? state : clientDetails.state, 
            country: country ? country : clientDetails.country
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