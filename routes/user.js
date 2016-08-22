var OAuth = require('oauth');
var config = require('./config.json')

exports.login = function(req, res) {
  var oauth = new OAuth.OAuth(
      'http://www.goodreads.com/oauth/request_token',
      'http://www.goodreads.com/oauth/access_token',
      config.goodreads.key,
      config.goodreads.secret,
      '1.0A',
      'http://localhost:3000/goodreads_oauth_callback',
      'HMAC-SHA1'
    );

  var OAUTH_TOKEN;
  var OAUTH_TOKEN_SECRET;

  oauth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results ){
      console.log('==>Get the request token');
      console.log(oauth_token);
      console.log(oauth_token_secret);

      res.redirect('https://www.goodreads.com/oauth/authorize?oauth_token=' + oauth_token);
      res.end();

      // oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, function (err, user_oauth_token, user_oauth_token_secret, results){
      //   console.log('==>Get the access token');
      //   console.log(user_oauth_token);
      //   console.log(user_oauth_token_secret);
      // });
  });

  // oauth.get(
  //     'https://api.twitter.com/1.1/trends/place.json?id=23424977',
  //     'your user token for this app', //test user token
  //     'your user secret for this app', //test user secret            
  //     function (e, data, res){
  //       if (e) console.error(e);        
  //       console.log(require('util').inspect(data));
  //       done();      
  //     });
};

exports.oauthCallback = function(req, res) {
  console.log('CALLBACK');
}