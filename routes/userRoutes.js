var bcrypt = require('bcrypt');
var oauth = require('../config/oauthConfig');
var auth = require('../services/goodreads/authenticationService');
var userDao = require('../services/userDao');
var config = require('../config');

exports.getLoginForm = function (req, res) {
  res.render('login');
};

exports.getRegistrationForm = function (req, res) {
  res.render('register');
};

exports.registrationValidator = function (req, res, next) {
  req.checkBody('username')
      .notEmpty().withMessage('Username is required')
      .isUniqueUsername().withMessage('Username is already taken');
  req.checkBody('goodreadsUserId')
      .notEmpty().withMessage('Goodreads user ID is required')
      .isUniqueGoodreadsUserId().withMessage('Goodreads user ID is already registered');
  req.checkBody('password', 'Password is required').notEmpty();

  req.asyncValidationErrors(true)
      .then(next)
      .catch(function(errors) {
        res.render('register', {
          formValidationErrors: errors,
          formFields: req.body
        });
    });
};

exports.register = function (req, res) {
  var saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (err) {
      res.render('register', { formError: err });
    }

    req.session.newUser = {
      _id: req.body.goodreadsUserId,
      username: req.body.username,
      name: req.body.name,
      password: hash
    };

    auth.getRequestToken(function (err, response) {
      if (err) {
        res.render('register', { formError: err });
      }

      console.log('Request oauth token');
      console.log(response);
      req.session.oauthRequest = {};
      req.session.oauthRequest.token = response.oauth_request_token;
      req.session.oauthRequest.tokenSecret = response.oauth_request_token_secret;
      res.redirect(response.url);
      res.end();
    });
  });
};

exports.loginValidator = function(req, res, next) {
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  var errors = req.validationErrors(true);
  if (errors) {
    res.render('login', {
      formValidationErrors: errors
    });
    return;
  }
  next();
};

exports.login = function (req, res) {
  userDao.findByUsername(req.body.username).then(function(user) {
    if (!user) {
      res.render('login', {
        formError: 'Invalid username or password'
      });
    }

    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if (result == true) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.render('login', {
          formError: 'Invalid username or password'
        });
      }
    });
  });
};

exports.goodreadsOauthCallback = function (req, res) {
  auth.getAccessToken(
      req.session.oauthRequest.token,
      req.session.oauthRequest.tokenSecret,
      function (err, response) {
        if (err) return res.render('error', { errorMessage: err });

        var user = req.session.newUser;
        user.goodreads = {
          oauthToken: response.oauth_user_token,
          oauthTokenSecret: response.oauth_user_token_secret
        };
        userDao.saveUser(user).then(function (savedUser) {
          req.session.user = savedUser;
          res.render('home');
        });
      });
};