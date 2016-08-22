var main = require('./routes/main.js');
var user = require('./routes/user.js');

module.exports = function(app) {
  app.get('/', main.home);
  app.get('/login', user.login);
  app.get('/goodreads_oauth_callback', user.oauthCallback);
  app.get('/user', user.getUser);
};