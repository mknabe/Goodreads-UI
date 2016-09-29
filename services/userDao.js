var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var User = require('../models/user.js');

exports.findById = function (goodreadsUserId) {
  var query = User.findById(goodreadsUserId);
  return query.exec();
};

exports.findByUsername = function (username) {
  var query = User.findOne({ username: username });
  return query.exec();
};

exports.saveUser = function (user) {
  if (!(user instanceof User)) {
    user = new User(user);
  }
  return user.save();
};

exports.comparePassword = function(password) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      resolve
    })
  });
};