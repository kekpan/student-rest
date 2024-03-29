const flashLocals = require('../utils/flash-locals');
const Coupon = require('../models/coupon-model');
const User = require('../models/user-model');
const Cart = require('../models/cart-model');
const Purchase = require('../models/purchase-model');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


exports.show_all = (req, res) => {
    Coupon.find({}, (err, coupons) => {
        let couponsChunks = [];
        let chunkSize = 3;
        for (let i = 0; i < coupons.length; i += chunkSize) {
            couponsChunks.push(coupons.slice(i, i+chunkSize));
        }
        let locals = flashLocals(res); locals.coupons = couponsChunks;
        res.render('coupons/show-all', locals); 
    });
}

exports.add_to_cart = (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    Coupon.findById(productId, (err, product) => {
        if (err) return res.redirect('/');
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/coupons');
    });
}

exports.add_one = (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    Coupon.findById(productId, (err, product) => {
        if (err) return res.redirect('/');
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/coupons/cart');
    });
}

exports.remove_one = (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/coupons/cart')
}

exports.remove_all = (req, res) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/coupons/cart')
}

exports.remove_cart = (req, res) => {
    req.session.cart = null;
    res.redirect('/coupons/cart');
}

exports.show_cart = (req, res) => {
    if (!req.session.cart) return res.render('coupons/cart', {products: null});
    const cart = new Cart(req.session.cart);
    res.render('coupons/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
}

exports.checkout_get = (req, res) => {
    if (!req.session.cart) return res.redirect('/coupons/cart');
    const cart = new Cart(req.session.cart);
    let locals = flashLocals(res); locals.totalPrice = cart.totalPrice;
    res.render('coupons/checkout', locals);
}

exports.checkout_post = (req, res) => {
    if (!req.session.cart) return res.redirect('/coupons/cart');
    const cart = new Cart(req.session.cart);
    var stripe = require('stripe')(process.env.STRIPE_KEY);
    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: 'eur',
        source: req.body.stripeToken,
        description: 'Test Charge',
    },
    function(err, charge) {
        if (err) {
            req.flash('error', 'Σφάλμα κατά την αγορά, παρακαλώ επικοινωνείστε με κάποιον υπεύθυνο.');
            return res.redirect('/coupons/checkout');
        }
        const purchase = new Purchase({
            user: req.user.username,
            cart: cart,
            paymentId: charge.id
        });
        let userCoupons = req.user.coupons || {breakfast: 0, lunch: 0 , dinner: 0};
        for (let item in cart.items) {
            let coupon = cart.items[item];
            for (let i=0; i < coupon.qty; i++){
                userCoupons.breakfast += coupon.item.meal.breakfast;
                userCoupons.lunch += coupon.item.meal.lunch;
                userCoupons.dinner += coupon.item.meal.dinner;
            }
        }
        purchase.save((err, result) => {
            User.updateOne({_id: req.user._id}, {coupons: userCoupons}, (err) => {
                req.flash('success', 'Επιτυχής αγορά προϊόντων!');
                req.session.cart = null;
                res.redirect('/coupons');
            });
        });
    });
}
