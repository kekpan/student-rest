const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    monday: {
        required: true,
        type: {breakfast: String, lunch: String, dinner: String}
    },
    tuesday: {
        required: true,
        type: {breakfast: String, lunch: String, dinner: String}
    },
    wednesday: {
        required: true,
        type: {breakfast: String, lunch: String, dinner: String}
    },
    thursday: {
        required: true,
        type: {breakfast: String, lunch: String, dinner: String}
    },
    friday: {
        required: true,
        type: {breakfast: String, lunch: String, dinner: String}
    },
    saturday: {
        required: true,
        type: {breakfast: String, lunch: String, dinner: String}
    },
    sunday: {
        required: true,
        type: {breakfast: String, lunch: String, dinner: String}
    }
});


module.exports = mongoose.model('Schedule', scheduleSchema);
