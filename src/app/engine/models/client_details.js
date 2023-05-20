const mongoose = require('mongoose');
const address = require('./address');


const clientDetailSchema = new mongoose.Schema({
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
    account_type: {
        type: String,
        required: true,
        enum: ["private", "public"]
    },
    address: address

}, {
    timestamps: true
});

// To abe able to run geo queries of mongoosex
clientDetailSchema.index({ 'address.location': '2dsphere' });

const ClientDetail = mongoose.model('ClientDetail', clientDetailSchema);

module.exports = ClientDetail;