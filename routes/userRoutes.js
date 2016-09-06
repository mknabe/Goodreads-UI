var oauth = require('../config/oauthConfig');
var auth = require('../services/goodreads/authenticationService');
var userDao = require('../services/userDao');
var config = require('../config');

exports.getLoginForm = function (req, res) {
  res.render('login', {
    defaultUserId: config.goodreads.defaultUserId
  });
};

exports.getRequestToken = function (req, res) {
  if (!req.session.user) {
    req.session.user = {};
  }
  var goodreadsUserId = req.body.goodreadsUserId;
  req.session.user.id = goodreadsUserId;

  userDao.findById(goodreadsUserId).then(function(user) {
    if (user) {
      console.log('user found');
      req.session.user = user;
      res.redirect('/');
    } else {
      auth.getRequestToken(function (err, response) {
        req.session.user.oauth_request_token = response.oauth_request_token;
        req.session.user.oauth_request_token_secret = response.oauth_request_token_secret;
        res.redirect(response.url);
        res.end();
      });
    }
  });
};

exports.getAccessToken = function (req, res) {
  auth.getAccessToken(req.session.user.oauth_request_token, req.session.user.oauth_request_token_secret,
      function (err, response) {
        var user = {
          _id: req.session.user.id,
          goodreads: {
            oauthToken: response.oauth_user_token,
            oauthTokenSecret: response.oauth_user_token_secret
          }
        };
        userDao.saveUser(user).then(function (savedUser) {
          req.session.user = savedUser;
          res.render('home');
        });
      });
};