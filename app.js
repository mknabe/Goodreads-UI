var express = require('express');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var config = require('./config.json');

var app = express();

var handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});

var opts = {
  server: {
    socketOptions: { keepAlive: 1 }
  },
  promiseLibrary: Promise
};
mongoose.connect(config.mongo[app.settings.env], opts);
mongoose.Promise = Promise;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);

app.use(require('body-parser').urlencoded({ extended: true }));

app.use(require('express-session')({
  resave: false,
  saveUninitialized: false,
  secret: config.sessionSecret
}));

require('./routes.js')(app);

function startServer() {
  app.listen(app.get('port'), function() {
    console.log('Express started in ' + app.get('env') + ' mode on http://localhost:' + app.get('port') + '; press Ctrl+C to terminate. ');
  });
}

if (require.main === module) {
  // application run directly; start app server
  startServer();
} else {
  // application imported as a module via "require"; export function to create server
  module.exports = startServer;
}