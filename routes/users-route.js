// Import modules
const express = require('express');
const path = require('path');
const userCtrl = require('../controllers/user-ctrl');
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});

// Router object
const router = express.Router();
// Staic files
router.use(express.static(path.join(__dirname, '..', 'public')));
router.use(csrfProtection);

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


// Export module
module.exports = router;
