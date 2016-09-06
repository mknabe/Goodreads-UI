var Review = require('../models/review');
var Book = require('../models/book');

exports.findAllReviewsForUser = function (userId) {
  var query = Review.find({ 'user': userId }).sort('-dateAdded');
  return query.exec();
};

exports.findReviewsForUserAndShelf = function (userId, shelfName) {
  var query = Review.find({ 'user': userId, 'shelves': shelfName }).sort('-dateAdded');
  return query.exec();
};

var findById = function (id) {
  var query = Review.findById(id);
  return query.exec();
};
exports.findById = findById;

exports.findAndUpdate = function (review) {
  return findById(review._id).then(function (foundReview) {
    if (foundReview) {
      return Review.findByIdAndUpdate(foundReview.id, review, { new: true });
    } else {
      var newReview = new Review(review);
      return newReview.save();
    }
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