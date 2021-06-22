module.exports = {
    index,
}

let Fighter = require('../models/fighter');

function index(req, res, next) {
    Fighter.find({}, function(err, fighters) {
      let champions = [];
      for (let f of fighters) {
          if (f.isChampion === true){
            champions.push(f);
          }
      }
      res.render('champions/index', { champions });
    });
}