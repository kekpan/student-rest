const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    tax: {
        type: Boolean,
        required: true
    },
    photo: {
        type: Boolean,
        required: true
    },
    idCard: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Application', applicationSchema);