const env = require('../config/env');
const User = require('../models/user');
const { apiError } = require('../../helpers/format_response');
const jwt = require('jsonwebtoken');


const authenticateUser = async (req, res, next) => {
    try {

        // Get token from header and verify it
        let headerToken = req.header('Authorization');

        if (!headerToken) throw "Authentication Failed, Please ensure you have logged in."

        const token = headerToken.replace('Bearer ', '');

        if(!token) throw "Invalid token";

        const verifiedToken = jwt.verify(token, env.jwt_secret);

        if (!verifiedToken) throw "Authentication Failed, Please ensure you have logged in."

        // Set user data in res.locals, to be used in controllers
        var user = await User.findOne({ uuid: verifiedToken.uuid });

        if (!user) throw "User not found. Please sign up."

        req.user = user.toJSON();

        // res.locals.user = req.user;

        next();

    } catch (e) {

        return apiError(String(e), res, {}, 500);
    }
}

module.exports = {
    authenticateUser
}