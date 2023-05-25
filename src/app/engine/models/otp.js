const mongoose = require('mongoose');


const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;