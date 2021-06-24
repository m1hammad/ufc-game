var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index',
    {
      user: req.user,
      name: req.query.name,
    });
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/fightgame', passport.authenticate(
  'google',
  {
    successRedirect: '/fighters',
    failureRedirect: '/',
  }
));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
