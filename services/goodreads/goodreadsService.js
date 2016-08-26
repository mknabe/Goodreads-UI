var request = require('request');
var xml2js = require('xml2js').parseString;
var config = require('../../config.json');
var oauth = require('./../../config/oauthConfig');

var goodreadsUrl = 'https://www.goodreads.com';

// updates.friends
exports.getUpdatesFeed = function (user, callback) {
    oauth.get(
      goodreadsUrl + '/updates/friends.xml',
      user.user_oauth_token,
      user.user_oauth_token_secret,
      function(error, response, body) {
        if (error) callback(error);
        xml2js(response, function (err, result) {
          callback(err, result);
        });
      });
};

// shelves.list
exports.findShelvesForUser = function(user, callback) {
  oauth.get(
    goodreadsUrl + '/shelf/list.xml?key=' + config.goodreads.key + '&user_id=' + user.goodreads_user_id,
    user.user_oauth_token,
    user.user_oauth_token_secret,
    function(error, response, body) {
      if (error) callback(error);
      xml2js(response, function (err, result) {
        callback(err, result);
      });
    });
};

// reviews.list
exports.findBooksForUser = function(user, params, callback) {
  var url = goodreadsUrl + '/review/list/' + user.goodreads_user_id + '.xml?v=2&key=' + config.goodreads.key;
  console.log(params);

  if (params.shelf) {
    url+= '&shelf=' + params.shelf;
  }

  // page: 1-N (optional)
  if (params.page) {
    url+= '&page=' + params.page; 
  }

  // per_page: 1-200 (optional)
  if (params.per_page) {
    url+= '&per_page=' + params.per_page; 
  }

  oauth.get(
    url,
    user.user_oauth_token,
    user.user_oauth_token_secret,
    function(error, response, body) {
      if (error) callback(error);
      xml2js(body, function (err, result) {
        callback(err, result);
      });
    });
};

// book.show
exports.findBook = function(bookId, callback) {
  request.get(goodreadsUrl + '/book/show/' + bookId + '.xml?key=' + config.goodreads.key, 
    function(error, response, body) {
      if (error) callback(error);
      xml2js(body, function (err, result) {
        callback(err, result);
      });
    });
};

// series.show
exports.findSeries = function(seriesId, callback) {
  request.get(goodreadsUrl + '/series/' + seriesId + '?format=xml&key=' + config.goodreads.key, 
    function(error, response, body) {
      if (error) callback(error);
      xml2js(body, function (err, result) {
        callback(err, result);
      });
    });
};

// author.show
exports.findAuthor = function(authorId, callback) {
  request.get(goodreadsUrl + '/author/show/' + authorId + '?format=xml&key=' + config.goodreads.key, 
    function(error, response, body) {
      if (error) callback(error);
      xml2js(body, function (err, result) {
        callback(err, result);
      });
    });
};

// review.show
exports.findReview = function(reviewId, callback) {
  request.get(goodreadsUrl + '/review/show.xml?id=' + reviewId + '&key=' + config.goodreads.key, 
    function(error, response, body) {
      if (error) callback(error);
      xml2js(body, function (err, result) {
        callback(err, result);
      });
    });
};

// user_status.show
exports.findUserStatus = function(userStatusId, callback) {
  request.get(goodreadsUrl + '/user_status/show/' + userStatusId + '?format=xml&key=' + config.goodreads.key, 
    function(error, response, body) {
      if (error) callback(error);
      xml2js(body, function (err, result) {
        callback(err, result);
      });
    });
};

// read_status.show
exports.findReview = function(readStatusId, callback) {
  request.get(goodreadsUrl + '/read_statuses/' + readStatusId + '?format=xml&key=' + config.goodreads.key, 
    function(error, response, body) {
      if (error) callback(error);
      xml2js(body, function (err, result) {
        callback(err, result);
      });
    });
};

