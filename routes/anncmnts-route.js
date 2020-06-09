// Import modules
const express = require('express');
const path = require('path');
const anncmntCtrl = require('../controllers/anncmnt-ctrl');
const auth = require('../services/auth');


// Router object
const router = express.Router();
// Static files
router.use(express.static(path.join(__dirname, '..', 'public')));

// Add announcement GET
router.get('/add', auth.ensure, auth.ensureSec, anncmntCtrl.add_get);
// Add announcement POST
router.post('/add', auth.ensure, auth.ensureSec, anncmntCtrl.add_post);
// All announcements
router.get('/', anncmntCtrl.show_all);
// One announcement GET
router.get('/:id', anncmntCtrl.show_one);
// One announcement POST
router.post('/:id', auth.ensure, auth.ensureSec, anncmntCtrl.edit);
// One announcement DELETE
router.delete('/:id', auth.ensure, auth.ensureSec, anncmntCtrl.delete);


// Export module
module.exports = router;
