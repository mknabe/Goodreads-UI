var Book = require('../models/book');

exports.findBooksByAuthor = function() {

};

var findBookByGoodreadsId = function (goodreadsId) {
  var query = Book.findOne({ 'goodreads.id': goodreadsId });
  return query.exec();
};
exports.findBookByGoodreadsId = findBookByGoodreadsId;

exports.findBookById = function (id) {
  var query = Book.findById(id);
  return query.exec();
};

exports.doesBookExistForGoodreadsId = function (goodreadsId) {
  return findBookByGoodreadsId(goodreadsId).then(function (book) {
    return !!book;
  });
};

exports.saveBook = function(book) {
  if (!(book instanceof Book)) {
    book = new Book(book);
  }
  return book.save();
};