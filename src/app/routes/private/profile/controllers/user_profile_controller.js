const bcrypt = require('bcryptjs');
const UserDetail = require('../../../../engine/models/user_details');
const { api, apiError } = require('../../../../helpers/format_response');


const getUserProfile = async (req, res) => {
    try {
        
        const userDetail = await UserDetail.findOne({user: req.user._id})
                                .populate('user_details');
        
        const user = req.user.toJSON();
        user.role = userDetail.role;
        user.details = userDetail.user_details;

        return api("Users details fetched successfully", res, user);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

const putUserPassword = async (req, res) => {
    try {

        const { old_password, new_password, confirm_password } = req.body;

        const isMatch = await bcrypt.compare(old_password, req.user.password);

        if (!isMatch) throw "Incorrect password";

        if (new_password !== confirm_password) 
            throw "Passwords do not match";
        
        req.user.password = new_password;
        req.user.save();

        return api("Password changed successfully", res, {});


    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

const getLogout = async (req, res) => {
    try {

        // Remove the current token from the user's auth_token array
        req.user.auth_tokens = req.user.auth_tokens.filter((obj) => obj.token != req.token);

        await req.user.save();

        return api("Logged out successfully", res, {});

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

const getLogoutAll = async (req, res) => {
    try {

        // Remove all the tokens from the user's auth_token array
        req.user.auth_tokens = [];

        await req.user.save();

        return api("Logged out successfully from all the devices", res, {});

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}


module.exports = {
    getUserProfile,
    putUserPassword,
    getLogout,
    getLogoutAll
}