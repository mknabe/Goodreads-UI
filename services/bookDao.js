var Book = require('../models/book');

exports.findBooksByAuthor = function() {

};

var findById = function (id) {
  var query = Book.findById(id);
  return query.exec();
};
exports.findBookById = findById;

exports.findAndUpdate = function (book) {
  return findById(book._id).then(function (foundBook) {
    if (foundBook) {
      if (foundBook.numPages) {
        book.numPages = foundBook.numPages;
      }
      return Book.findByIdAndUpdate(foundBook.id, book, { new: true });
    } else {
      return saveBook(book);
    }
  });
};

var saveBook = function(book) {
  if (!(book instanceof Book)) {
    book = new Book(book);
  }
  var error = book.validateSync();
  if (error) {
    console.log(error);
  }
  return book.save();
};
exports.saveBook = saveBook;