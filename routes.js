var main = require('./routes/main.js');
var oauth = require('./routes/goodreads/authentication.js');
var goodreads = require('./routes/goodreads/goodreads.js');
// var books = require('./routes/books.js');

module.exports = function(app) {
  app.get('/', main.home);

  app.get('/login', oauth.getLoginForm);
  app.post('/login', oauth.getRequestToken);
  app.get('/goodreads_oauth_callback', oauth.getAccessToken);
  
  app.get('/goodreads/updates', goodreads.getUpdatesFeed);
  app.get('/goodreads/shelves', goodreads.getUserShelves);
  app.get('/goodreads/books', goodreads.getUsersBooks);
  app.get('/goodreads/book/:goodreadsId', goodreads.findBook);
  app.get('/goodreads/book/:seriesId', goodreads.findSeries);
  app.get('/goodreads/book/:authorId', goodreads.findAuthor);


};