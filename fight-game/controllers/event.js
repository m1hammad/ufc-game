module.exports = {
    index,
    create,
    new: newEvent,
    simulate: simulateMatch,
}

let Fighter = require('../models/fighter');
let Event = require('../models/event');

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

function create(req, res, next) {
    let event = new Event(req.body);
    Fighter.find({name: req.body.blueMain}, function(err, fighterBlue) {
        Fighter.find({name: req.body.redMain}, function(err, fighterRed) {
            console.log("red fighter is", fighterRed[0], "blue fighter is", fighterBlue[0]);
            event.redCorner.push(fighterRed[0]);
            event.blueCorner.push(fighterBlue[0]);
            event.save();
            console.log(event);
            res.redirect('/event')
        });
    });
};

function simulateMatch(req, res, next) {
    Event.find({}, function(err, events) {
        var winner = Math.random() < 0.5 ? "Red" : "Blue";
        if (winner==="Red") {
            events[0].winner = events[0].redCorner[0];
        } else if (winner==="Blue") {
            events[0].winner = events[0].blueCorner[0];
        }
        events[0].save();
    });
    res.redirect('/event');
}