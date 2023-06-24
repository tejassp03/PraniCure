const express = require('express');
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require('express-session');
const router = express.Router();

const User = require('../models/user'); // Assuming you have a User model defined

require('../routes/passport-google-setup');

router.use(session({
  secret: 'Laxman',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/signIn', (req, res) => {
  res.send("<a href='auth/google/callback'>Sign in with Google</a>");
});

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth/google/callback/failure',
  successRedirect: '/auth/google/callback/success'
}));
router.get('/auth/google/callback/success', (req, res) => {
  if (!req.user) {
    res.redirect('/auth/google/callback/failure');
  } else {
    const { email, name, picture } = req.user; // Extract relevant user data
    const newUser = new User({
      email,
      name,
      picture
    });
    // Save the new user to the database
    newUser.save()
      .then(() => {
        res.send('Welcome ' + email + '. User data saved.');
        console.log('Welcome ' + email + '. User data saved.');
      })
      .catch(error => {
        console.error('Error saving user data:', error);
        res.send('Error saving user data.');
      });
  }
});

router.get('/auth/google/callback/failure', (req, res) => {
  res.send('Error');
});

module.exports = router;
