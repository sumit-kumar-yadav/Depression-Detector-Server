const env = require('../config/env');
const User = require('../models/user');
const { apiError } = require('../../helpers/format_response');
const jwt = require('jsonwebtoken');


const authenticateUser = async (req, res, next) => {
    try {

        // Get token from header and verify it
        let headerToken = req.header('Authorization');

        if (!headerToken) throw "Authentication Failed"

        const token = headerToken.replace('Bearer ', '');

        if(!token) throw "Authentication Failed";

        let decoded;
        jwt.verify(token, env.jwt_secret, (err, decodedData) => {
            if(err) throw "Invalid auth token. Please Sign in...";
            else decoded = decodedData;
        });

        // Set user data in res.locals, to be used in controllers
        var user = await User.findOne({ uuid: decoded.uuid });
        if (!user) throw "User not found. Please sign up."

        user = await User.findOne({ uuid: decoded.uuid, 'auth_tokens.token': token });
        if (!user) throw "Session expired. Please login again..."

        req.user = user;
        req.token = token

        next();

    } catch (e) {
        return apiError(String(e), res, {});
    }
}

module.exports = {
    authenticateUser
}