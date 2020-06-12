// Import modules
const express = require('express');
const path = require('path');
const couponCtrl = require('../controllers/coupon-ctrl');
const auth = require('../services/auth');


// Router object
const router = express.Router();
// Static files
router.use(express.static(path.join(__dirname, '..', 'public')));

router.get('/', couponCtrl.show_all);
router.get('/cart', couponCtrl.show_cart);
router.get('/checkout', auth.ensure, couponCtrl.checkout_get);
router.post('/checkout', auth.ensure, couponCtrl.checkout_post);
router.get('/:id', couponCtrl.add_to_cart);


// Export module
module.exports = router;
