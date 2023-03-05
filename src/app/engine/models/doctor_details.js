const mongoose = require('mongoose');
const address = require('./address');


const doctorDetailSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    avatar: String,
    address: address,
    degree: {
        type: Array,
        default: []
      },
    highest_qualification: String,
    specialist: String,
    experience_in_yrs: String,
    per_session_fee: String,
    discount: String,
    website: String,
    opening_hours: [
        {
            day: {type: Date}, //mon - sun,
            periods: [{
                start: {type: Date},  // Store only time
                end: {type: Date}     // Store only time
            }]
        }
    ]


}, {
    timestamps: true
});




const DoctorDetail = mongoose.model('DoctorDetail', doctorDetailSchema);

module.exports = DoctorDetail;