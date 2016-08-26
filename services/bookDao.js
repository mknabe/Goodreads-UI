var Book = require('../models/book.js');

exports.findBook = function() {

};

exports.findBooksByAuthor = function() {

};

exports.saveBook = function(book, callback) {
  if (!book._id) {
    book = new Book(book);
  }
  var options = {
    upsert: true
  };
  Book.findOneAndUpdate(
    {'_id': book._id}, 
    book,
    options,
    callback);
};