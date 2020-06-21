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

router.get('/edit', auth.ensure, auth.ensureCook, scheduleCtrl.scheduleEdit_get);

router.post('/edit', auth.ensure, auth.ensureCook, scheduleCtrl.scheduleEdit_post);
router.get('*', (req, res) => {
    res.status(404).render('404', { user: req.user });
});

// Export module
module.exports = router;
