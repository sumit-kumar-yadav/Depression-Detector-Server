const jwt = require('jsonwebtoken');
const env = require('../engine/config/env');
const User = require('../engine/models/user');

module.exports.generateAuthToken = (payload) => {
    try {

        return jwt.sign(payload, env.jwt_secret, {expiresIn:  `${env.auth_token_expiry_hour}h`});

    } catch (error) {
        throw String(error);
    }
}

module.exports.deleteExpiredTokens = async (id) => {
    try {

        const user = await User.findById(id);

        user.auth_tokens = user.auth_tokens.filter(({token}) => {
            let isValidToken = true;
            jwt.verify(token, env.jwt_secret, (err, decoded) => {
                if(err) isValidToken = false; // Token is expired / Incorrect token stored
            });
            return isValidToken;
        })
        await user.save();
        return;

    } catch (e) {
        console.log(e);
    }
}