var mongoose = require('mongoose');
var Promise = require('bluebird');

var config = require('../../config');

var userData = require('../data/seed/userData').users;
var bookData = require('../data/seed/bookData').books;

var User = require('../../models/User');
var Book = require('../../models/book');

exports.connectToDb = function (done) {
  if (mongoose.connection.readyState === 1) return done();
  var opts = {
    server: {
      socketOptions: { keepAlive: 1 }
    },
    promiseLibrary: Promise
  };
  mongoose.Promise = Promise;
  mongoose.connect(config.mongo[process.env.NODE_ENV], opts, done);
};

exports.seedBooks = function () {
  return Book.remove({}).then(function () {
    return Book.collection.insertMany(bookData);
  });
};

exports.seedUsers = function () {
  return User.remove({}).then(function () {
    return User.collection.insertMany(userData);
  });
};