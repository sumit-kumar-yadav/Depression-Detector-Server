const jwt = require('jsonwebtoken');
const env = require('../engine/config/env');

module.exports.generateAuthToken = async (payload) => {
    try {

        const token = jwt.sign(payload, env.jwt_secret, {expiresIn:  `${env.auth_token_expiry_hour}h`});
        return token;

    } catch (error) {
        throw String(error);
    }
}