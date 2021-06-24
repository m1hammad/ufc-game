var express = require('express');
var router = express.Router();
var eventsCtrl = require('../controllers/event');

/* GET home page. */
// router.get('/', eventsCtrl.index);
router.get('/', eventsCtrl.index)
router.get('/new', eventsCtrl.new);
router.post('/', eventsCtrl.create);
router.post('/match', eventsCtrl.simulate);

module.exports = router;