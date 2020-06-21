const flashErrors = require("../utils/flash-errors");
const flashLocals = require("../utils/flash-locals");
const instances = require("../utils/instances");

const Photo = require("../models/photo-model");
const Tax = require("../models/tax-model");
const IdCard = require("../models/idCard-model");
const Application = require("../models/application-model");
const User = require("../models/user-model");
const Schedule = require("../models/schedule-model");

exports.schedule_get = async (req, res) => {
  try {
    let locals = flashLocals(res);
    const schedule = await Schedule.findOne().lean();
    locals.schedule = schedule;
    res.render("schedule/schedule", locals);
  } catch (err) {
    req.flash("error", "Υπήρξε κάποιο πρόβλημα, παρακαλώ προσπαθήστε ξανά");
    res.redirect("/");
  }
};

exports.scheduleEdit_get = async (req, res) => {
  try {
    let locals = flashLocals(res);
    let count = await Schedule.countDocuments();
    if (!count) {
      const firstSchedule = instances.createFirstSchedule();
      await firstSchedule.save();
    }
    const schedule = await Schedule.findOne().lean();
    locals.schedule = schedule;
    res.render("schedule/edit", locals);
  } catch (err) {
    res.redirect("/schedule");
  }
};

exports.scheduleEdit_post = async (req, res) => {
  try {
    let schedule = instances.updateSchedule(req.body);
    await Schedule.updateOne({}, schedule);
    res.redirect("/schedule");
  } catch (err) {
    res.redirect("/schedule");
  }
};
