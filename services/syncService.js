var goodreads = require('./goodreads/goodreadsService');

exports.syncUserWithGoodreads = function () {

};

exports.syncShelves = function (user) {
  goodreads.findShelvesForUser(user, function (err, result) {
    var shelves = result.GoodreadsResponse.shelves[0].user_shelf;
    var name = shelves[0].name[0];
  });
};