var moment = require('moment');

var mapReview = function (reviewXml) {

  var review = {
    goodreads: {
      id: reviewXml.id[0],
      url: reviewXml.url[0]
    },
    rating: parseInt(reviewXml.rating[0]),
    dateAdded: moment(reviewXml.date_added[0], 'ddd MMM DD HH:mm:ss ZZ YYYY').toDate(),
  };

  review.readings = [];
  review.readings.push(mapReading(reviewXml));

  var bookXml = reviewXml.book[0];
  var mappedBook = mapBook(bookXml);
  review.relationships = {
    book: mappedBook
  };
  review.book = {
    goodreadsId: mappedBook.goodreads.id._
  };

  if (reviewXml.body[0].trim().length > 0) {
    review.body = reviewXml.body[0].trim();
  }

  var shelves = [];
  reviewXml.shelves[0].shelf.forEach(function (shelf) {
    shelves.push(shelf.$.name);
  });
  review.shelves = shelves;

  return review;
};

var mapReading = function (reviewXml) {
  var reading = {
    format: 'UNKNOWN'
  };
  if (reviewXml.started_at[0]) {
    reading.dateStarted = moment(reviewXml.started_at[0], 'ddd MMM DD HH:mm:ss ZZ YYYY').toDate();
  }
  if (reviewXml.read_at[0]) {
    reading.dateFinished = moment(reviewXml.read_at[0], 'ddd MMM DD HH:mm:ss ZZ YYYY').toDate();
  }
  return reading;
};

var mapBook = function (bookXml) {
  var book = {
    title: bookXml.title[0],
    description: bookXml.description[0],
    publication: moment(bookXml.publication_year[0] + '-' + bookXml.publication_month[0] + '-' + bookXml.publication_day[0], 'YYYY-MM-DD').toDate(),
    numPages: parseInt(bookXml.num_pages[0]),
    isbn: bookXml.isbn[0],
    isbn13: bookXml.isbn13[0],
    goodreads: {
      id: bookXml.id[0],
      url: bookXml.link[0]
    },
    rating: {
      count: parseInt(bookXml.ratings_count[0]),
      average: parseFloat(bookXml.average_rating[0])
    },
    images: {
      small: bookXml.small_image_url[0],
      medium: bookXml.image_url[0],
      large: bookXml.image_url[0].replace('m/', 'l/')
    }
  };

  if (bookXml.work) {
    var workXml = bookXml.work[0];
    book.goodreads.workId = workXml.id[0]._;
    book.review = {
      total: parseInt(workXml.reviews_count[0]._),
      text: parseInt(workXml.text_reviews_count[0]._)
    };
    book.rating.sum = parseInt(workXml.ratings_sum[0]._);
    book.rating.dist = workXml.rating_dist[0];
    book.firstPublication = moment(workXml.original_publication_year[0]._ + '-' + workXml.original_publication_month[0]._ + '-' + workXml.original_publication_day[0]._, 'YYYY-MM-DD').toDate();
  }

  if (bookXml.series_works && bookXml.series_works[0].series_work) {
    var seriesXml = bookXml.series_works[0].series_work[0];
    book.series = {
      goodreadsId: seriesXml.series[0].id[0],
      title: seriesXml.series[0].title[0].trim(),
      position: parseInt(seriesXml.user_position[0])
    };
  }

  var popularShelves = [];
  bookXml.popular_shelves[0].shelf.forEach(function (shelfXml) {
    popularShelves.push({
      name: shelfXml.$.name,
      count: parseInt(shelfXml.$.count)
    })
  });
  book.popularShelves = popularShelves;

  var authors = [];
  bookXml.authors[0].author.forEach(function (authorXml) {
    authors.push(mapAuthor(authorXml));
  });
  book.relationships = {};
  book.relationships.authors = authors;

  return book;
};

var mapAuthor = function (authorXml) {
  var author = {};
  author.name = authorXml.name[0];
  author.goodreads = {};
  author.goodreads.id = authorXml.id[0];
  author.goodreads.url = authorXml.link[0];
  return author;
};

var mapSeries = function (seriesXml) {
  var series = {};
  series.title = seriesXml.title.trim();
  series.description = seriesXml.description.trim();
  series.goodreads = {};
  series.goodreads.id = seriesXml.id[0];
  series.goodreads.url = 'https://www.goodreads.com/series/' + seriesXml.id[0];
  return series;
};

exports.mapReviews = function(reviewsXml) {
  var reviews = [];
  reviewsXml.forEach(function (reviewXml) {
    reviews.push(mapReview(reviewXml));
  });
  return reviews;
};
exports.mapReview = mapReview;
exports.mapAuthor = mapAuthor;
exports.mapSeries = mapSeries;
exports.mapBook = mapBook;
