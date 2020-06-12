const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    _id: {auto: false},
    street: {type: String, required: () => {return (this.number || this.zipCode)}},
    number: {type: Number, required: () => {return (this.street || this.zipCode)}},
    zipCode: {type: String, required: () => {return (this.street || this.number)}}
});

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    fatherName: {type: String, required: true},
    motherSurname: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    idNumber: {type: String, required: true, unique: true},
    userType: {type: String, required: true},
    department: {type: String, required: true},
    email: {type: String, required: false},
    mobilePhone: {type: String, required: false},
    address: {type: addressSchema, required: false},
    year: {type: Number, required: true},
    damage: {type: Number, required: true},
    coupons: {
        breakfast: { type: Number, default: 0},
        lunch: { type: Number, default: 0},
        dinner: { type: Number, default: 0}
    }
});


module.exports = mongoose.model('User', userSchema);
