var express = require('express');
var router = express.Router();
var fightersCtrl = require('../controllers/fighters');

/* GET home page. */
router.get('/', fightersCtrl.index);
router.get('/new', fightersCtrl.new);
router.post('/', fightersCtrl.add);
router.get('/:id', fightersCtrl.show);
router.delete('/:id', fightersCtrl.delete);
router.get('/:id/edit', fightersCtrl.edit);
router.put('/:id', fightersCtrl.update);
router.delete('/:id/product', fightersCtrl.deleteProduct);

module.exports = router;