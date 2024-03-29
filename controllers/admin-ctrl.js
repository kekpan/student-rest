const bcrypt = require("bcryptjs");
const passport = require("passport");
const checkInput = require("../utils/check-input");
const flashErrors = require("../utils/flash-errors");
const flashLocals = require("../utils/flash-locals");
const instances = require("../utils/instances");

const Photo = require("../models/photo-model");
const Tax = require("../models/tax-model");
const IdCard = require("../models/idCard-model");
const Application = require("../models/application-model");
const User = require("../models/user-model");

exports.approveEmp_get = async (req, res) => {
  try {
    let locals = flashLocals(res);
    let pendingEmp = await User.find({ userType: "pending" }).limit(0).lean();
    locals.emp = pendingEmp;
    res.render("admin/approveEmp", locals);
  } catch (err) {
    req.flash("error", "Υπήρξε κάποιο πρόβλημα, παρακαλώ προσπαθήστε ξανά");
    res.redirect("/");
  }
};

exports.approveEmpOne_get = async (req, res) => {
  try {
    let locals = flashLocals(res);
    let emp = await User.findOne({
      userType: "pending",
      _id: req.params.id,
    }).lean();
    locals.data = emp;
    res.render("admin/approveEmpOne", locals);
  } catch (err) {
    res.redirect("/admin/approve");
  }
};

exports.approveEmpOne_post = async (req, res) => {
  try {
    if (req.body.answer === "accept") {
      await User.updateOne(
        { userType: "pending", _id: req.params.id },
        { userType: "employee" }
      );
      req.flash("success", "Ο χρήστης εγκρίθηκε με επιτυχία");
    } else {
      await User.deleteOne({
        userType: "pending",
        _id: req.params.id,
      });
    }
    res.redirect("/admin/approve");
  } catch (err) {
    req.flash("error", "Κάτι δεν πήγε καλά");
    res.redirect("/admin/approve");
  }
};

exports.allUsers_get = async (req, res) => {
  try {
    let locals = flashLocals(res);
    let allUsers = await User.find({
      $and: [{ userType: { $ne: "admin" } }, { userType: { $ne: "pending" } }],
    })
      .limit(0)
      .sort({ department: 1, lastName: 1, firstName: 1 })
      .lean();
    locals.all = allUsers;
    res.render("admin/allUsers", locals);
  } catch (err) {
    req.flash("error", "Υπήρξε κάποιο πρόβλημα, παρακαλώ προσπαθήστε ξανά");
    res.redirect("/");
  }
};

exports.userProfile_get = async (req, res) => {
  try {
    let locals = flashLocals(res);
    let data = await User.findOne({
      _id: req.params.id,
      $and: [{ userType: { $ne: "admin" } }, { userType: { $ne: "pending" } }],
    }).lean();
    locals.data = data;
    res.render("admin/userProfile", locals);
  } catch (err) {
    req.flash("error", "Ο χρήστης δεν βρέθηκε");
    res.redirect("/admin/all");
  }
};

exports.deleteUser_post = async (req, res) => {
  try {
    let deletedUser = await User.findOne({ _id: req.body.userId }).lean();
    await User.deleteOne({ _id: req.body.userId, userType: { $ne: "admin" } });
    if (deletedUser.userType === "student") {
      await Photo.deleteOne({ userId: req.body.userId });
      await IdCard.deleteOne({ userId: req.body.userId });
      await Tax.deleteOne({ userId: req.body.userId });
      await Application.deleteOne({ userId: req.body.userId });
    }
    req.flash("success", "Ο χρήστης διαγράφτηκε επιτυχώς");
    res.redirect("/admin/all");
  } catch (err) {
    req.flash("error", "Υπήρξε κάποιο πρόβλημα κατά την διαγραφή");
    res.redirect("/admin/all");
  }
};
