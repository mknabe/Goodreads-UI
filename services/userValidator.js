var userDao = require('./userDao');

exports.uniqueUsername = function(username) {
  return new Promise(function(resolve, reject) {
    userDao.findByUsername(username)
        .then(function(user) {
          if (user) {
            reject(user);
          }
          else {
            resolve(user);
          }
        }).catch(function(error){
          if (error) {
            reject(error);
          }
        });
  });
};

exports.uniqueGoodreadsId = function(goodreadsUserId) {
  return new Promise(function(resolve, reject) {
    userDao.findById(goodreadsUserId)
        .then(function(user) {
          if (user) {
            reject(user);
          }
          else {
            resolve(user);
          }
        }).catch(function(error){
      if (error) {
        reject(error);
      }
    });
  });
};