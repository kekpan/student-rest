const flashErrors = require('../utils/flash-errors');
const flashLocals = require('../utils/flash-locals');


exports.home = (req, res) => {
    let locals = flashLocals(res);
    res.render('home', locals);
}