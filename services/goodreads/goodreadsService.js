var Promise = require('bluebird');
var request = Promise.promisifyAll(require("request"));
var xml2js = Promise.promisifyAll(require('xml2js'));
var config = require('../../config.json');
var oauth = require('./../../config/oauthConfig');
var mapper = require('./mapperService');

var goodreadsUrl = 'https://www.goodreads.com';

var parseXml = function (xml) {
  return xml2js.parseStringAsync(xml);
};

// updates.friends
exports.getUpdatesFeed = function (user) {
  return new Promise(function (resolve, reject) {
    oauth.get(
        goodreadsUrl + '/updates/friends.xml',
        user.oauthToken,
        user.oauthTokenSecret,
        function(error, response, body) {
          if (error) reject(error);
          resolve(parseXml(response));
        });
  });
};

// shelves.list
exports.findShelvesForUser = function(user) {
  var goodreadsResponse = new Promise(function (resolve, reject) {
    oauth.get(
        goodreadsUrl + '/shelf/list.xml?key=' + config.goodreads.key + '&user_id=' + user._id,
        user.oauthToken,
        user.oauthTokenSecret,
        function (error, response, body) {
          if (error) reject(error);
          resolve(parseXml(response));
        });
  });
  return goodreadsResponse.then(function (parsedXml) {
      var shelvesXml = parsedXml.GoodreadsResponse.shelves[0].user_shelf;
      var shelves = [];
      shelvesXml.forEach(function (shelf) {
        shelves.push(shelf.name[0]);
      });
      return shelves;
  });
};

// reviews.list
exports.findReviewsForUser = function(user, params) {
  var url = goodreadsUrl + '/review/list/' + user._id + '.xml?v=2&key=' + config.goodreads.key;
  url += '&sort=date_updated';
  url+= '&per_page=200';

  if (params.shelf) {
    url+= '&shelf=' + params.shelf;
  }

  // page: 1-N (optional)
  if (params.page) {
    url+= '&page=' + params.page;
  }

  var goodreadsResponse = new Promise(function (resolve, reject) {
    oauth.get(
        url,
        user.oauthToken,
        user.oauthTokenSecret,
        function (error, response, body) {
          if (error) reject(error);
          resolve(parseXml(response));
        });
  });
  return goodreadsResponse.then(function (parsedXml) {
    if (parsedXml.GoodreadsResponse.reviews[0].review) {
      var reviewsXml = parsedXml.GoodreadsResponse.reviews[0].review;
      return mapper.mapReviews(reviewsXml);
    } else {
      return [];
    }
  });
};

/*
  book_id: Goodreads book_id (required)
  review[review]: Text of the review (optional)
  review[rating]: Rating (0-5) (optional, default is 0 (No rating))
  review[read_at]: Date (YYYY-MM-DD format, e.g. 2008-02-01) (optional)
  shelf: read|currently-reading|to-read|<USER SHELF NAME> (optional, must exist, see: shelves.list)
 */
exports.addReview = function (user, bookId, review) {
  var url = goodreadsUrl + '/review.xml';
  var goodreadsResponse = new Promise(function (resolve, reject) {
    oauth.post(
        url,
        user.oauthToken,
        user.oauthTokenSecret,
        // post body
        function (error, data, response) {
          if (error) reject(error);
          resolve(parseXml(data));
        });
  });
  return goodreadsResponse.then(function (parsedXml) {
    return parsedXml;
  });
};

/*
{
  id: Goodreads review id
  review[review]: Text of review (optional)
  review[rating]: Rating (0-5) (optional, default is 0 (No rating))
  review[read_at]: Date (YYYY-MM-DD format, e.g. 2008-02-01) (optional)
  finished: true to mark finished reading (optional)
  shelf: read|currently-reading|to-read|<USER SHELF NAME> (optional, must exist, see: shelves.list)
}
 */
exports.editReview = function(user, review) {
  var url = goodreadsUrl + '/review/' + review.goodreads.id + '.xml';
  var goodreadsResponse = new Promise(function (resolve, reject) {
    oauth.put(
        url,
        user.oauthToken,
        user.oauthTokenSecret,
        // post body
        function (error, data, response) {
          if (error) reject(error);
          resolve(parseXml(data));
        });
  });
  return goodreadsResponse.then(function (parsedXml) {
    return parsedXml;
  });
};

exports.deleteReview = function (user, reviewId) {
  var url = goodreadsUrl + '/review/destroy/' + reviewId + '?format=xml';
  var goodreadsResponse = new Promise(function (resolve, reject) {
    oauth.delete(
        url,
        user.oauthToken,
        user.oauthTokenSecret,
        function (error, data, response) {
          if (error) reject(error);
          resolve(parseXml(data));
        });
  });
  return goodreadsResponse.then(function (parsedXml) {
    return parsedXml;
  });
};

/*
  user_status[book_id]: id of the book being reviewed (optional)
  user_status[page]: page of the book (optional)
  user_status[percent]: percent complete (use instead of page if appropriate)
  user_status[body]: status update (required, unless page or percent is present, then it is optional)
 */
exports.updateUserStatus = function (user, userStatus) {
  var url = goodreadsUrl + '/user_status.xml';
  var goodreadsResponse = new Promise(function (resolve, reject) {
    oauth.post(
        url,
        user.oauthToken,
        user.oauthTokenSecret,
        // post body
        function (error, data, response) {
          if (error) reject(error);
          resolve(parseXml(data));
        });
  });
  return goodreadsResponse.then(function (parsedXml) {
    return parsedXml;
  });
};

var getPublicGoodreadsData = function (url) {
  return request.getAsync(url).then(function (response) {
    return parseXml(response.body).then(function (parsedXml) {
      var keys = Object.keys(parsedXml.GoodreadsResponse);
      return parsedXml.GoodreadsResponse[keys[1]][0];
    });
  });
};

// book.show
exports.findBook = function(bookId) {
  var promise = getPublicGoodreadsData(goodreadsUrl + '/book/show/' + bookId + '.xml?key=' + config.goodreads.key);
  return promise.then(function (book) {
    return mapper.mapBook(book);
  });
};

// series.show
exports.findSeries = function(seriesId) {
  var promise = getPublicGoodreadsData(goodreadsUrl + '/series/' + seriesId + '?format=xml&key=' + config.goodreads.key);
  return promise.then(function (series) {
    return mapper.mapSeries(series);
  });
};

// author.show
exports.findAuthor = function(authorId) {
  var promise = getPublicGoodreadsData(goodreadsUrl + '/author/show/' + authorId + '?format=xml&key=' + config.goodreads.key);
  return promise.then(function (author) {
    return mapper.mapAuthor(author);
  });
};

// review.show
exports.findReview = function(reviewId) {
  var promise = getPublicGoodreadsData(goodreadsUrl + '/review/show.xml?id=' + reviewId + '&key=' + config.goodreads.key);
  return promise.then(function (review) {
    return mapper.mapReview(review);
  });
};

// user_status.show
exports.findUserStatus = function(userStatusId) {
  return getPublicGoodreadsData(goodreadsUrl + '/user_status/show/' + userStatusId + '?format=xml&key=' + config.goodreads.key);
};

// read_status.show
exports.findReadStatus = function(readStatusId) {
  return getPublicGoodreadsData(goodreadsUrl + '/read_statuses/' + readStatusId + '?format=xml&key=' + config.goodreads.key);
};

