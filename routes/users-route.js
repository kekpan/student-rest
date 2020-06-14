// Import modules
const express = require('express');
const path = require('path');
const userCtrl = require('../controllers/user-ctrl');
const auth = require('../services/auth');


// Router object
const router = express.Router();
// Staic files
router.use(express.static(path.join(__dirname, '..', 'public')));


// Registration GET
router.get('/register', userCtrl.register_get);
// Registration POST
router.post('/register', userCtrl.register_post);
// Login GET
router.get('/login', userCtrl.login_get);
// Login POST
router.post('/login', userCtrl.login_post);
// Log out
router.get('/logout', userCtrl.logout);

router.get('/profile', auth.ensure, userCtrl.profile_get);

router.post('/profile', auth.ensure, userCtrl.profile_post);

router.post('/updatepass', auth.ensure, userCtrl.updatepass_post);


// Export module
module.exports = router;
