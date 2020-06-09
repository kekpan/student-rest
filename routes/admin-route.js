// Import modules
const express = require('express');
const path = require('path');
const adminCtrl = require('../controllers/admin-ctrl');

// Router object
const router = express.Router();
// Staic files
router.use(express.static(path.join(__dirname, '..', 'public')));


router.get('/approve', adminCtrl.approveEmp);


// Export module
module.exports = router;
