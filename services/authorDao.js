var Author = require('../models/author.js');

var findById = function (goodreadsId) {
  return Author.findById(goodreadsId);
};

exports.findById = findById;

exports.findAndSaveAuthor = function (author) {
  return findById(author._id).then(function (foundAuthor) {
    if (foundAuthor) {
      return Author.findByIdAndUpdate(foundAuthor.id, author, { new: true });
    } else {
      var newAuthor = new Author(author);
      return newAuthor.save();
    }
  });
};

exports.saveAuthor = function(author) {
  if (!(author instanceof Author)) {
    author = new Author(author);
  }
  return author.save();
};