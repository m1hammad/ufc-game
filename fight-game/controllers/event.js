module.exports = {
    index,
    create,
    new: newEvent,
    simulate: simulateMatch,
}

let Fighter = require('../models/fighter');
let Event = require('../models/event');
const { renderFile } = require('ejs');

function index(req, res, next) {
    Event.find({}, function(err, event) {
        res.render('event/index', { event });
    });
}

function newEvent(req, res, next) {
    Fighter.find({}, function(err, fighters) {
        res.render('event/new', { fighters });
    });
}

async function create(req, res, next) {
    if (Event.findOne({})){
        Event.findOne({}).deleteOne().exec()
    }
    let event = new Event(req.body);
    Fighter.find({name: req.body.blueMain}, await function(err, fighterBlue) {
        Fighter.find({name: req.body.redMain}, function(err, fighterRed) {
            // console.log("red fighter is", fighterRed[0], "blue fighter is", fighterBlue[0]);
            event.redCorner[0] = fighterRed[0];
            event.blueCorner[0] = fighterBlue[0];
            event.save();
            console.log(event);
            res.redirect('/event')
        });
    });
};

async function simulateMatch(req, res, next) {
    let redCount = 0, blueCount = 0;
    let wrestling = "https://i.dlpng.com/static/png/202912_preview.png";
    let jiuJitsu = "https://i.dlpng.com/static/png/7240903_preview.png";
    
    Event.find({}, await function(err, events){
        Fighter.find({name: events[0].redCorner[0].name}, function(err, redFighter){
            Fighter.find({name: events[0].blueCorner[0].name}, function(err, blueFighter){
                console.log("red fighter in events is", redFighter[0]);
                console.log("blue fighter in events is", blueFighter[0]);

                for (let i=0; i < events[0].redCorner[0].products.length; i++){
                    if (events[0].redCorner[0].products[i].image === wrestling){
                        redCount += 4;
                    } else if (events[0].redCorner[0].products[i].image === jiuJitsu) {
                        redCount += 3;
                    } else {
                        redCount += 1;
                    }
                }

                for (let i=0; i < events[0].blueCorner[0].products.length; i++){
                    if (events[0].blueCorner[0].products[i].image === wrestling){
                        blueCount += 4;
                    } else if (events[0].blueCorner[0].products[i].image === jiuJitsu) {
                        blueCount += 3;
                    } else {
                        blueCount += 1;
                    }
                }
            var winner;
            if (redCount > blueCount) {
                winner = Math.random() < 0.75 ? "Red" : "Blue";
            } else {
                winner = Math.random() < 0.75 ? "Blue" : "Red";
            }
            if (winner==="Red") {
                events[0].winner = events[0].redCorner[0].image;
                if (blueFighter[0].isChampion === true && redFighter[0].isChampion === false){
                    redFighter[0].isChampion = true;
                    blueFighter[0].isChampion = false;
                }
            } else if (winner==="Blue") {
                events[0].winner = events[0].blueCorner[0].image;
                if (blueFighter[0].isChampion === false && redFighter[0].isChampion === true){
                    redFighter[0].isChampion = false;
                    blueFighter[0].isChampion = true;
                }
            }
            redFighter[0].save();
            blueFighter[0].save();
            events[0].save();
            res.redirect('/event');
            });
        })
    })
}