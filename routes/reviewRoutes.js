var reviewDao = require('../services/reviewDao');

exports.allReviews = function (req, res) {
  reviewDao.findAllReviewsForUser(req.session.user._id).then(function (reviews) {
    res.render('reviews', {
      reviews: reviews
    });
  });
};

exports.allReviewsForShelf = function (req, res) {
  reviewDao.findReviewsForUserAndShelf(req.session.user._id, req.params.shelfName).then(function (reviews) {
    res.render('reviews', {
      reviews: reviews
    });
  });
};