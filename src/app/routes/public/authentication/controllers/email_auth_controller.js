const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../../../../engine/models/user');
const UserDetail = require('../../../../engine/models/user_details');
const AuthOtp = require('../../../../engine/models/auth_otp');
const { generateAuthToken, deleteExpiredTokens } = require('../../../../helpers/handle_jwt_token');
const { api, apiError } = require('../../../../helpers/format_response');
const { sendOtp } = require('../../../../emails/mailers/otp_mailer');


const verifyEmail = async (email, otp, res) => {
    try {
        let authOtp = await AuthOtp.findOne({
            username: email,
            otp,
            is_valid: true
        });

        if(authOtp){
            // TODO: check the auth otp is not older than 5 min
            // if auth otp is older than 5 min, then invalidate the auth otp

            // Delete the current otp 
            await AuthOtp.deleteOne({
                username: email,
                otp
            });
            return true
        }
        else return false;

    } catch (e) {
        console.log(e);
    }
}


const postSignup = async (req, res) => {
    try {
        
        const { 
            first_name, last_name, 
            email, password, 
            gender, timezone,
            phone_code, phone_number,
            confirm_password, 
            email_otp

        } = req.body;

        let isOtpVerified = await verifyEmail(email, email_otp, res);

        if(!isOtpVerified) throw `Invalid OTP`;

        if(password != confirm_password) throw "Password mismatched";

        const userData = {
            uuid: uuidv4(),
            first_name,
            last_name,
            email,
            phone_code: phone_code || null,
            phone_number: phone_number || null,
            password: await bcrypt.hash(password, 8),
            email_verified: true,
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

        let resData = { 
            token: authToken,
            ...user.toJSON(),
            role: null,
            details: null
        };

        return api('Signed up successfully', res, resData, 201);

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

        // Send all the details of the logged-in user
        const userDetail = await UserDetail.findOne({user: user._id})
                                .populate('user_details');
        
        let resData = { 
            token: authToken,
            ...user.toJSON(),
            role: userDetail ? userDetail.role : null,
            details: userDetail ? userDetail.user_details : null
        };

        return api('Signed in successfully', res, resData);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

const postCreateOtp = async (req, res) => {
    try {
        // 6 digit otp
        const otp = Math.random().toString().substr(2, 6);

        const { email } = req.body;

        // Delete the previous created otps
        await AuthOtp.deleteMany({ username: email });

        await AuthOtp.create({
            username: email,
            otp,
            is_valid: true
        });

        // Mail the created OTP to the user
        sendOtp("Verify your email", otp, email);

        return api('OTP is created successfully', res, {}, 201);

    } catch (e) {
        return apiError(String(e), res, {}, 500);
    }
}

module.exports = {
    postSignup,
    postSignin,
    postCreateOtp,
}