var goodreads = require('./goodreads/goodreadsService');
var async = require('async');

exports.syncUserWithGoodreads = function () {

};

exports.syncShelves = function (user, callback) {
  async.waterfall([
    function(callback) {
      goodreads.findShelvesForUser(user, callback);
    },
    function(shelves, callback) {
      shelves.forEach(function (shelf) {
        goodreads.findReviewsForUser(user, { shelf: shelf }, callback);
      });
    }
    // TODO: lookup books/reviews/authors/series in mongo
    // TODO: lookup missing books/reviews/authors/series in goodreads
  ], function (err, reviews) {
    callback(err, !!err);
  });
};