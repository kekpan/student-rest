const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    fileImage: {
        type: Buffer,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    // data: {
    //     type: String,
    //     required: true
    // }
});

module.exports = mongoose.model('Tax', taxSchema);