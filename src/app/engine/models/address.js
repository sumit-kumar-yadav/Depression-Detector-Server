const mongoose = require('mongoose');

const address = new mongoose.Schema({
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
    street: {
        type: String,
        required: true
    },
    city:  {
        type: String,
        required: true
    },
    pincode:  {
        type: String,
        required: true
    },
    state:  {
        type: String,
        required: true
    },
    country:  {
        type: String,
        required: true
    }
});

module.exports = address;