var Promise = require('bluebird');
var goodreads = require('./goodreads/goodreadsService');
var async = require('async');
var reviewService = require('./reviewDao');
var bookDao = require('./bookDao');

exports.syncUserWithGoodreads = function () {

};

exports.syncShelves = function (user, callback) {
  goodreads.findShelvesForUser(user, callback);
  goodreads.findReviewsForUser(user, { shelf: shelf }, shelfCallback);

  async.waterfall([
    function(callback) {
    },
    function(shelves, callback) {
      var shelvesMap = {};
      shelves.forEach(function (shelf) {
        shelvesMap[shelf] = shelf;
      });
      async.mapValues(shelvesMap, function (shelf, key, shelfCallback) {
        goodreads.findReviewsForUser(user, { shelf: shelf }, shelfCallback);
      }, callback);
    },
    function (reviewsByShelf, callback) {
      var reviews = [];
      for (var shelfName in reviewsByShelf) {
        if (!reviewsByShelf.hasOwnProperty(shelfName)) continue;
        reviews = reviews.concat(reviewsByShelf[shelfName]);
      }
      async.forEach(reviews, syncReview, callback);
    }
  ], function (err) {
    callback(err, !!err);
  });
};

var syncReview = function (goodreadsReview, username) {
  goodreadsReview.username = username;

  return syncBook(goodreadsReview.book)
      .then(function (book) {
        goodreadsReview.bookId = book._id;
       return Promise.resolve(goodreadsReview.goodreads.id);
      })
      .then(reviewService.findReviewByGoodreadsId)
      .then(function (review) {
        if (review) {
          return review;
        } else {
          return reviewService.saveReview(goodreadsReview);
        }
      });
};
exports.syncReview = syncReview;

var syncBook = function (goodreadsBook) {
  return bookDao.findBookByGoodreadsId(goodreadsBook.goodreads.id)
      .then(function (book) {
        if (book) {
          return book;
        } else {
          return bookDao.saveBook(goodreadsBook);
        }
      }).catch(function (err) {
        console.log(err);
      });
};
exports.syncBook = syncBook;