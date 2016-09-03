var oauth = require('../config/oauthConfig');
var auth = require('../services/goodreads/authenticationService');
var User = require('../services/userDao');
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
  req.session.user.goodreads_user_id = goodreadsUserId;

  User.findUserByGoodreadsId(goodreadsUserId, function(err, user) {
    if (user) {
      console.log('user found');
      req.session.user.oauth_user_token = user.goodreads.oauthToken;
      req.session.user.oauth_request_token_secret = user.goodreads.oauthTokenSecret;
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
        req.session.user.oauth_user_token = response.oauth_user_token;
        req.session.user.oauth_request_token_secret = response.oauth_user_token_secret;

        var user = { goodreads: {
          id: req.session.user.goodreads_user_id,
          oauthToken: response.oauth_user_token,
          oauthTokenSecret: response.oauth_user_token_secret
        } };
        User.saveUser(user);

        res.render('home');
      });
};