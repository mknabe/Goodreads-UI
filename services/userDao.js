var User = require('../models/user.js');

exports.findById = function (goodreadsUserId) {
  var query = User.findById(goodreadsUserId);
  return query.exec();
};

exports.saveUser = function (user) {
  if (!(user instanceof User)) {
    user = new User(user);
  }
  return user.save();
};