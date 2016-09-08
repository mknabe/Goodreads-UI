var bookDao = require('../services/bookDao');

exports.getBook = function (req, res) {
  bookDao.findBookById(req.params.id).then(function (book) {
    if (book) {
      res.render('bookDetail', {book: book});
    } else {
      res.render('noResults');
    }
  });
};