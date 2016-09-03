var Review = require('../models/review');
var Book = require('../models/book');

exports.findAllReviewsForUser = function () {

};

exports.findReviewsForUserAndShelf = function () {

};

var findReviewByGoodreadsId = function (goodreadsId) {
  var query = Review.findOne({ 'goodreads.id': goodreadsId });
  return query.exec();
};
exports.findReviewByGoodreadsId = findReviewByGoodreadsId;

exports.findReviewById = function (id, callback) {
  var query = Review.findById(id, callback);
  return query.exec();
};

exports.doesReviewExistForGoodreadsId = function (goodreadsId) {
  return findReviewByGoodreadsId(goodreadsId, function (review) {
    return !!review;
  });
};

exports.saveReview = function (review) {
  if (!(review instanceof Review)) {
    review = new Review(review);
  }

  return review.save();
};

exports.deleteReview = function () {

};