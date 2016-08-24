var request = require('request');
var xml2js = require('xml2js').parseString;
var config = require('../../config.json');
var oauth = require('./oauthConfig');

var goodreadsUrl = 'https://www.goodreads.com';

// updates.friends
exports.getUpdatesFeed = function (req, res) {
    oauth.get(
        goodreadsUrl + '/updates/friends.xml',
        req.session.user_oauth_token,
        req.session.user_oauth_token_secret,
        function(error, response, body) {
          if (error) res.send(error);
          xml2js(response, function (err, result) {
            res.json(result);
          });
        });
};

// shelves.list
exports.getUserShelves = function(req, res) {
  oauth.get(
    goodreadsUrl + '/shelf/list.xml?key=' + config.goodreads.key + '&user_id=' + req.session.goodreads_user_id,
    req.session.user_oauth_token,
    req.session.user_oauth_token_secret,
    function(error, response, body) {
      if (error) res.send(error);
      xml2js(response, function (err, result) {
        res.json(result);
      });
    });
};

// reviews.list
exports.getUsersBooks = function(req, res) {
  var url = goodreadsUrl + '/review/list/' + req.session.goodreads_user_id + '.xml?v=2&key=' + config.goodreads.key;
  console.log(req.body);

  if (req.body.shelf) {
    url+= '&shelf=' + req.body.shelf;
  }

  oauth.get(
    url,
    req.session.user_oauth_token,
    req.session.user_oauth_token_secret,
    function(error, response, body) {
      if (error) res.send(error);
      xml2js(body, function (err, result) {
        res.json(result);
      });
    });
};

// book.show
exports.findBook = function(req, res) {
  request.get(goodreadsUrl + '/book/show/' + req.params.goodreadsId + '.xml?key=' + config.goodreads.key, 
    function(error, response, body) {
      if (error) res.send(error);
      console.log(body);
      xml2js(body, function (err, result) {
        res.json(result);
      });
    });
};

// series.show
exports.findSeries = function(req, res) {
  request.get(goodreadsUrl + '/series/' + req.params.seriesId + '?format=xml&key=' + config.goodreads.key, 
    function(error, response, body) {
      if (error) res.send(error);
      console.log(body);
      xml2js(body, function (err, result) {
        res.json(result);
      });
    });
};

// author.show
exports.findAuthor = function(req, res) {
  request.get(goodreadsUrl + '/author/show/' + req.params.authorId + '?format=xml&key=' + config.goodreads.key, 
    function(error, response, body) {
      if (error) res.send(error);
      console.log(body);
      xml2js(body, function (err, result) {
        res.json(result);
      });
    });
};

