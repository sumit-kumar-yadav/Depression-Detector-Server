const mongoose = require('mongoose');


const clientHealthSchema = new mongoose.Schema({
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mood: {
        type: String,
        enum: ["Happy", "Sad", "Anxious", "Depressed", "Stressed", "Angry", "Calm", "Satisfied", "Amushed", "Disgust"]
    },
    quote: {
        type: String,
    },
    mental_status: {
        depression: {
            type: Boolean,
            default: false
        },
        anxiety: {
            type: Boolean,
            default: false
        },
        stress: {
            type: Boolean,
            default: false
        },
    }

}, {
    timestamps: true
});




const ClientHealth = mongoose.model('ClientHealth', clientHealthSchema);

module.exports = ClientHealth;