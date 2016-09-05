var goodreads = require('../services/goodreads/goodreadsService');

exports.getBook = function (req, res) {
  goodreads.findBook(req.params.id).then(function (xml) {
    res.json(xml);
  });
};

exports.getSeries = function (req, res) {
  goodreads.findSeries(req.params.id).then(function (xml) {
    res.json(xml);
  });
};

exports.getAuthor = function (req, res) {
  goodreads.findAuthor(req.params.id).then(function (xml) {
    res.json(xml);
  });
};

exports.getReview = function (req, res) {
  goodreads.findReview(req.params.id).then(function (xml) {
    res.json(xml);
  });
};

exports.getUserStatus = function (req, res) {
  goodreads.findUserStatus(req.params.id).then(function (xml) {
    res.json(xml);
  });
};

exports.getReadStatus = function (req, res) {
  goodreads.findReadStatus(req.params.id).then(function (xml) {
    res.json(xml);
  });
};