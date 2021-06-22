var express = require('express');
var router = express.Router();
var storeCtrl = require('../controllers/store');

/* GET home page. */
router.get('/', storeCtrl.index);
router.get('/new', storeCtrl.new);
router.post('/', storeCtrl.add);
router.post('/give', storeCtrl.give);

module.exports = router;