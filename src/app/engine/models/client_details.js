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
    address: address,
    location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number],  // [longitude, latitude]
        }
    },
    is_location_turned_on: Boolean

}, {
    timestamps: true
});

// To abe able to run geo queries of mongoosex
clientDetailSchema.index({ 'location': '2dsphere' });

const ClientDetail = mongoose.model('ClientDetail', clientDetailSchema);

module.exports = ClientDetail;