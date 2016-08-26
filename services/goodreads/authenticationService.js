var oauth = require('./../../config/oauthConfig');

exports.getRequestToken = function(callback) {
  oauth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results) {
    if (err) callback(err);
    callback(null, {
      oauth_request_token: oauth_token,
      oauth_request_token_secret: oauth_token_secret,
      url: 'https://www.goodreads.com/oauth/authorize?oauth_token=' + oauth_token
    });
  });
};

exports.getAccessToken = function(request_token, request_token_secret, callback) {
  oauth.getOAuthAccessToken(request_token, request_token_secret, function (err, oauth_user_token, oauth_user_token_secret, results) {
    if (err) callback(err);
    callback(null, {
      oauth_user_token: oauth_user_token,
      oauth_user_token_secret: oauth_user_token_secret
    });
  });
};
