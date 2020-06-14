// Import modules
const express = require('express');
const path = require('path');
const homeCtrl = require('../controllers/home-ctrl');


// Router object
const router = express.Router();
// Staic files
router.use(express.static(path.join(__dirname, '..', 'public')));


// Homepage GET
router.get('/', homeCtrl.home);

router.get('/contact', homeCtrl.contact);


// Export module
module.exports = router;
