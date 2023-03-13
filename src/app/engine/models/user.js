const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone_code: {
        type: String
    },
    phone_number: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"]
    },
    timezone: {
        type: String,
        required: true,
        default: 'Asia/Kolkata'
    },
    email_verified: {
        type: Boolean,
        required: true,
        default: false
    },
    phone_verified: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        required: true,
        enum: ["active", "in-active", "grey-list"]
    },
    auth_tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

}, {
    timestamps: true
});




const User = mongoose.model('User', userSchema);

module.exports = User;