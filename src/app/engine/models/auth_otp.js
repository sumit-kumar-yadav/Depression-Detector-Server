const mongoose = require('mongoose');


const authOtpSchema = new mongoose.Schema({
    username: {
        type: String,  // can be either email id or phone number
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    is_valid: {
        type: Boolean,
        required: true
    }
    
},{
    timestamps: true
});

const AuthOtp = mongoose.model('AuthOtp', authOtpSchema);
module.exports = AuthOtp;