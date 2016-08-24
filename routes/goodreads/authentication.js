var oauth = require('./oauthConfig');

exports.getRequestToken = function(req, res) {
  req.session.goodreads_user_id = req.body.goodreadsUserId;
  oauth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results ){
      req.session.oauth_request_token = oauth_token;
      req.session.oauth_request_token_secret = oauth_token_secret;

      res.redirect('https://www.goodreads.com/oauth/authorize?oauth_token=' + oauth_token);
      res.end();
  });
};

exports.getAccessToken = function(req, res) {
  oauth.getOAuthAccessToken(req.session.oauth_request_token, req.session.oauth_request_token_secret, function (err, user_oauth_token, user_oauth_token_secret, results){
    req.session.user_oauth_token = user_oauth_token;
    req.session.user_oauth_token_secret = user_oauth_token_secret;
    res.render('home');
  });
};

exports.getLoginForm = function(req, res) {
  res.render('login');
};
