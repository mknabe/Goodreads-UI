var OAuth = require('oauth');
var config = require('../../config.json');

var oauth = new OAuth.OAuth(
      'http://www.goodreads.com/oauth/request_token',
      'http://www.goodreads.com/oauth/access_token',
      config.goodreads.key,
      config.goodreads.secret,
      '1.0',
      'http://localhost:3000/goodreads_oauth_callback',
      'HMAC-SHA1'
    );

module.exports = oauth;