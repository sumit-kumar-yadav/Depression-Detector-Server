const { api, apiError } = require('../../../../helpers/format_response');


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
    getLogout,
    getLogoutAll
}