const mongoose = require('mongoose');
const address = require('./address');


const doctorDetailSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avatar: String,
    address: address,
    degree: {
        type: Array,
        default: []
      },
    highest_qualification: {
        type: String,
        required: true
    },
    specialist: {
        type: String,
        required: true
    },
    experience_in_yrs: {
        type: Number,
        required: true
    },
    per_session_fee: {
        type: String,
        required: true
    },
    discount: {
        type: Number
    },
    website: String,
    opening_hours: [
        {
            day: {type: Date}, //mon - sun,
            working_day: { type: String, enum: ["yes", "no"] },
            periods: [{
                start: {type: Date},  // Store only time
                end: {type: Date}     // Store only time
            }]
        }
    ],
    isVerified: {  // should be verified by the admins
        type: String,
        required: true,
        enum: ["verified", "not verified"],
        default: "not verified"
    }


}, {
    timestamps: true
});




const DoctorDetail = mongoose.model('DoctorDetail', doctorDetailSchema);

module.exports = DoctorDetail;