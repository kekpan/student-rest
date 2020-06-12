const mongoose = require('mongoose');


const mealSchema = new mongoose.Schema({
    _id: {auto: false},
    breakfast: {type: Number, required: () => {return !(this.lunch || this.dinner)}},
    lunch: {type: Number, required: () => {return !(this.breakfast || this.dinner)}},
    dinner: {type: Number, required: () => {return !(this.breakfast || this.lunch)}}
});

const couponSchema = mongoose.Schema({
    title: {type: String, required: true},
    meal: {type: mealSchema, required: true},
    price: {type: Number, required: true}
});


module.exports = mongoose.model('Coupon', couponSchema);
