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
    avatar: Buffer,
    dob: Date,
    address: address,
    location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
          required: true
        },
        coordinates: {
          type: [Number],  // [longitude, latitude]
          required: true
        }
    },
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
    off_days: {
        type: [String]
    },
    // opening_hours: [
    //     {
    //         day: {
    //             type: String, 
    //             enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    //         },
    //         working_day: { type: String, enum: ["yes", "no"] },
    //         periods: [{
    //             start: {type: Date},  // Store only time
    //             end: {type: Date}     // Store only time
    //         }]
    //     }
    // ],
    isVerified: {  // should be verified by the admins
        type: Boolean,
        required: true,
        default: false
    }


}, {
    timestamps: true
});


// To abe able to run geo queries of mongoosex
doctorDetailSchema.index({ 'location': '2dsphere' });

const DoctorDetail = mongoose.model('DoctorDetail', doctorDetailSchema);

module.exports = DoctorDetail;