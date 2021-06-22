module.exports = {
    index,
    add: addProduct,
    new: newProduct,
    give: giveProduct,
}

let Store = require('../models/store');
let Fighter = require('../models/fighter');

function index(req, res, next) {
    Store.find({}, function(err, products) {
        let fighters = Fighter.find({}, function(err, fighters){
            res.render('store/index', { products, fighters });
      });
    })
}

function newProduct(req, res, next){
    res.render('store/new');
}

function addProduct(req, res, next){
    let product = new Store(req.body);
    product.save();
    res.redirect('/store');
}

function giveProduct(req, res, next){
    console.log(req.body, req.body.fighter, req.body.product)
    Fighter.find({name: req.body.fighter}, function(err, fighter) {     
        Store.find({name: req.body.product}, function(err, product) {
            console.log("fighter is", fighter[0]);
            console.log("fighter record is", fighter[0].record);
            console.log("fighter products array is", fighter[0].products);
            console.log("product image is", product[0].image)
            fighter[0].products.push(product[0]);
            console.log("new fighter products array is", fighter[0].products);
            fighter[0].save()
            res.redirect(`/fighters/${fighter[0]._id}`);
        });
    });


}