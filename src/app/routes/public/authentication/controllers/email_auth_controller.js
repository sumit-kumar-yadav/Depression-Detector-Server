const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../../../../engine/models/user');
const { generateAuthToken } = require('../../../../helpers/jwt_token_generator');
const { api, apiError } = require('../../../../helpers/format_response');

module.exports.postSignup = async (req, res) => {
    try {
        
        const { first_name, last_name, email, password, gender, timezone } = req.body;

        const userData = {
            uuid: uuidv4(),
            first_name,
            last_name,
            email,
            phone_code: req.body.phone_code ? req.body.phone_code : null,
            phone_number: req.body.phone_number ? req.body.phone_number : null,
            password: await bcrypt.hash(password, 8),
            status: 'active',
            timezone: req.body.timezone ? req.body.timezone : 'Asia/Kolkata',
            gender
        }

        const user = await User.create(userData);

        const authToken = generateAuthToken({
            uuid: user.uuid,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            gender: user.gender
        });

        return api('Signed up successfully', res, { token: authToken });

    } catch (error) {
        return apiError(String(error), res, {}, 500);
    }
}


module.exports.postSignin = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(!user) throw "Incorrect email or password";

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw "Incorrect email or password";

        if (user.status == 'in-active') throw "Your account is de-activated";

        const authToken = generateAuthToken({
            uuid: user.uuid,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            gender: user.gender
        });

        return api('Signed in successfully', res, { token: authToken });

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}