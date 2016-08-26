var home = require('./routes/homeRoutes.js');
var user = require('./routes/userRoutes.js');
var sync = require('./routes/syncRoutes.js');
// var books = require('./services/bookDao');

module.exports = function(app) {
  app.get('/', home.home);

  app.get('/login', user.getLoginForm);
  app.post('/login', user.getRequestToken);
  app.get('/goodreads_oauth_callback', user.getAccessToken);
  
  app.get('/sync', sync.sync);


};