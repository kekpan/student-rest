// Import modules
const express = require("express");
const path = require("path");
const couponCtrl = require("../controllers/coupon-ctrl");
const auth = require("../services/auth");

// Router object
const router = express.Router();
// Static files
router.use(express.static(path.join(__dirname, "..", "public")));

router.get("/", auth.ensure, auth.ensureStud, couponCtrl.show_all);
router.get("/remove/:id", auth.ensure, auth.ensureStud, couponCtrl.remove_all);
router.get("/reduce/:id", auth.ensure, auth.ensureStud, couponCtrl.remove_one);
router.get("/add/:id", auth.ensure, auth.ensureStud, couponCtrl.add_one);
router.get("/cart", auth.ensure, auth.ensureStud, couponCtrl.show_cart);
router.get("/cart/remove", auth.ensure, auth.ensureStud, couponCtrl.remove_cart);
router.get("/checkout", auth.ensure, auth.ensureStud, couponCtrl.checkout_get);
router.post("/checkout", auth.ensure, auth.ensureStud, couponCtrl.checkout_post);
router.get("/:id", auth.ensure, auth.ensureStud, couponCtrl.add_to_cart);
router.get('*', (req, res) => {
    res.status(404).render('404', { user: req.user });
});

// Export module
module.exports = router;
