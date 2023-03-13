const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../../../../engine/models/user');
const { generateAuthToken, deleteExpiredTokens } = require('../../../../helpers/handle_jwt_token');
const { api, apiError } = require('../../../../helpers/format_response');

const postSignup = async (req, res) => {
    try {
        
        const { 
            first_name, last_name, 
            email, password, 
            gender, timezone,
            phone_code, phone_number,
            confirm_password, 

        } = req.body;

        if(password != confirm_password) throw "Password mismatched";

        const userData = {
            uuid: uuidv4(),
            first_name,
            last_name,
            email,
            phone_code: phone_code || null,
            phone_number: phone_number || null,
            password: await bcrypt.hash(password, 8),
            status: 'active',
            timezone: timezone || 'Asia/Kolkata',
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

        user.auth_tokens.push({ token: authToken});
        await user.save();

        return api('Signed up successfully', res, { token: authToken }, 201);

    } catch (error) {
        return apiError(String(error), res, {}, 500);
    }
}


const postSignin = async (req, res) => {
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

        user.auth_tokens.push({ token: authToken});
        await user.save();

        // Delete the Expired token
        await deleteExpiredTokens(user._id);

        return api('Signed in successfully', res, { token: authToken });

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

module.exports = {
    postSignup,
    postSignin,
}