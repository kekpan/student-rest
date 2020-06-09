const bcrypt = require('bcryptjs');
const passport = require('passport');
const checkInput = require('../utils/check-input');
const flashErrors = require('../utils/flash-errors');
const flashLocals = require('../utils/flash-locals');
const instances = require('../utils/instances');
const User = require('../models/user-model');


exports.approveEmp = (req, res) => {
    User.find({userType: 'pending'}, (err, employees) => {
        if (err) console.log(err);
        let locals = flashLocals(res); locals.employees = employees;
        res.render('admin/approveEmp', locals);
    });
}
