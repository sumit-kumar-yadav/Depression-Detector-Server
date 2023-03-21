const mongoose = require('mongoose');


const userDetailSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ["client", "doctor", "admin", "super-admin"]
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user_details: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'   // dynamic reference of parent
    },
    onModel: {
        type: String,
        required: true,
        enum: ['ClientDetail', 'DoctorDetail']
    }

}, {
    timestamps: true
});




const UserDetail = mongoose.model('UserDetail', userDetailSchema);

module.exports = UserDetail;