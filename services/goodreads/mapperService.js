var moment = require('moment');

exports.mapReviews = function(reviewsXml) {
  var reviews = [];
  reviewsXml.forEach(function (reviewXml) {
    reviews.push(mapReview(reviewXml));
  });
  return reviews;
};

var mapReview = function (reviewXml) {
  var bookXml = reviewXml.book[0];

  return {
    goodreads: {
      id: reviewXml.id[0],
      url: reviewXml.url[0]
    },
    rating: reviewXml.rating[0],
    dateAdded: moment(reviewXml.date_added[0], 'ddd MMM DD HH:mm:ss ZZ YYYY'),
    // TODO: shelves: []
    book: mapBook(bookXml)
    // TODO: map readings
    // TODO: map updates
  };
};
exports.mapReview = mapReview;

var mapBook = function(bookXml) {
  return {
    title: bookXml.title[0],
    description: bookXml.description[0],
    publication: moment(bookXml.publication_year[0] + '-' + bookXml.publication_month[0] + '-' + bookXml.publication_day[0], 'YYYY-MM-DD'),
    numPages: bookXml.num_pages[0],
    isbn: bookXml.isbn[0],
    isbn13: bookXml.isbn13[0],
    goodreads: {
      id: bookXml.id[0]._,
      url: bookXml.link[0]
    },
    rating: {
      count: bookXml.ratings_count[0],
      average: bookXml.average_rating[0]
    },
    images: {
      small: bookXml.small_image_url[0],
      medium: bookXml.image_url[0],
      large: bookXml.image_url[0].replace('s/', 'l/')
    }
    // TODO: map authors
  }
};
exports.mapBook = mapBook;
