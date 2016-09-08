var authorDao = require('../services/authorDao');

exports.getAuthor = function (req, res) {
  authorDao.findById(req.params.id).then(function (author) {
    if (author) {
      res.render('authorDetail', {author: author});
    } else {
      res.render('noResults');
    }
  });
};