var Promise = require('bluebird');
var goodreads = require('./goodreads/goodreadsService');
var reviewService = require('./reviewDao');
var bookDao = require('./bookDao');
var authorDao = require('./authorDao');

var syncShelf = function (user, shelfName) {
  return goodreads.findReviewsForUser(user, { shelf: shelfName }).then(function (mappedReviews) {
    var promises = [];
    mappedReviews.forEach(function (mappedReview) {
      promises.push(syncReview(mappedReview._id, user._id));
    });
    return Promise.all(promises);
  });
};

var syncAuthor = function (goodreadsAuthorId) {
  return authorDao.findById(goodreadsAuthorId).then(function (author) {
    // Do not update existing authors
    if (author) {
      return author;
    } else {
      return goodreads.findAuthor(goodreadsAuthorId).then(authorDao.findAndSaveAuthor);
    }
  });
};

var syncBook = function (goodreadsBookId) {
  return goodreads.findBook(goodreadsBookId).then(function (mappedBook) {
    var authorPromises = [];
    mappedBook.authors.forEach(function (goodreadsAuthorId) {
      authorPromises.push(syncAuthor(goodreadsAuthorId));
    });
    return Promise.all(authorPromises).then(function () {
      return bookDao.findAndUpdate(mappedBook);
    });
  });
};

var syncSeries = function (seriesGoodreadsId) {

};

var syncReview = function (goodreadsReviewId, goodreadsUserId) {
  return goodreads.findReview(goodreadsReviewId).then(function (mappedReview) {
    return syncBook(mappedReview.book.extended)
        .then(function (book) {
          mappedReview.user = goodreadsUserId;
          mappedReview.book.series = book.series;
          return reviewService.findAndUpdate(mappedReview);
        });
  });
};

var shelvesToSync = ['to-read', 'read', 'currently-reading'];
exports.syncShelves = function (user) {
  var promises = [];
  shelvesToSync.forEach(function (shelfName) {
    promises.push(syncShelf(user, shelfName));
  });
  return Promise.all(promises);
};

exports.syncSeries = syncSeries;
exports.syncAuthor = syncAuthor;
exports.syncBook = syncBook;
exports.syncReview = syncReview;
exports.syncShelf = syncShelf;
