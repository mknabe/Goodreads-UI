var OAuth = require('oauth');
var config = require('../config.json');

var oauth = new OAuth.OAuth(
      'http://www.goodreads.com/oauth/request_token',
      'http://www.goodreads.com/oauth/access_token',
      config.goodreads.key,
      config.goodreads.secret,
      '1.0',
      'http://localhost:3000/goodreads_oauth_callback',
      'HMAC-SHA1'
    );

exports.login = function(req, res) {
  oauth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results ){
      console.log('==>Get the request token');
      console.log(oauth_token);
      console.log(oauth_token_secret);

      req.session.oauth_request_token = oauth_token;
      req.session.oauth_request_token_secret = oauth_token_secret;

      res.redirect('https://www.goodreads.com/oauth/authorize?oauth_token=' + oauth_token);
      res.end();
  });
};

exports.oauthCallback = function(req, res) {
  oauth.getOAuthAccessToken(req.session.oauth_request_token, req.session.oauth_request_token_secret, function (err, user_oauth_token, user_oauth_token_secret, results){
    req.session.user_oauth_token = user_oauth_token;
    req.session.user_oauth_token_secret = user_oauth_token_secret;
    res.render('home');
  });
};

exports.getUser = function (req, res) {
    oauth.get(
        'https://www.goodreads.com/updates/friends.xml',
        req.session.user_oauth_token,
        req.session.user_oauth_token_secret,
        function (e, data, res){
          console.log(e);
          console.log(data);
      });
};