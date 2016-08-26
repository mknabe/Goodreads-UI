var User = require('../models/user.js');

exports.findUserByGoodreadsId = function (goodreadsUserId, callback) {
  User.findOne({ 'goodreads.id': goodreadsUserId }, callback);
};

exports.saveUser = function (user, callback) {
  if (!user._id) {
    user = new User(user);
  }
  var options = {
    upsert: true
  };
  User.findOneAndUpdate(
      { '_id': user._id },
      user,
      options,
      callback);
};