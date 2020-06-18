// Import modules
const express = require('express');
const path = require('path');
const adminCtrl = require('../controllers/admin-ctrl');
const auth = require('../services/auth');

// Router object
const router = express.Router();
// Staic files
router.use(express.static(path.join(__dirname, '..', 'public')));


router.get('/approve', auth.ensure, auth.ensureAdmin, adminCtrl.approveEmp_get);

router.get('/approve-:id', auth.ensure, auth.ensureAdmin, adminCtrl.approveEmpOne_get);

router.post('/approve-:id', auth.ensure, auth.ensureAdmin, adminCtrl.approveEmpOne_post);

router.get('/all', auth.ensure, auth.ensureAdmin, adminCtrl.allUsers_get);

router.get('/all-:id', auth.ensure, auth.ensureSec, adminCtrl.userProfile_get);

router.post('/all-:id', auth.ensure, auth.ensureAdmin, adminCtrl.deleteUser_post);

// Export module
module.exports = router;
