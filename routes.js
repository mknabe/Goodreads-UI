var home = require('./routes/homeRoutes.js');
var user = require('./routes/userRoutes.js');
var sync = require('./routes/syncRoutes.js');
var goodreads = require('./routes/goodreadsRoutes');
var review = require('./routes/reviewRoutes');
var book = require('./routes/bookRoutes');
var author = require('./routes/authorRoutes');

module.exports = function(app) {
  app.use(function(req, res, next) {
    if (req.session.user) {
      res.locals.user = {
        name: req.session.user.name,
        username: req.session.user.username,
        isLoggedIn: true
      };
    }
    next();
  });

  app.get('/', home.home);

  app.get('/register', user.getRegistrationForm);
  app.post('/register', user.registrationValidator, user.register);
  app.get('/goodreads_oauth_callback', user.goodreadsOauthCallback);
  app.get('/login', user.getLoginForm);
  app.post('/login', user.loginValidator, user.login);

  app.get('/sync', sync.sync);

  app.get('/books', review.allReviews);
  app.get('/books/:shelfName', review.allReviewsForShelf);

  app.get('/book/:id', book.getBook);
  app.get('/author/:id', author.getAuthor);
  // app.get('/series/:id', series.getSeries);

  app.get('/goodreads/book/:id', goodreads.getBook);
  app.get('/goodreads/series/:id', goodreads.getSeries);
  app.get('/goodreads/author/:id', goodreads.getAuthor);
  app.get('/goodreads/review/:id', goodreads.getReview);
  app.get('/goodreads/user_status/:id', goodreads.getUserStatus);
  app.get('/goodreads/read_status/:id', goodreads.getReadStatus);


};