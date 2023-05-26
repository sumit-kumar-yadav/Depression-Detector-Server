const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
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
    appointment_status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "completed", "expired", "cancelled-by-client", "cancelled-by-doctor"]
    },
    appointment_date: {   // Store date and time
        type: Date,
    },
    appointment_notes: {
        type: String,
    },
    appointment_description: {
        type: String,
    },

    
},{
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;