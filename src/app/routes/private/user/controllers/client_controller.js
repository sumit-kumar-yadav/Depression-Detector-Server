const User = require('../../../../engine/models/user');
const UserDetail = require('../../../../engine/models/user_details');
const { api, apiError } = require('../../../../helpers/format_response');


const getAllClients = async (req, res) => {
    try {
        
        const userDetails = await UserDetail.find({role: 'client'})
                                .populate('user_details');

        const clients = await Promise.all(userDetails.map(async (userDetail)=>{
            let user = await User.findById(userDetail.user);
            user = user.toJSON();
            user.role = userDetail.role;
            user.details = userDetail.user_details;
            return user;
        }))

        return api("All clients fetched successfully", res, clients);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}


module.exports = {
    getAllClients,
}