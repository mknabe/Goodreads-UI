var sync = require('../services/syncService');
exports.sync = function (req, res) {
  sync.syncShelves(req.session.user).then(function (arr) {
    res.status(200).send('Done');
  });
};