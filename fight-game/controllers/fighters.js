module.exports = {
  index,
  new: newFighter,
  add: addFighter,
  show,
  delete: releaseFighter,
  update: updateFighter,
  edit: editFighter,
  deleteProduct,
}

let Fighter = require('../models/fighter');

function index(req, res, next) {
  Fighter.find({}, function(err, fighters) {
    res.render('fighters/fighters', { fighters });
  });
  }

function newFighter(req, res, next) {
  res.render('fighters/new');
}

function addFighter(req, res, next) {
  let fighter = new Fighter(req.body);
  fighter.save();
  res.redirect('/fighters')
}

function show(req, res, next) {
  Fighter.findById(req.params.id, function(err, fighter) {
    res.render('fighters/show', { fighter });
  });
}

function releaseFighter(req, res){
  Fighter.findById(req.params.id).deleteOne().exec();  
  res.redirect('/fighters');
}

function deleteProduct(req, res){
  console.log("in delete product");
  console.log("current ID is", req.params.id);
  Fighter.findById(req.params.id, function(err, fighter) {
    console.log(fighter);
    fighter.products.pop();  
    fighter.save();
    res.redirect('/fighters/' + req.params.id);
  });
}

function updateFighter(req, res){
  Fighter.findById(req.params.id, function(err, fighter) {
    req.body._id = fighter._id;
    fighter.name = req.body.name;
    fighter.weight = req.body.weight;
    fighter.age = req.body.age;
    fighter.record = req.body.record;
    fighter.description = req.body.description;
    fighter.image = req.body.image;
    fighter.isChampion = req.body.isChampion;
    fighter.save();
    res.redirect('/fighters/' + req.params.id);
  });
}

function editFighter(req, res){
  Fighter.findById(req.params.id, function(err, fighter) {
    let targetId = req.params.id;
    res.render('fighters/edit', {targetId, fighter });
  });
}