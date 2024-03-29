// Import modules
const express = require('express');
const path = require('path');
const cardCtrl = require('../controllers/card-ctrl');
const auth = require('../services/auth');


// Router object
const router = express.Router();
// Staic files
router.use(express.static(path.join(__dirname, '..', 'public')));


router.get('/', cardCtrl.card_get);

router.get('/new', auth.ensure, auth.ensureStud, cardCtrl.new_get);

router.post('/new', auth.ensure, auth.ensureStud, cardCtrl.new_post);

router.get('/all', auth.ensure, auth.ensureSec, cardCtrl.applicationsAll_get);

router.get('/check-:id', auth.ensure, auth.ensureSec, cardCtrl.check_get);

router.post('/check-:id', auth.ensure, auth.ensureSec, cardCtrl.check_post);

router.post('/update', auth.ensure, auth.ensureStud, cardCtrl.update_post);

router.get('/downloads/:id', (req, res) => {
    let file = path.join(__dirname, '..', 'public', 'downloads', req.params.id + '.doc');
    res.download(file);
});

router.get('*', (req, res) => {
    res.status(404).render('404', { user: req.user });
});


// Export module
module.exports = router;
