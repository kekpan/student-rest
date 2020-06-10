const flashErrors = require('../utils/flash-errors');
const flashLocals = require('../utils/flash-locals');
const instances = require('../utils/instances');

const Photo = require('../models/photo-model');
const Tax = require('../models/tax-model');
const IdCard = require('../models/idCard-model');
const Application = require('../models/application-model');
const User = require('../models/user-model');

exports.card_get = async (req, res) => {
    try {
        let locals = flashLocals(res);
        res.render('card/card', locals);
    } catch (error) {
        res.send(error);
    }
};

exports.new_get = async (req, res) => {
    try {
        let locals = flashLocals(res);
        const application = await Application.findOne({ userId: req.user._id }).lean();
        if (application === null) {
            locals.notSent = true;
        } else {
            photo = await Photo.findOne({ userId: req.user._id }).lean();
            idCard = await IdCard.findOne({ userId: req.user._id }).lean();
            tax = await Tax.findOne({ userId: req.user._id }).lean();
            locals.notSent = false;
            locals.photo = photo;
            locals.idCard = idCard;
            locals.tax = tax;
            locals.application = application;
        }
        res.render('card/cardNew', locals);
    } catch (error) {
        res.send(error);
    }
};

exports.new_post = async (req, res) => {
    try {
        if (flashErrors.missingFile(req, res, false)) return;
        let idCard = instances.createIdCard(req);
        await idCard.save();
        let tax = instances.createTax(req);
        await tax.save();
        let photo = instances.createPhoto(req);
        await photo.save();
        let application = instances.createApplication(req);
        await application.save();
        res.redirect('/card/new');
    } catch (err) {
        await Photo.deleteOne({ userId: req.user._id });
        await IdCard.deleteOne({ userId: req.user._id });
        await Tax.deleteOne({ userId: req.user._id });
        await Application.deleteOne({ userId: req.user._id });
        res.send(err);
    }
}

exports.update_post = async (req, res) => {
    try {
        let application = await Application.findOne({ userId: req.user._id }).lean();
        if (flashErrors.missingFile(req, res, application)) return;
        if (!application.photo) {
            await Photo.updateOne({ userId: req.user._id }, instances.updateFile(req.body.photo));
            await Application.updateOne({ userId: req.user._id }, { photo: true });
        }
        if (!application.tax) {
            await Tax.updateOne({ userId: req.user._id }, instances.updateFile(req.body.tax));
            await Application.updateOne({ userId: req.user._id }, { tax: true });
        }
        if (!application.idCard) {
            await IdCard.updateOne({ userId: req.user._id }, instances.updateFile(req.body.idCard));
            await Application.updateOne({ userId: req.user._id }, { idCard: true });
        }
        await Application.updateOne({ userId: req.user._id }, { status: '0' });
        res.redirect('/card/new');
    } catch (error) {
        res.send(error);
    }
}

exports.applicationsAll_get = async (req, res) => {
    try {
        let locals = flashLocals(res);
        const applicationList = await Application.find({}).limit(0).lean();
        let user;
        for (application of applicationList) {
            user = await User.findOne({ _id: application.userId });
            application['lastName'] = user.lastName;
        };
        locals.applications = applicationList;
        res.render('card/applications', locals);
    } catch (error) {
        res.send(error);
    }
}

exports.check_get = async (req, res) => {
    try {
        let locals = flashLocals(res);
        const user = await User.findOne({ _id: req.params.id }).lean();
        const photo = await Photo.findOne({ userId: user._id }).lean();
        const idCard = await IdCard.findOne({ userId: user._id }).lean();
        const tax = await Tax.findOne({ userId: user._id }).lean();
        const application = await Application.findOne({ userId: user._id }).lean();
        locals.photo = photo;
        locals.idCard = idCard;
        locals.tax = tax;
        locals.student = user;
        locals.application = application;
        res.render('card/applicationsOne', locals);
    } catch (error) {
        res.send(error);
    }
}

exports.check_post = async (req, res) => {
    changes = instances.updateApplication(req);
    try {
        await Application.updateOne({ userId: req.params.id }, changes);
        res.redirect('/card/all');
    } catch (err) {
        res.send(err);
    }
}

exports.kek = async (req, res) => {
    await Photo.deleteMany({  });
    await IdCard.deleteMany({  });
    await Tax.deleteMany({  });
    await Application.deleteMany({  });
    res.redirect('/card/new');
}
