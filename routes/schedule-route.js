// Import modules
const express = require('express');
const path = require('path');
const scheduleCtrl = require('../controllers/schedule-ctrl');
const auth = require('../services/auth');


// Router object
const router = express.Router();
// Staic files
router.use(express.static(path.join(__dirname, '..', 'public')));


router.get('/', scheduleCtrl.schedule_get);

router.get('/edit', scheduleCtrl.scheduleEdit_get);

router.post('/edit', scheduleCtrl.scheduleEdit_post);


// Export module
module.exports = router;
