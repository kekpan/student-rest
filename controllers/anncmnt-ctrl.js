const Anncmnt = require('../models/anncmnt-model');
const User = require('../models/user-model');
const checkInput = require('../utils/check-input');
const flashErrors = require('../utils/flash-errors');
const flashLocals = require('../utils/flash-locals');
const instances = require('../utils/instances');


exports.add_get = (req, res) => {
    let locals = flashLocals(res);
    res.render('anncmnts/add-new', locals);
}

exports.add_post = (req, res) => {
    checkInput.anncmnt(req);
    req.getValidationResult()
    .then((err) => {
        if (!err.isEmpty()) return flashErrors.valid(req, res, err, '/anncmnts/add');
        let newAnncmnt = instances.createAnncmnt(req);
        newAnncmnt.save((err) => {
            if (err) return flashErrors.saveAnncmnt(req, res, err);
            req.flash('success', 'Η ανακοίνωση καταχωρήθηκε με επιτυχία.');
            res.redirect('/anncmnts');
        });
    });
}

exports.show_all = (req, res) => {
    Anncmnt.find({}, (err, anncmnts) => {
        if (err) return flashErrors.findAnncmnts(req, res, err);
        let locals = flashLocals(res); locals.anncmnts = anncmnts;
        res.render('anncmnts/show-all', locals);
    })
    .sort({modifiedAt: 'descending'});
}

exports.show_one = (req, res) => {
    Anncmnt.findById(req.params.id, (err, anncmnt) => {
        if (err) return flashErrors.findAnncmnt(req, res, err);
        User.findById(anncmnt.author, (err, user) => {
            if (err) return flashErrors.findAuthor(req, res, err);
            let locals = flashLocals(res); locals.anncmnt = anncmnt; locals.author = user;
            if (req.user && anncmnt.author == req.user.id) locals.edit = true;
            res.render('anncmnts/show-one', locals);           
        });
    });
}

exports.edit = (req, res) => {
    checkInput.anncmnt(req);
    req.getValidationResult()
    .then((err) => {
        if (!err.isEmpty()) return flashErrors.valid(req, res, err, '/anncmnts/'.concat(req.params.id));
        let editedAnncmnt = instances.editedAnncmnt(req);
        Anncmnt.updateOne({_id: 'req.params.id'}, editedAnncmnt, (err) => {
            if (err) return flashErrors.updateAnncmnt(req, res, err, req.body, req.params.id);
            req.flash('success', 'Η ανακοίνωση τροποποιήθηκε επιτυχώς.');
            res.redirect('/anncmnts');
        });
    });
}

exports.delete = (req, res) => {
    if(!req.user) return res.sendStatus(503);
    Anncmnt.findById(req.params.id, (err, anncmnt) => {
        if (err) return flashErrors.findAnncmnt(req, res, err);
        if (anncmnt.author != req.user._id) return res.sendStatus(511);
        Anncmnt.deleteOne({_id: req.params.id}, (err) => {
            if (err) return res.status(500).send(err);
            req.flash('success', 'Η ανακοίνωση διαγράφηκε επιτυχώς.')
            res.sendStatus(200);
        });
    });
}
