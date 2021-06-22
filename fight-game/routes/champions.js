var express = require('express');
var router = express.Router();
var championsCtrl = require('../controllers/champions');

/* GET home page. */
router.get('/', championsCtrl.index);

module.exports = router;