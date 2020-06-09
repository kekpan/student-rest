const mongoose = require('mongoose');


const anncmntSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    body: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    modified: {type: Boolean, default: false},
    modifiedAt: {type: Date, default: Date.now()}
});


module.exports = mongoose.model('Anncmnt', anncmntSchema);
