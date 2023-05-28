const mongoose = require('mongoose');


const reportSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    suggestion: {
        type: String,
        required: true
    },
    file: {
        type: Buffer,
        required: true
    },
},{
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;