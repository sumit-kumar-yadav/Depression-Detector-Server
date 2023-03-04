const jwt = require('jsonwebtoken');
const env = require('../engine/config/env');

module.exports.generateAuthToken = (payload) => {
    try {

        return jwt.sign(payload, env.jwt_secret, {expiresIn:  `${env.auth_token_expiry_hour}h`});

    } catch (error) {
        throw String(error);
    }
}