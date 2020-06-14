const bcrypt = require("bcryptjs");
const passport = require("passport");
const checkInput = require("../utils/check-input");
const flashErrors = require("../utils/flash-errors");
const flashLocals = require("../utils/flash-locals");
const instances = require("../utils/instances");
var backURL;
const User = require("../models/user-model");
const Purchase = require('../models/purchase-model');
const Cart = require('../models/cart-model');


exports.register_get = (req, res) => {
    let locals = flashLocals(res); locals.layout = 'login-reg'; locals.showProperty = true;
    res.render('register', locals);
}

exports.register_post = (req, res) => {
  checkInput.register(req);
  req.getValidationResult().then((err) => {
    if (!err.isEmpty())
      return flashErrors.valid(req, res, err, "/users/register");
    const newUser = instances.createUser(req);
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return flashErrors.regUser(req, res, err);
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return flashErrors.regUser(req, res, err);
        newUser.password = hash;
        newUser.save((err) => {
          if (err) return flashErrors.regUser(req, res, err);
          req.flash("success", "Επιτυχής εγγραφή!");
          res.redirect("/users/login");
        });
      });
    });
  });
};

exports.login_get = (req, res) => {
    let locals = flashLocals(res); locals.layout = 'login-reg';
    res.render('login', locals);
}

exports.login_post = (req, res, next) => {
  checkInput.login(req);
  req.getValidationResult().then((err) => {
    if (!err.isEmpty()) return flashErrors.valid(req, res, err, "/users/login");
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/users/login",
      failureFlash: true,
    })(req, res, next);
  });
};

exports.logout = (req, res) => {
  backURL = req.header("Referer") || "/";
  req.logOut();
  res.redirect(backURL);
};

exports.profile_get = async (req, res) => {
  try {
    let locals = flashLocals(res);
    userData = await User.findOne(
      { _id: req.user._id },
      { password: 0 }
    ).lean();
    locals.data = userData;
    res.render("profile", locals);
  } catch (err) {
    res.redirect("/");
  }
};

exports.profile_post = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user._id },
      instances.updateProfile(req.body)
    );
    req.flash('success', 'Τα στοιχεία σας ενημερώθηκαν');
    res.redirect('/users/profile');
  } catch (err) {
    req.flash('error', 'Υπήρξε κάποιο πρόβλημα');
    res.redirect('/users/profile');
  }
};

exports.updatepass_post = async (req, res) => {
  try {
    
    res.send(req.body);
  } catch (err) {
    res.redirect("/");
  }
};

exports.purchases = (req, res) => {
    Purchase.find({user: req.user.username}, (err, purchases) => {
        if (err) return console.log(err);
        let cart;
        purchases.forEach((purchase) => {
            cart = new Cart(purchase.cart);
            purchase.items = cart.generateArray();
        });
        let locals = flashLocals(res); locals.purchases = purchases;
        res.render('user-purchases', locals);
    });
}

exports.purchases_all = (req, res) => {
    Purchase.find({}, (err, purchases) => {
        if (err) return console.log(err);
        let cart;
        purchases.forEach((purchase) => {
            cart = new Cart(purchase.cart);
            purchase.items = cart.generateArray();
        });
        let locals = flashLocals(res); locals.purchases = purchases;
        res.render('all-purchases', locals);
    });
}
