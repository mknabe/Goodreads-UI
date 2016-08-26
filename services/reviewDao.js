var Review = require('../models/review.js');

exports.findAllReviewsForUser = function () {

};

exports.findReviewsForUserAndShelf = function () {

};

exports.saveReview = function (review, callback) {
  if (!review._id) {
    review = new Review(review);
  }
  var options = {
    upsert: true
  };
  Review.findOneAndUpdate(
      {'_id': review._id},
      review,
      options,
      callback);
};

exports.deleteReview = function () {

};